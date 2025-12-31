import { NextResponse } from 'next/server'
import { fetchShopItemsWithUserMeta } from '@/app/shop/lib/fetchShopItemsWithUserMeta'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pageParam = Number(searchParams.get('pageParam') ?? '0')
  const pageSize = Number(searchParams.get('pageSize') ?? '10')
  const tab = Number(searchParams.get('tab') ?? '0')
  const q = (searchParams.get('q') ?? '').trim()

  const safePageParam = Number.isFinite(pageParam) && pageParam >= 0 ? pageParam : 0
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0 && pageSize <= 50 ? pageSize : 10
  const safeTab = Number.isFinite(tab) && tab >= 0 ? tab : 0

  const data = await fetchShopItemsWithUserMeta(safePageParam, safePageSize, safeTab, q)
  return NextResponse.json(data)
}


