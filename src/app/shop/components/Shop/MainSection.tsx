'use client'

import ItemFilterCon from '../Filter/ItemFilterCon'
import ItemListCon from '../Item/ItemListCon'
import ShopCategoryNav from './ShopCategoryNav'
import SearchSection from './SearchSection'
import type { ShopCategoryCounts } from '@/app/shop/lib/fetchShopCategoryCountsServer'
import { SHOP_PAGE_X_PADDING } from '../shopLayoutClasses'

export default function MainSection({
  counts,
}: {
  counts: ShopCategoryCounts
}) {
  return (
    <>
      <div>
        <div
          className={`flex w-full gap-[45px] pt-[40px] pb-[40px] ${SHOP_PAGE_X_PADDING} max-[1024px]:gap-0 max-[1024px]:pt-[30px] max-[768px]:pt-[24px] max-[768px]:pb-[30px]`}
        >
          <section className="min-w-[230px] h-full sticky top-[30px] max-[1024px]:hidden">
            <div className="space-y-4">
              <SearchSection />
              <ShopCategoryNav counts={counts} />
              <ItemFilterCon />
            </div>
          </section>
          <section className="w-full">
            <ItemListCon />
          </section>
        </div>
      </div>
    </>
  )
}
