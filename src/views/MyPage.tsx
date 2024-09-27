import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../hooks/useAuth'
import UnauthorizedAccess from '../components/Common/UnauthorizedAccess'
import { fetchUserInfoByUserId } from '../config/api/user/fetchUserInfo'
import { NicknameSection } from '../components/MyPage/NicknameSection'
import { EmailSection } from '../components/MyPage/EmailSection'
import { PasswordSection } from '../components/MyPage/PasswordSection'
import { AccountDeletionSection } from '../components/MyPage/AccountDeletionSection'
import { ProfileSection } from '../components/MyPage/ProfileSection'
import { passwordRegex } from '../utill/checkInputValueValid'
import useWindowWidth from '../hooks/useWindowWidth'

export default function MyPage() {
  const { session } = useAuth()
  const [isNicknameEditMode, setIsNicknameEditMode] = useState(false)
  const [isEmailEditMode, setIsEmailEditMode] = useState(false)
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    avatar_url: null,
    username: '',
    admin: false,
    likes: null,
    nickname: null,
  })

  const [initialNickname, setInitialNickname] = useState('')
  const [initialEmail, setInitialEmail] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
  const [warningText, setWarningText] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const windowWidth = useWindowWidth()

  const isDeletionButtonDisabled = !selectedReason

  useEffect(() => {
    if (!session) return

    const getUserInfo = async () => {
      const result = await fetchUserInfoByUserId(session.user.id)
      setUserInfo(() => ({
        id: result?.id,
        email: result?.email,
        avatar_url: result?.avatar_url,
        username: result?.username,
        admin: result?.admin,
        likes: result?.likes,
        nickname: result?.nickname ? result.nickname : null,
      }))
      setInitialNickname(
        result?.nickname ? result.nickname : result?.email.split('@')[0]
      )
      setInitialEmail(result?.email)
    }

    getUserInfo()
  }, [session])

  useEffect(() => {
    const isValidPassword = passwordRegex.test(password)
    setIsPasswordValid(isValidPassword)

    const isPasswordMatching = password === confirmPassword && password !== ''
    setIsConfirmPasswordValid(isPasswordMatching)

    if (!password) {
      setWarningText('')
    } else if (!isValidPassword && !isPasswordMatching) {
      setWarningText(
        '6~20자 / 영문자, 숫자, 특수문자 중 2가지 이상 조합만 가능합니다.'
      )
    } else if (!isValidPassword) {
      setWarningText(
        '6~20자 / 영문자, 숫자, 특수문자 중 2가지 이상 조합만 가능합니다.'
      )
    } else if (!isPasswordMatching && confirmPassword) {
      setWarningText('비밀번호가 일치하지 않습니다.')
    } else {
      setWarningText('')
    }
  }, [password, confirmPassword])

  if (!session) {
    return <UnauthorizedAccess />
  }

  return (
    <Container>
      <Main>
        <Left windowwidth={windowWidth}>
          <ProfileSection userInfo={userInfo} setUserInfo={setUserInfo} />
        </Left>
        <Right windowwidth={windowWidth}>
          <NicknameSection
            userInfo={userInfo}
            isNicknameEditMode={isNicknameEditMode}
            setIsNicknameEditMode={setIsNicknameEditMode}
            initialNickname={initialNickname}
            setUserInfo={setUserInfo}
          />
          <EmailSection
            userInfo={userInfo}
            isEmailEditMode={isEmailEditMode}
            setIsEmailEditMode={setIsEmailEditMode}
            initialEmail={initialEmail}
            setUserInfo={setUserInfo}
          />
          <PasswordSection
            userInfo={userInfo}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            isConfirmPasswordVisible={isConfirmPasswordVisible}
            setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
            isPasswordValid={isPasswordValid}
            isConfirmPasswordValid={isConfirmPasswordValid}
            warningText={warningText}
            setWarningText={setWarningText}
          />
          <AccountDeletionSection
            selectedReason={selectedReason}
            setSelectedReason={setSelectedReason}
            isDeletionButtonDisabled={isDeletionButtonDisabled}
          />
        </Right>
      </Main>
    </Container>
  )
}

// 스타일링
const Container = styled.div`
  margin-top: 100px;
  border-top: 1px solid rgba(210, 210, 210, 1);
  padding: 10px 0 80px 0;

  @media (max-width: 1024px) {
    margin-top: 90px;
  }

  @media (max-width: 768px) {
    margin-top: 74px;
  }

  @media (max-width: 600px) {
    margin-top: 60px;
  }
`

const Main = styled.main`
  margin: 30px auto 0;
  max-width: 1200px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`
interface LeftAndRigthProps {
  windowwidth: number
}

const Left = styled.div<LeftAndRigthProps>`
  flex: 1;
  margin-bottom: ${props => (props.windowwidth > 768 ? '0px' : '50px')};
`

const Right = styled.div<LeftAndRigthProps>`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: ${props => (props.windowwidth > 768 ? '0 30px 0 0' : '0 30px')};
`
