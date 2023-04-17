import { getLocalStorage } from './getLocalStorage';

/**
 * 로컬 스토리지에 값을 추가하는 함수
 * @param key 저장할 키 값
 * @param data 추가할 값
 */
export const updateLocalStorage = (key: string, data: string) => {
  if (typeof window !== 'undefined') {
    const currentData = getLocalStorage(key);
    const newData = [...currentData, data];
    localStorage.setItem(key, JSON.stringify(newData));
  }
};
