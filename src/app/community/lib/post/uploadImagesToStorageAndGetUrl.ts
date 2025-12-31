import Resizer from 'react-image-file-resizer'
import { supabase } from '@/supabase/supabaseClient'

function convertImageToWebP(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      'WEBP',
      80,
      0,
      uri => {
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
      'base64'
    )
  })
}

export async function uploadImagesToStorageAndGetUrl(
  images: File[]
): Promise<string[]> {
  const uploadedUrls: string[] = []

  for (let i = 0; i < images.length; i++) {
    const file = images[i]
    const webpFile = await convertImageToWebP(file)
    const fileName = `${Date.now()}_${i}.webp`

    const { error: uploadError } = await supabase.storage
      .from('tribe posts images')
      .upload(fileName, webpFile)

    if (uploadError) {
      console.error('이미지 업로드 오류:', uploadError.message)
      throw new Error('이미지 업로드 중 오류가 발생했습니다.')
    }

    const { data } = supabase.storage
      .from('tribe posts images')
      .getPublicUrl(fileName)

    if (!data?.publicUrl) {
      console.error('Public URL을 가져올 수 없습니다.')
      throw new Error('Public URL을 가져오는 중 오류가 발생했습니다.')
    }

    uploadedUrls.push(data.publicUrl)
  }

  return uploadedUrls
}


