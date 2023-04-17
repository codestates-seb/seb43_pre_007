/**
 * 로컬 스토리지 키 값을 전달받아서 해당하는 값을 삭제
 * @param key 로컬 스토리지 키 값
 */
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
