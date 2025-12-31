import { notFound } from 'next/navigation'
import { CommunityLayout } from '@/app/community/components/CommunityLayout'
import { fetchPostByIdServer } from '@/app/community/lib/post/fetchPostByIdServer'
import PostDetailPageClient from './PostDetailPageClient'

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const postId = Number(id)
  if (!Number.isFinite(postId)) notFound()

  const post = await fetchPostByIdServer(postId)
  if (!post) notFound()

  return (
    <CommunityLayout>
      <div className="max-w-5xl mx-auto animate-fade-in pb-20">
        <PostDetailPageClient post={post} />
      </div>
    </CommunityLayout>
  )
}


