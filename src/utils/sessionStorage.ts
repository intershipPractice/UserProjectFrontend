// Redux 상태를 세션 스토리지에 저장
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error("Could not save state to sessionStorage", e);
  }
};

// 세션 스토리지에서 Redux 상태를 불러오기
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // 초기 상태 반환
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from sessionStorage", e);
    return undefined;
  }
};
  