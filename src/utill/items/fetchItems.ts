import { supabase } from "../../supabase/supabaseClient";

export async function fetchItems() {
  const { data, error } = await supabase.from("items").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }

  return data || [];
}

export async function fetchItemById(id: number) {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
    return null; // 오류가 발생할 경우 null 반환
  }

  return data;
}
