import type { StaticImageData } from 'next/image'

/**
 * Next의 static image import(`.png`, `.jpg` 등)는 `{ src, width, height }` 객체를 반환합니다.
 * 기존 Vite 코드처럼 `<img src={...} />`를 유지하기 위해 string으로 정규화합니다.
 */
export function assetSrc(asset: string | StaticImageData): string {
  return typeof asset === 'string' ? asset : asset.src
}


