import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { useCartMutations } from '@/features/cart/mutations/useCartMutations'
import { useEffect } from 'react'
import { CartItemType } from '@/types/CartItemType'

interface CountButtonPropsType {
  type?: string
  productCount?: number
  cartId: string
  itemId: number
  quantity: number
  setCount?: React.Dispatch<React.SetStateAction<number>>
  count: number
  setOrderInfo?: React.Dispatch<React.SetStateAction<CartItemType>>
}

export default function CountButton({
  type,
  cartId,
  itemId,
  quantity,
  setCount,
  count,
  setOrderInfo,
}: CountButtonPropsType) {
  const { cartItemQuantityMutation } = useCartMutations()

  useEffect(() => {
    if (setOrderInfo) setOrderInfo(prev => ({ ...prev, quantity: count }))
  }, [count, setOrderInfo])

  const pad = type === 'cart' ? 'p-[6px]' : 'p-[4px]'
  const font = type === 'cart' ? 'text-[1.1rem]' : 'text-[0.9rem]'
  const countPad = type === 'cart' ? 'p-[6px]' : 'p-[4px]'
  const countFont = type === 'cart' ? 'text-[1rem]' : 'text-[0.9rem]'

  if (type === 'productDetail') {
    return (
      <div className="rounded-lg flex items-center bg-white border-0">
        <button
          className="py-2 pl-3 pr-3 cursor-pointer flex items-center justify-center text-[rgba(60,60,60,1)] hover:bg-[rgba(250,250,250,1)] transition-colors border-0 bg-transparent"
          onClick={() => {
            if (setCount && count > 1) {
              setCount(prev => prev - 1)
            }
          }}
        >
          <AiOutlineMinus size={14} />
        </button>
        <div className="border-l border-r border-[rgba(240,240,240,1)] px-3 py-2 flex items-center justify-center min-w-[32px] text-[rgba(60,60,60,1)] text-sm">
          {count}
        </div>
        <button
          className="py-2 pl-3 pr-3 cursor-pointer flex items-center justify-center text-[rgba(60,60,60,1)] hover:bg-[rgba(250,250,250,1)] transition-colors border-0 bg-transparent"
          onClick={() => {
            if (setCount) {
              setCount(prev => prev + 1)
            }
          }}
        >
          <AiOutlinePlus size={14} />
        </button>
      </div>
    )
  }

  return (
    <div className="border border-[rgba(200,200,200,1)] rounded-[6px] flex">
      <div
        className={`${pad} ${font} cursor-pointer flex items-start justify-center max-[1024px]:p-[4px] max-[1024px]:text-[0.9rem] max-[400px]:p-[2px] max-[400px]:text-[0.8rem]`}
        onClick={() => {
          if (type === 'cart') {
            const direction = 'minus'
            if (quantity === 1) return
            cartItemQuantityMutation.mutate({ cartId, itemId, direction })
            return
          }
        }}
      >
        <AiOutlineMinus />
      </div>
      <div
        className={`border-l border-r border-[rgba(200,200,200,1)] ${countPad} flex items-start justify-center w-[24px] ${countFont} max-[1024px]:p-[4px] max-[1024px]:text-[0.9rem] max-[400px]:p-[2px] max-[400px]:text-[0.8rem]`}
      >
        {quantity}
      </div>
      <div
        className={`${pad} ${font} cursor-pointer flex items-start justify-center max-[1024px]:p-[4px] max-[1024px]:text-[0.9rem] max-[400px]:p-[2px] max-[400px]:text-[0.8rem]`}
        onClick={() => {
          if (type === 'cart') {
            const direction = 'plus'
            cartItemQuantityMutation.mutate({ cartId, itemId, direction })
            return
          }
        }}
      >
        <AiOutlinePlus />
      </div>
    </div>
  )
}

