import type { DataType } from '@/types';
import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: keyof DataType, initalValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    return jsonValue === null ? (typeof initalValue === 'function' ? (initalValue as () => T)() : initalValue) : JSON.parse(jsonValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
