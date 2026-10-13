"use client";

import { useState, useCallback } from 'react';
import { VariableMeta } from './usePython';

export function useJavaScript() {
  const [isLoading] = useState(false); // JS is native, no loading needed
  const [output, setOutput] = useState<string[]>([]);
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [variableDetails, setVariableDetails] = useState<Record<string, VariableMeta>>({});

  const runCode = useCallback(async (code: string) => {
    setOutput([]);
    setVariables({});
    setVariableDetails({});
    
    const logs: string[] = [];
    
    // Create a mock console object to capture logs
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      }
    };

    try {
      // Create a clean execution environment
      const func = new Function('console', `
        let __evalLast = undefined;
        try {
          __evalLast = eval(\`${code.replace(/`/g, '\\`')}\`);
        } catch {
          ${code}
        }
        
        // Extract variables using a simple regex and eval
        const __extractedVars = {};
        const __extractedMeta = {};
        const __codeStr = \`${code.replace(/`/g, '\\`')}\`;
        
        const varMatches = __codeStr.matchAll(/(?:let|const|var)\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\\s*=/g);
        for (const match of varMatches) {
           const varName = match[1];
           try {
             const val = eval(varName);
             __extractedVars[varName] = val;
             let tName = typeof val;
             if (tName === 'number') {
               tName = Number.isInteger(val) ? 'int' : 'float';
             } else if (Array.isArray(val)) {
               tName = 'list';
             } else if (val === null) {
               tName = 'null';
             } else if (typeof val === 'object') {
               tName = 'dict';
             }
             __extractedMeta[varName] = {
               val: val,
               type: tName,
               repr: typeof val === 'object' ? JSON.stringify(val) : String(val),
               size: null
             };
           } catch(e) {}
        }
        return { vars: __extractedVars, meta: __extractedMeta, evalRes: __evalLast };
      `);

      const res = func(mockConsole);
      
      setVariables(res?.vars || {});
      setVariableDetails(res?.meta || {});
      
      if (logs.length === 0 && res?.evalRes !== undefined && res?.evalRes !== null) {
        logs.push(typeof res.evalRes === 'object' ? JSON.stringify(res.evalRes) : String(res.evalRes));
      }
      setOutput(logs);
      
    } catch (err: any) {
      setOutput([...logs, err.toString()]);
      setVariables({});
      setVariableDetails({});
    }
  }, []);

  return { isLoading, output, variables, variableDetails, runCode, setOutput };
}
