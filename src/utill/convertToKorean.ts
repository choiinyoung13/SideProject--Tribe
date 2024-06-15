interface convertToKoreanType {
  type: "size" | "price" | "color";
}

export default function convertToKorean(
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
