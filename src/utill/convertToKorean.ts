interface convertToKoreanType {
  type: "size" | "price" | "color";
}

export function convertToKorean(
  type: convertToKoreanType["type"]
): string | undefined {
  return type === "size"
    ? "사이즈"
    : type === "price"
    ? "가격"
    : type === "color"
    ? "컬러"
    : undefined;
}

// community 페이지 카테고리 데이터 포멧팅

export function convertToKoreanCommuniyCategory(
  type: string
): string | undefined {
  return type === "chat"
    ? "잡담"
    : type === "event"
    ? "이벤트"
    : type === "question"
    ? "질문"
    : type === "sharing"
    ? "나눔"
    : type === "information"
    ? "정보"
    : type === "others"
    ? "기타"
    : undefined;
}
