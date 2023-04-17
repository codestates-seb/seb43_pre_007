/**
 * 로컬 스토리지에 값을 저장하는 함수
 * @param key 저장할 새로운 키 값
 * @param data 저장할 값
 */
export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(
    key,
    JSON.stringify({ date: new Date(), [`${key}`]: data })
  );
};
