import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useAuth } from '../hooks/useAuth'
import UnauthorizedAccess from '../components/Common/UnauthorizedAccess'
import { fetchUserInfoByUserId } from '../config/api/user/fetchUserInfo'
import { FaChevronDown } from 'react-icons/fa'

interface userInfoType {
  id: string
  email: string
  avatar_url: string | null
  username: string
  admin: boolean
  likes: number[] | null
  nickname: string | null
}

export default function MyPage() {
  const { session } = useAuth()
  const [isNicknameEditMode, setIsNicknameEditMode] = useState(false)
  const [isEmailEditMode, setIsEmailEditMode] = useState(false)
  const [userInfo, setUserInfo] = useState<userInfoType>({
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
    useState(false) // 비밀번호 확인 보이기 상태 관리
  const [isPasswordValid, setIsPasswordValid] = useState(false) // 비밀번호 유효성 상태
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false) // 비밀번호 확인 유효성 상태
  const [warningText, setWarningText] = useState('') // 경고 메시지 상태
  const [selectedReason, setSelectedReason] = useState('') // 탈퇴 사유 선택 상태

  const isDeletionButtonDisabled = !selectedReason // 탈퇴 버튼 활성화 조건

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

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])|(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])|(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,20}$/

    const isValidPassword = passwordRegex.test(password)
    setIsPasswordValid(isValidPassword)

    const isPasswordMatching = password === confirmPassword && password !== ''
    setIsConfirmPasswordValid(isPasswordMatching)

    if (!password) {
      setWarningText('')
    } else if (!isValidPassword && !isPasswordMatching) {
      setWarningText(
        '6~20자 / 영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합만 가능합니다.'
      )
    } else if (!isValidPassword) {
      setWarningText(
        '6~20자 / 영문 대문자, 소문자, 숫자, 특수문자 중 2가지 이상 조합만 가능합니다.'
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
        <Left>
          <ProfileWrapper>
            <ProfileImg
              src={
                session.user.user_metadata.avatar_url
                  ? session.user.user_metadata.avatar_url
                  : 'http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg'
              }
              alt="avatar url"
            />
            <ProfileChangeButton>프로필 변경</ProfileChangeButton>
          </ProfileWrapper>
        </Left>
        <Right>
          {/* 닉네임 변경 Section */}
          <NicknameSection>
            <SectionHeader>
              <Title>닉네임</Title>
              <ButtonWrapper>
                {!isNicknameEditMode && (
                  <button onClick={() => setIsNicknameEditMode(true)}>
                    수정
                  </button>
                )}
                {isNicknameEditMode && (
                  <EditButtonWrapper>
                    <button onClick={() => setIsNicknameEditMode(false)}>
                      저장
                    </button>
                    <button
                      onClick={() => {
                        setUserInfo({ ...userInfo, nickname: initialNickname })
                        setIsNicknameEditMode(false)
                      }}
                    >
                      취소
                    </button>
                  </EditButtonWrapper>
                )}
              </ButtonWrapper>
            </SectionHeader>
            <SectionBody>
              <input
                draggable={false}
                disabled={!isNicknameEditMode}
                type="text"
                value={userInfo.nickname || userInfo.email.split('@')[0]}
                onChange={e => {
                  if (isNicknameEditMode) {
                    setUserInfo({ ...userInfo, nickname: e.target.value })
                  }
                }}
                style={{ pointerEvents: isNicknameEditMode ? 'auto' : 'none' }}
              />
              <Infomation>
                * 닉네임은 변경 후 30일이 지나야 다시 바꿀 수 있습니다. <br />
                * 한글/영문/숫자만 사용할 수 있으며, 특수문자는 사용할 수
                없습니다. <br />
              </Infomation>
            </SectionBody>
          </NicknameSection>

          {/* 이메일 변경 Section */}
          <EmailSection>
            <SectionHeader>
              <Title>이메일</Title>
              <ButtonWrapper>
                {!isEmailEditMode && (
                  <button onClick={() => setIsEmailEditMode(true)}>수정</button>
                )}
                {isEmailEditMode && (
                  <EditButtonWrapper>
                    <button onClick={() => setIsEmailEditMode(false)}>
                      인증번호 요청
                    </button>
                    <button
                      onClick={() => {
                        setUserInfo({ ...userInfo, email: initialEmail })
                        setIsEmailEditMode(false)
                      }}
                    >
                      취소
                    </button>
                  </EditButtonWrapper>
                )}
              </ButtonWrapper>
            </SectionHeader>
            <SectionBody>
              <input
                type="email"
                draggable={false}
                disabled={!isEmailEditMode}
                value={userInfo.email}
                onChange={e => {
                  if (isEmailEditMode) {
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                }}
                style={{ pointerEvents: isEmailEditMode ? 'auto' : 'none' }}
              />
              <Infomation>
                * 이메일 수정 후 인증번호 요청을 누르면 해당 이메일로 인증번호가
                전송됩니다. <br />* 이미 사용중인 이메일로 변경 불가능합니다.
              </Infomation>
            </SectionBody>
          </EmailSection>

          {/* 비밀번호 변경 Section */}
          <PasswordSection>
            <SectionHeader>
              <Title>비밀번호 변경</Title>
            </SectionHeader>
            <SectionBody>
              {/* 기존 비밀번호 입력 필드 */}
              <InputWrapper>
                <input
                  type={'password'}
                  placeholder="기존 비밀번호를 입력해주세요."
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                />
              </InputWrapper>

              {/* 새로운 비밀번호 입력 필드 */}
              <InputWrapper>
                <input
                  type={'password'}
                  placeholder="새로운 비밀번호를 입력해주세요."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </InputWrapper>

              {/* 비밀번호 확인 입력 필드 */}
              <InputWrapper>
                <input
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  placeholder="비밀번호 확인을 위해 다시 입력해주세요."
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <EyeIcon
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </EyeIcon>
              </InputWrapper>

              {/* 경고 메시지 출력 */}
              {warningText && <WarningText>{warningText}</WarningText>}
            </SectionBody>
            <SectionFooter>
              <button disabled={!isPasswordValid || !isConfirmPasswordValid}>
                비밀번호 변경
              </button>
            </SectionFooter>
          </PasswordSection>

          {/* 회원 탈퇴 Section */}
          <AccountDeletionSection>
            <SectionHeader>
              <Title>회원 탈퇴</Title>
            </SectionHeader>
            <SectionBody>
              <CustomSelectWrapper>
                <AccountDeletionSelect
                  onChange={e => {
                    setSelectedReason(e.target.value)
                  }}
                >
                  <option value="" disabled hidden>
                    Trib를 떠나는 이유를 알려주세요
                  </option>
                  <option value="더이상 사용하지 않아요">
                    더이상 사용하지 않아요
                  </option>
                  <option value="대체할 만한 서비스를 찾았어요">
                    대체할 만한 서비스를 찾았어요
                  </option>
                  <option value="쿠폰 · 적립금 등 혜택이 적어요">
                    쿠폰 · 적립금 등 혜택이 적어요
                  </option>
                  <option value="원하는 제품이 없어요">
                    원하는 제품이 없어요
                  </option>
                  <option value="기타">기타</option>
                </AccountDeletionSelect>
                <SelectArrow>
                  <FaChevronDown />
                </SelectArrow>
              </CustomSelectWrapper>
            </SectionBody>
            <SectionFooter>
              <button disabled={isDeletionButtonDisabled}>회원 탈퇴</button>
            </SectionFooter>
          </AccountDeletionSection>
        </Right>
      </Main>
    </Container>
  )
}

// 스타일링
const Container = styled.div`
  margin-top: 100px;
  border-top: 1px solid rgba(210, 210, 210, 1);
  padding: 10px 0 100px 0;
`

const Main = styled.main`
  margin: 30px auto 0;
  width: 1200px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

const Left = styled.div`
  flex: 1;
`

const Right = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 40px;
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 60%;
  height: 60%;
`

const ProfileChangeButton = styled.button`
  margin-top: 20px;
  background-color: rgba(30, 30, 30, 1);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(50, 50, 50, 1);
  }
`

const NicknameSection = styled.section`
  width: 100%;
`

const EmailSection = styled.section`
  width: 100%;
`

const PasswordSection = styled.section`
  width: 100%;
`

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  button {
    background-color: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: rgb(0, 109, 235);
  }
`

const SectionBody = styled.div`
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: rgb(245, 245, 245);
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 6px;

    &:focus {
      outline: 1px solid rgba(230, 230, 230, 1);
    }

    &:disabled {
      color: rgba(150, 150, 150, 1);
    }
  }
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;

  input {
    width: 100%;
    padding-right: 40px;
  }

  &:first-of-type {
    margin-top: 14px;
  }

  &:last-of-type {
    margin-bottom: 0px;
  }
`

const EyeIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #000;
`

const WarningText = styled.span`
  color: red;
  font-size: 0.9rem;
  margin: 6px 0 35px;
`

const SectionFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background-color: rgb(30, 30, 30, 1);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 0.9rem;
    margin-top: 16px;

    &:hover {
      background-color: rgb(50, 50, 50, 1);
    }

    &:disabled {
      background-color: rgba(150, 150, 150, 1);
      cursor: not-allowed;
    }
  }
`

const AccountDeletionSection = styled.section`
  width: 100%;
`

const CustomSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`

const AccountDeletionSelect = styled.select`
  width: 100%;
  -webkit-appearance: none; /* Safari, Chrome */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* Standard */
  padding: 10px;
  font-size: 1rem;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(230, 230, 230, 1);
  border-radius: 6px;
`

const SelectArrow = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1rem;
  color: rgba(120, 120, 120, 1);
`

const Infomation = styled.p`
  line-height: 28px;
  margin-top: 10px;
  color: rgba(120, 120, 120, 1);
  font-size: 0.9rem;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(50, 50, 50, 1);
`

const ButtonWrapper = styled.div``

const EditButtonWrapper = styled.div``
