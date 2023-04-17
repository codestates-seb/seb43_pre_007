/**
 * @param key 로컬 스토리지 키 값
 * @returns 키에 해당하는 로컬스토리지 데이터
 */
export const getLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};
