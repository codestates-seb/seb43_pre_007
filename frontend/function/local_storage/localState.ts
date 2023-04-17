import { getLocalStorage } from '@/function/local_storage/getLocalStorage';

/**
 * atom 초기 셋팅을 위한 함수
 * @param key 조회하려는 local 키 값
 * @param base 조회에 실패했을 때, 나갈 기본 값
 * @returns 조회에 성공한 값 or 기본 값
 */
export const localState = (key: string, base: {} | [] | string) => {
  const data = getLocalStorage(key);
  if (data) {
    return data[key];
  } else {
    return base;
  }
};
