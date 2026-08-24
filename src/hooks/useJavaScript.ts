"use client";

import { useState, useCallback } from 'react';

export function useJavaScript() {
  const [isLoading] = useState(false); // JS is native, no loading needed
  const [output, setOutput] = useState<string[]>([]);
  const [variables, setVariables] = useState<Record<string, any>>({});

  const runCode = useCallback(async (code: string) => {
    setOutput([]);
    setVariables({});
    
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
        ${code}
        
        // Extract variables using a simple regex and eval
        const __extractedVars = {};
        const __codeStr = \`${code.replace(/`/g, '\\`')}\`;
        
        // Very basic variable extraction for mock purposes
        // Matches let/const/var variable_name = ...
        const varMatches = __codeStr.matchAll(/(?:let|const|var)\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\\s*=/g);
        for (const match of varMatches) {
           const varName = match[1];
           try {
             // In new Function scope, variables declared with let/const aren't automatically in 'this' or an object
             // We can use eval to get their current value at the end of the script
             __extractedVars[varName] = eval(varName);
           } catch(e) {}
        }
        return __extractedVars;
      `);

      const extractedVars = func(mockConsole);
      
      setVariables(extractedVars);
      setOutput(logs);
      
    } catch (err: any) {
      setOutput([...logs, err.toString()]);
      setVariables({});
    }
  }, []);

  return { isLoading, output, variables, runCode, setOutput };
}
