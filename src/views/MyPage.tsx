import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../hooks/useAuth'
import { fetchUserInfoByUserId } from '../config/api/user/fetchUserInfo'
import { NicknameSection } from '../components/MyPage/NicknameSection'
import { EmailSection } from '../components/MyPage/EmailSection'
import { PasswordSection } from '../components/MyPage/PasswordSection'
import { AccountDeletionSection } from '../components/MyPage/AccountDeletionSection'
import { ProfileSection } from '../components/MyPage/ProfileSection'
import { passwordRegex } from '../utill/checkInputValueValid'
import useWindowWidth from '../hooks/useWindowWidth'
import ActivitySection from '../components/MyPage/ActivitySection'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import loadingIcon from '../assets/images/logo/ball-triangle.svg'
import UnauthorizedAccess from '../components/Common/UnauthorizedAccess'

export default function MyPage() {
  const { session, isLoading: isAuthLoading } = useAuth()
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
  const navigate = useNavigate()
  const isDeletionButtonDisabled = !selectedReason

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tab = queryParams.get('tab')

  // 내 정보 데이터 패칭
  const { data, isLoading } = useQuery(
    ['userinfo', session?.user?.id],
    () => session && fetchUserInfoByUserId(session.user.id),
    {
      staleTime: Infinity,
      cacheTime: 30 * 60 * 1000,
      enabled: session !== null && tab === null,
    }
  )

  useEffect(() => {
    if (!data || isLoading) return

    setUserInfo(() => ({
      id: data?.id,
      email: data?.email,
      avatar_url: data?.avatar_url,
      username: data?.username,
      admin: data?.admin,
      likes: data?.likes,
      nickname: data?.nickname ? data.nickname : null,
    }))
  }, [data])

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

  // session을 가져오는 동안 loading처리
  if (isAuthLoading) {
    return (
      <LoadingPage>
        <LoadingIcon>
          <img src={loadingIcon} alt="" />
        </LoadingIcon>
      </LoadingPage>
    )
  }

  // 유효하지 않은 session이면 오류페이지 보여주기
  if (!session) {
    return <UnauthorizedAccess />
  }

  // 유효한 session이면 해당 유정정보 패칭하면서 그동안 로딩처리
  if (tab === null && (isLoading || !data)) {
    return (
      <LoadingPage>
        <LoadingIcon>
          <img src={loadingIcon} alt="" />
        </LoadingIcon>
      </LoadingPage>
    )
  }

  return (
    <Container>
      <Header>
        <TabWrapper>
          <Tab
            selected={tab === null}
            onClick={() => {
              navigate('/mypage')
            }}
          >
            내 정보
          </Tab>
          <Tab
            selected={tab === '1'}
            onClick={() => {
              navigate('/mypage?tab=1')
            }}
          >
            내 활동
          </Tab>
        </TabWrapper>
      </Header>
      <Main tab={tab}>
        {tab === null ? (
          <>
            <Left windowwidth={windowWidth}>
              <ProfileSection
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                avatar_url={data.avatar_url}
              />
            </Left>
            <Right windowwidth={windowWidth}>
              <NicknameSection
                userInfo={userInfo}
                isNicknameEditMode={isNicknameEditMode}
                setIsNicknameEditMode={setIsNicknameEditMode}
                setUserInfo={setUserInfo}
              />
              <EmailSection
                userInfo={userInfo}
                isEmailEditMode={isEmailEditMode}
                setIsEmailEditMode={setIsEmailEditMode}
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
          </>
        ) : (
          <ActivitySection />
        )}
      </Main>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 100px;
  border-top: 1px solid rgba(210, 210, 210, 1);
  padding: 0 0 90px 0;

  @media (max-width: 768px) {
    margin-top: 74px;
    padding: 0 0 80px 0;
  }

  @media (max-width: 600px) {
    margin-top: 60px;
  }
`

const Header = styled.header`
  max-width: 1080px;
  margin: 0 auto;
`

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  gap: 23px;
`

interface TabProps {
  selected: boolean
}

const Tab = styled.div<TabProps>`
  padding: 20px 0px;
  font-size: 1rem;
  cursor: pointer;
  border-bottom: ${props =>
    props.selected ? '2px solid rgba(0,0,0,1)' : 'none'};
  font-weight: ${props => (props.selected ? '700' : '400')};

  &:hover {
    border-bottom: 2px solid black;
  }

  @media (max-width: 1150px) {
    &:first-of-type {
      margin-left: 30px;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 0px;
    font-size: 0.9rem;
  }
`

interface MainProps {
  tab: null | string
}

const Main = styled.main<MainProps>`
  margin: ${props => (props.tab === null ? '40px auto 0' : '0 auto')};
  max-width: 1080px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

interface LeftAndRightProps {
  windowwidth: number
}

const Left = styled.div<LeftAndRightProps>`
  flex: 1;
  margin-bottom: ${props => (props.windowwidth > 768 ? '0px' : '50px')};
  padding-left: 50px;

  @media (max-width: 768px) {
    padding-left: 0px;
  }
`

const Right = styled.div<LeftAndRightProps>`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: ${props => (props.windowwidth > 768 ? '0 50px 0 0' : '0 50px')};

  @media (max-width: 768px) {
    padding: ${props => (props.windowwidth > 768 ? '0 50px 0 0' : '0 30px')};
  }
`

const LoadingPage = styled.div`
  margin-top: 100px;
  width: 100%;
  min-height: 500px;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    margin-top: 90px;
    height: calc(100vh - 90px);
  }

  @media (max-width: 768px) {
    margin-top: 74px;
    height: calc(100vh - 74px);
  }

  @media (max-width: 600px) {
    margin-top: 52px;
    height: calc(100vh - 112px);
  }
`

const LoadingIcon = styled.div`
  width: 140px;
  height: 140px;
  margin-bottom: 100px;

  img {
    width: 100%;
  }

  @media (max-width: 1024px) {
    width: 130px;
    height: 130px;
  }

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
`
