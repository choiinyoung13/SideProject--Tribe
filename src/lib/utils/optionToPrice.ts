// Cart option을 가격으로 변환
const options: { [key: string]: number } = {
  "-": 0,
  "편지로 마음 담기 (+2,500원)": 2500,
  "커브 라운드 화병 (+13,500원)": 13500,
  "미니 세라믹 화병 (+14,500원)": 14500,
};

export const optionToPrice = (option: string): number => {
  return options[option] ?? 0;
};
