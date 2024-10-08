import Resizer from 'react-image-file-resizer'
import { supabase } from '../../../supabase/supabaseClient'

// 이미지를 WebP로 변환하는 함수
function convertImageToWebP(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      800, // 너비 설정
      800, // 높이 설정
      'WEBP', // 변환할 형식
      80, // 이미지 품질 (0 ~ 100)
      0, // 회전 각도
      uri => {
        // 데이터 URI를 Blob으로 변환하여 File 객체로 생성
        fetch(uri as string)
          .then(res => res.blob())
          .then(blob => {
            const webpFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, '.webp'),
              {
                type: 'image/webp',
                lastModified: Date.now(),
              }
            )
            resolve(webpFile)
          })
          .catch(() => reject(new Error('WebP 변환 실패')))
      },
      'base64' // 결과 타입 (base64로 설정)
    )
  })
}

export async function uploadImagesToStorageAndGetUrl(
  images: File[]
): Promise<string[]> {
  const uploadedUrls: string[] = []

  for (let i = 0; i < images.length; i++) {
    const file = images[i]

    // JPG 파일을 WebP로 변환
    const webpFile = await convertImageToWebP(file)

    const fileName = `${Date.now()}_${i}.webp` // WebP 확장자로 고유한 파일명 생성

    // WebP 이미지 파일을 Supabase 스토리지에 업로드
    const { error: uploadError } = await supabase.storage
      .from('tribe posts images')
      .upload(fileName, webpFile)

    if (uploadError) {
      console.error('이미지 업로드 오류:', uploadError.message)
      throw new Error('이미지 업로드 중 오류가 발생했습니다.')
    }

    // 업로드된 파일의 public URL 가져오기
    const { data } = supabase.storage
      .from('tribe posts images')
      .getPublicUrl(fileName)

    if (!data?.publicUrl) {
      console.error('Public URL을 가져올 수 없습니다.')
      throw new Error('Public URL을 가져오는 중 오류가 발생했습니다.')
    }

    // 성공적으로 가져온 URL을 배열에 추가
    uploadedUrls.push(data.publicUrl)
  }

  // 모든 이미지의 URL을 반환
  return uploadedUrls
}
