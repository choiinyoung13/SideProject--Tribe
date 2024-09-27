export const emailRegex = /^[a-z0-9]{1,50}@[^\s@]+\.[^\s@]+$/
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[\d\W_])([a-zA-Z\d\W_])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣])[a-zA-Z\d\W_]{6,20}$|^(?=.*[a-zA-Z\d])(?=.*[\W_])([a-zA-Z\d\W_])(?!.*[ㄱ-ㅎㅏ-ㅣ가-힣])[a-zA-Z\d\W_]{6,20}$/
