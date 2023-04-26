export const tokenLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key);
    return data;
  }
};

/**
 * @param key 로컬 스토리지 키 값
 * @returns 키에 해당하는 로컬스토리지 데이터
 */
export const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(key) || '';
    return JSON.parse(data);
  }
};

/**
 * 로컬 스토리지에 값을 저장하는 함수
 * @param key 저장할 새로운 키 값
 * @param data 저장할 값
 */
export const setLocalStorage = (key: string, data: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify([data]));
  }
};

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

/**
 * atom 초기 셋팅을 위한 함수
 * @param key 조회하려는 local 키 값
 * @param base 조회에 실패했을 때, 나갈 기본 값
 * @returns 조회에 성공한 값 or 기본 값
 */
export const localState = (key: string, base: {} | [] | string) => {
  if (typeof window !== 'undefined') {
    const data = getLocalStorage(key);
    if (data) {
      return data;
    } else {
      return base;
    }
  }
};
