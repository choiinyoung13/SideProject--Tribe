import { supabase } from "../../../supabase/supabaseClient";

export const updateUserLikesInfo = async ({
  userId,
  itemId,
}: {
  userId: string;
  itemId: number;
}) => {
  const { data, error } = await supabase
    .from("userinfo")
    .select("likes")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching likes data:", error);
    return;
  }

  const likesData = data.likes || [];
  const isAlreadyExisted = likesData.some((id: number) => id === itemId);

  if (isAlreadyExisted) {
    const newData = likesData.filter((id: number) => id !== itemId);
    const { error: updateError } = await supabase
      .from("userinfo")
      .update({ likes: newData })
      .eq("id", userId);
    if (updateError) {
      console.error("Error updating likes:", updateError);
    }
  } else {
    likesData.push(itemId);
    const { error: updateError } = await supabase
      .from("userinfo")
      .update({ likes: likesData })
      .eq("id", userId);
    if (updateError) {
      console.error("Error updating likes:", updateError);
    }
  }
};
