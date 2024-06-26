import { supabase } from "../../../supabase/supabaseClient";
import { tabNumberToCategory } from "../../../utill/tabNumberToCategory";

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

type BadgeType = "hot" | "fast";

interface ItemType {
  badge: BadgeType[];
  category: string;
  classification: string;
  color: string | null;
  deliveryperiod: number;
  discount: number;
  id: number;
  imgurl: string;
  origin: string;
  originalprice: number;
  size: string;
  title: string;
}

interface FetchItemsResponse {
  items: ItemType[];
  nextCursor: number | null;
}

export async function fetchItemsPerPage(
  pageParam: number = 0,
  pageSize: number = 10,
  tab: number
): Promise<FetchItemsResponse> {
  const start = pageParam * pageSize;
  const end = start + pageSize - 1;

  let query = supabase.from("items").select("*").range(start, end);

  if (tab != 0) {
    const category = tabNumberToCategory(tab);
    query = query.eq("category", `${category}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching data:", error);
    return { items: [], nextCursor: null };
  }

  const hasMore = data.length === pageSize;
  const nextCursor = hasMore ? pageParam + 1 : null;

  return { items: data, nextCursor };
}
