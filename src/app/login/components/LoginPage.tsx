import LoginImageSection from './LoginImageSection'
import LoginPanelClient from './LoginPanelClient'

type Props = {
  redirectTo: string
}

export default function LoginPage({ redirectTo }: Props) {
  return (
    <div className="w-full flex">
      <LoginPanelClient redirectTo={redirectTo} />
      <LoginImageSection />
    </div>
  )
}
