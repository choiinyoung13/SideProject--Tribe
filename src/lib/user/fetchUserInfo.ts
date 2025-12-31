import { supabase } from "@/supabase/supabaseClient";

export async function fetchUserLikesInfo(userId: string) {
  const { data, error } = await supabase
    .from("userinfo")
    .select("likes")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching likes info:", error);
    return;
  }
  return data;
}

// 모든 userinfo 받아오기
export async function fetchAllUserInfo() {
  const { data, error } = await supabase.from("userinfo").select("*");

  if (error) {
    console.error("Error fetching user info:", error);
    return [];
  }
  return data;
}

// userId로 해당 유저의 email, avatar_url, nickname 정보 받아오기
export async function fetchUserInfoByUserId(userId: string) {
  const { data, error } = await supabase
    .from("userinfo")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user info:", error);
    return;
  }
  return data;
}

type PurchaseHistory = {
  id: number;
  price: number;
  title: string;
  img_url: string;
  amount: number;
  created_at: string;
  additional_product: string;
};

type FetchPurchaseHistoryResponse = {
  posts: PurchaseHistory[];
  nextCursor: number | null;
};

// 유저의 구매 내역 조회
export async function fetchPurchaseHistoryPerPage(
  pageParam: number = 0,
  pageSize: number = 8
): Promise<FetchPurchaseHistoryResponse> {
  const start = pageParam * pageSize;
  const end = start + pageSize - 1;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인된 유저가 없습니다.");
  }

  const { data, error } = await supabase
    .from("userinfo")
    .select("purchase_history")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("데이터 조회 오류:", error.message);
    return { posts: [], nextCursor: null };
  }

  if (!data || !data.purchase_history || data.purchase_history.length === 0) {
    return { posts: [], nextCursor: null };
  }

  const sortedPurchaseHistories = data.purchase_history.sort(
    (a: PurchaseHistory, b: PurchaseHistory) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const paginatedPurchaseHistories = sortedPurchaseHistories.slice(
    start,
    end + 1
  );

  const hasMore = paginatedPurchaseHistories.length === pageSize;
  const nextCursor = hasMore ? pageParam + 1 : null;

  return { posts: paginatedPurchaseHistories, nextCursor };
}


