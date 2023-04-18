import { getLocalStorage } from './getLocalStorage';

/**
 * 로컬 스토리지에서 특정 데이터를 삭제하는 함수
 * @param key 삭제할 키 값
 * @param idx 삭제할 데이터의 인덱스
 */
export const deleteLocalStorage = (key: string, idx: number) => {
  if (typeof window !== 'undefined') {
    const existingData = getLocalStorage(key);
    const updatedData = existingData.filter(
      (item: string, index: number) => index !== idx
    );
    localStorage.setItem(key, JSON.stringify(updatedData));
  }
};
