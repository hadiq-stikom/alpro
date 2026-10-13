"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

// Singleton instance & promise agar tidak dimuat ulang berkali-kali saat re-mount / StrictMode
let globalPyodideInstance: any = null;
let globalPyodidePromise: Promise<any> | null = null;
let activeOutputCallback: ((msg: string) => void) | null = null;

async function getPyodideInstance(): Promise<any> {
  if (typeof window === 'undefined') {
    throw new Error('Pyodide hanya dapat dijalankan di lingkungan browser.');
  }

  if (globalPyodideInstance) {
    return globalPyodideInstance;
  }

  if ((window as any).__pyodideInstance) {
    globalPyodideInstance = (window as any).__pyodideInstance;
    return globalPyodideInstance;
  }

  if (globalPyodidePromise) {
    return globalPyodidePromise;
  }

  globalPyodidePromise = (async () => {
    try {
      // 1. Pastikan script pyodide.js terpasang di dokumen
      if (!(window as any).loadPyodide) {
        await new Promise<void>((resolve, reject) => {
          let script = document.getElementById('pyodide-script') as HTMLScriptElement | null;
          if (!script) {
            script = document.createElement('script');
            script.id = 'pyodide-script';
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
            document.head.appendChild(script);
          }

          if ((window as any).loadPyodide) {
            resolve();
            return;
          }

          const handleLoad = () => {
            cleanup();
            resolve();
          };
          const handleError = () => {
            cleanup();
            reject(new Error('Gagal mengunduh Pyodide runtime dari CDN. Periksa koneksi internet Anda.'));
          };
          const cleanup = () => {
            script?.removeEventListener('load', handleLoad);
            script?.removeEventListener('error', handleError);
          };

          script.addEventListener('load', handleLoad);
          script.addEventListener('error', handleError);
        });
      }

      // 2. Muat WebAssembly Pyodide
      const py = await (window as any).loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
      });

      // 3. Kaitkan stdout secara dinamis
      py.setStdout({
        batched: (msg: string) => {
          if (activeOutputCallback) {
            activeOutputCallback(msg);
          }
        }
      });

      // 4. Hubungkan fungsi input() Python dengan prompt() JavaScript
      await py.runPythonAsync(`
import builtins

def custom_input(prompt_text=""):
    import js
    res = js.prompt(prompt_text)
    return res if res is not None else ""

builtins.input = custom_input
      `);

      globalPyodideInstance = py;
      (window as any).__pyodideInstance = py;
      return py;
    } catch (err) {
      globalPyodidePromise = null;
      throw err;
    }
  })();

  return globalPyodidePromise;
}

export interface VariableMeta {
  val: any;
  type: string;
  size?: number | null;
  repr: string;
}

export function usePython() {
  const [pyodide, setPyodide] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      return globalPyodideInstance || (window as any).__pyodideInstance || null;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !globalPyodideInstance && !(window as any).__pyodideInstance;
    }
    return true;
  });
  const [output, setOutput] = useState<string[]>([]);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [variableDetails, setVariableDetails] = useState<Record<string, VariableMeta>>({});
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (globalPyodideInstance) {
      setPyodide(globalPyodideInstance);
      setIsLoading(false);
      return;
    }

    getPyodideInstance()
      .then((py) => {
        if (isMountedRef.current) {
          setPyodide(py);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Gagal inisialisasi Pyodide:", err);
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      });

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const runCode = useCallback(async (code: string) => {
    setOutput([]); // Bersihkan output sebelumnya

    let py = pyodide || globalPyodideInstance || (typeof window !== 'undefined' ? (window as any).__pyodideInstance : null);

    // Jika engine belum siap saat tombol RUN ditekan, coba inisialisasi
    if (!py) {
      setIsLoading(true);
      try {
        py = await getPyodideInstance();
        if (isMountedRef.current) {
          setPyodide(py);
        }
      } catch (err: any) {
        if (isMountedRef.current) {
          setOutput([`⚠️ Gagal memuat Python Engine: ${err?.message || err}. Periksa koneksi internet.`]);
          setIsLoading(false);
        }
        return;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }

    if (!py) return;

    const outputBuffer: string[] = [];

    // Pasang listener output aktif ke state komponen saat ini
    activeOutputCallback = (msg: string) => {
      outputBuffer.push(msg);
      if (isMountedRef.current) {
        setOutput(prev => [...prev, msg]);
      }
    };

    try {
      // 1. Reset Python global namespace agar variabel lama terhapus bersih
      await py.runPythonAsync(`
import sys
for __key in list(globals().keys()):
    if not __key.startswith("__") and __key not in ["sys", "os", "math", "random", "js", "builtins", "custom_input"]:
        del globals()[__key]
      `);

      // 2. Jalankan kode pengguna & tangkap nilai kembalian ekspresi (gaya REPL)
      const evalResult = await py.runPythonAsync(code);

      // Jika tidak ada print() yang menghasilkan output stdout, dan kode mengembalikan nilai (seperti ekspresi '10 // 4' atau '0.1 + 0.2')
      if (outputBuffer.length === 0 && evalResult !== undefined && evalResult !== null) {
        let resultRepr = "";
        try {
          if (evalResult && typeof evalResult.toString === 'function') {
            resultRepr = evalResult.toString();
          } else {
            resultRepr = String(evalResult);
          }
          if (evalResult && typeof evalResult.destroy === 'function') {
            evalResult.destroy();
          }
        } catch {
          resultRepr = String(evalResult);
        }

        if (resultRepr && resultRepr !== 'None' && resultRepr !== '[object Object]') {
          outputBuffer.push(resultRepr);
          if (isMountedRef.current) {
            setOutput([resultRepr]);
          }
        }
      }

      // 3. Ekstraksi variabel global dengan identifikasi tipe data Python murni (int vs float vs str vs bool dst)
      const introspectionJson = await py.runPythonAsync(`
import json, sys
__var_meta = {}
for __k, __v in list(globals().items()):
    if not __k.startswith("__") and __k not in ["sys", "os", "math", "random", "js", "builtins", "custom_input", "_", "__key", "__var_meta"]:
        try:
            __t = type(__v).__name__
            __sz = sys.getsizeof(__v)
            __r = repr(__v)
            __var_meta[__k] = {
                "val": __v if __t in ["int", "float", "str", "bool"] else __r,
                "type": __t,
                "size": __sz,
                "repr": __r
            }
        except Exception:
            pass

json.dumps(__var_meta)
      `);

      let parsedMeta: Record<string, VariableMeta> = {};
      try {
        parsedMeta = JSON.parse(introspectionJson || "{}");
      } catch {
        parsedMeta = {};
      }

      const cleanVars: Record<string, any> = {};
      for (const [k, meta] of Object.entries(parsedMeta)) {
        cleanVars[k] = meta.val;
      }

      if (isMountedRef.current) {
        setVariables(cleanVars);
        setVariableDetails(parsedMeta);
      }
    } catch (err: any) {
      if (isMountedRef.current) {
        setOutput(prev => [...prev, err.toString()]);
        setVariables({});
        setVariableDetails({});
      }
    }
  }, [pyodide]);

  return { isLoading, output, variables, variableDetails, runCode, setOutput };
}
