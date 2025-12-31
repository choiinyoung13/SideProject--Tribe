import { JoinForm } from './components/Join/JoinForm'
import { JoinImageSection } from './components/Join/JoinImageSection'

export default function Page() {
  return (
    <div className="w-full flex">
      <JoinForm />
      <JoinImageSection />
    </div>
  )
}
