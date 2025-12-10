import { useEffect, useRef } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const scriptIdRef = useRef<string | null>(null);
  
  // Generate stable ID only once
  if (!scriptIdRef.current) {
    scriptIdRef.current = `structured-data-${Math.random().toString(36).substring(2, 11)}`;
  }

  useEffect(() => {
    try {
      const scriptId = scriptIdRef.current!;
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const jsonData = Array.isArray(data) ? data : [data];
      script.textContent = JSON.stringify(jsonData);
    } catch (error) {
      console.error('StructuredData error:', error);
    }
  }, [data]); // Remove scriptId from dependencies

  return null;
}

