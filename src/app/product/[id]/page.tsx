import { notFound } from 'next/navigation'

import ProductDetailPage from './components/ProductDetailPage'
import { getProductByIdOrNotFound } from './lib/server'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id: idParam } = await params
  const id = Number(idParam)
  if (!Number.isFinite(id)) notFound()

  const productInfo = await getProductByIdOrNotFound(id)

  return <ProductDetailPage productInfo={productInfo} />
}


