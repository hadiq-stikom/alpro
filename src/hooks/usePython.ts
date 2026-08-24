"use client";

import { useState, useEffect, useCallback } from 'react';

export function usePython() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [output, setOutput] = useState<string[]>([]);
  const [variables, setVariables] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadPy = async () => {
      try {
        if (!document.getElementById('pyodide-script')) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
          script.id = 'pyodide-script';
          document.head.appendChild(script);
          
          script.onload = async () => {
            const py = await (window as any).loadPyodide({
               indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
            });
            
            // Redirect stdout to our state
            py.setStdout({ batched: (msg: string) => {
              setOutput(prev => [...prev, msg]);
            }});

            // Hubungkan fungsi input() Python dengan fungsi prompt() JavaScript
            await py.runPythonAsync(`
import builtins

def custom_input(prompt_text=""):
    import js
    res = js.prompt(prompt_text)
    return res if res is not None else ""

builtins.input = custom_input
            `);
            
            setPyodide(py);
            setIsLoading(false);
          };
        } else {
            // Already loaded in another mount
            const checkReady = setInterval(() => {
                if ((window as any).loadPyodide) {
                    clearInterval(checkReady);
                    setIsLoading(false);
                }
            }, 100);
        }
      } catch (err) {
        console.error("Failed to load pyodide", err);
        setIsLoading(false);
      }
    };
    loadPy();
  }, []);

  const runCode = useCallback(async (code: string) => {
    if (!pyodide) return;
    
    setOutput([]); // clear previous output
    try {
      // Reset Python global namespace agar variabel lama terhapus
      await pyodide.runPythonAsync(`
for __key in list(globals().keys()):
    if not __key.startswith("__") and __key not in ["sys", "os", "math", "random", "js", "builtins", "custom_input"]:
        del globals()[__key]
      `);

      await pyodide.runPythonAsync(code);
      
      // Extract global variables for memory visualization
      const globals = pyodide.globals;
      const dict = globals.toJs();
      
      // Filter out built-in python variables (usually start with __)
      const cleanVars: Record<string, any> = {};
      for (const [key, value] of dict.entries()) {
        if (typeof key === 'string' && !key.startsWith('__') && key !== 'sys' && typeof value !== 'function') {
          // Hanya simpan tipe data primitif untuk visualisasi (angka, string, boolean)
          if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
            cleanVars[key] = value;
          }
        }
      }
      setVariables(cleanVars);
      
    } catch (err: any) {
      setOutput(prev => [...prev, err.toString()]);
      setVariables({}); // Kosongkan memori jika program error/crash
    }
  }, [pyodide]);

  return { isLoading, output, variables, runCode, setOutput };
}
