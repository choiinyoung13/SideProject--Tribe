import FilterSection from '../Shop/FilterSection'
import ShopCategoryNav from './ShopCategoryNav'
import type { ShopCategoryCounts } from '@/app/shop/lib/fetchShopCategoryCountsServer'
import { SHOP_PAGE_X_PADDING } from '../shopLayoutClasses'

type Props = {
  counts: ShopCategoryCounts
}

export default function HeaderSection({ counts }: Props) {
  return (
    <div
      className={`hidden max-[1024px]:block w-full ${SHOP_PAGE_X_PADDING} pt-[30px] pb-0 max-[1024px]:pt-[20px] space-y-3`}
    >
      {/* Mobile: Community-style accordion categories */}
      <div className="hidden max-[1024px]:block">
        <ShopCategoryNav mode="accordion" counts={counts} />
      </div>
      {/* Search (mobile/tablet only - desktop uses left sidebar SearchSection) */}
      <div className="max-[1024px]:block hidden">
        <FilterSection />
      </div>
    </div>
  )
}
