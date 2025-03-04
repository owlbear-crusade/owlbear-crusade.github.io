import { useEffect, useState, Dispatch, SetStateAction } from "react";

export const useStorage = (key: string, type = "localStorage"): [string, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState("");
  
    // Initial fetch from storage
    useEffect(() => {
      const storage = type === "sessionStorage" ? sessionStorage : localStorage;
      setValue(storage.getItem(key) as string);
    }, [key, type]);
  
    // Persist to storage
    useEffect(() => {
      // first render, don't override/destroy existing item value
      if (value) {
        const storage = type === "sessionStorage" ? sessionStorage : localStorage;
        storage.setItem(key, value);
      }
    }, [key, value, type]);
  
    return [value, setValue];
  }
  