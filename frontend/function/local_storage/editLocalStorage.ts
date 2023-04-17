import { getLocalStorage } from './getLocalStorage';

/**
 * 로컬 스토리지에서 특정 데이터를 수정하는 함수
 * @param key 수정할 키 값
 * @param idx 수정할 데이터의 인덱스
 * @param newData 새로운 데이터
 */
export const editLocalStorage = (key: string, idx: number, newData: string) => {
  if (typeof window !== 'undefined') {
    const currentData = getLocalStorage(key) || [];
    const updatedData = [...currentData];
    updatedData[idx] = newData;
    localStorage.setItem(key, JSON.stringify(updatedData));
  }
};
