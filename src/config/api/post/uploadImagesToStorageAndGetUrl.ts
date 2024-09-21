import { supabase } from "../../../supabase/supabaseClient";

export async function uploadImagesToStorageAndGetUrl(
  images: File[]
): Promise<string[]> {
  const uploadedUrls: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const file = images[i];
    const fileExt = file.name.split(".").pop(); // 파일 확장자 가져오기
    const fileName = `${Date.now()}_${i}.${fileExt}`; // 고유한 파일명 생성

    // 이미지 스토리지에 업로드
    const { error: uploadError } = await supabase.storage
      .from("tribe posts images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("이미지 업로드 오류:", uploadError.message);
      throw new Error("이미지 업로드 중 오류가 발생했습니다.");
    }

    // 업로드된 파일의 public URL 가져오기
    const { data } = supabase.storage
      .from("tribe posts images")
      .getPublicUrl(fileName);

    if (!data?.publicUrl) {
      console.error("Public URL을 가져올 수 없습니다.");
      throw new Error("Public URL을 가져오는 중 오류가 발생했습니다.");
    }

    // 성공적으로 가져온 URL을 배열에 추가
    uploadedUrls.push(data.publicUrl);
  }

  // 모든 이미지의 URL을 반환
  return uploadedUrls;
}
