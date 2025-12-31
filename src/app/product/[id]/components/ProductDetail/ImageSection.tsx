interface ImageSectionProps {
  image: string
}

export default function ImageSection({ image }: ImageSectionProps) {
  return (
    <section className="w-1/2 flex-shrink-0 max-[1024px]:w-full">
      <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt="" draggable={false} />
      </div>
    </section>
  )
}
