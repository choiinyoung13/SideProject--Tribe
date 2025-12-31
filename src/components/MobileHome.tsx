import home_mobile_image from '@/assets/images/home/home_mobile.jpg'
import { assetSrc } from '@/shared/lib/asset'

export default function MobileHome() {
  return (
    <div className="w-full overflow-hidden">
      <section className="relative w-full h-screen overflow-hidden">
        <img className="w-full" src={assetSrc(home_mobile_image)} alt="" draggable="false" />
      </section>
    </div>
  )
}


