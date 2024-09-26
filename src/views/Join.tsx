import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Input from '../components/Common/Input'
import loadingIcon from '../assets/images/logo/ball-triangle.svg'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlinePlus,
} from 'react-icons/ai'
import join_image from '../assets/images/join_web_1.jpg'
import useWindowWidth from '../hooks/useWindowWidth'
import { useHandleSignUp } from '../hooks/usehandleSignUp'
import { checkEmailExists } from '../utill/checkEmailExists'
import Swal from 'sweetalert2'

export default function Join() {
  const windowWidth = useWindowWidth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isIdValid, setIsIdValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
  const [isEmailExists, setIsEmailExists] = useState(false)
  const [ischeckRedundancyOpened, setIscheckRedundancyOpened] = useState(false)
  const [isRequiredChecked, setIsRequiredChecked] = useState(false)
  const { handleSignUp, errorMessage } = useHandleSignUp()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false) // 비밀번호 보이기 상태 관리

  useEffect(() => {
    if (password !== confirmPassword) {
      setIsConfirmPasswordValid(false)
    } else if (password === confirmPassword) {
      setIsConfirmPasswordValid(true)
    }

    if (confirmPassword === '') {
      setIsConfirmPasswordValid(false)
    }
  }, [password, confirmPassword])

  return (
    <JoinCon>
      <FormCon windowwidth={windowWidth}>
        <FormWrapper>
          <FormTitle>Tribe 회원가입</FormTitle>
          <Form
            action=""
            onSubmit={async e => {
              e.preventDefault()

              // 이메일 입력 유무 검사
              if (!email.trim()) {
                Swal.fire({
                  text: '사용하실 이메일을 입력해주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 이메일 유효성 검사
              if (!isIdValid) {
                Swal.fire({
                  text: '올바른 이메일 형식으로 입력해주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 이메일 중복 확인
              if (!ischeckRedundancyOpened) {
                Swal.fire({
                  text: '이메일 중복 확인해 주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              if (isEmailExists) {
                Swal.fire({
                  text: '이미 가입한 이메일 계정입니다.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 이메일 입력 유무 검사
              if (!password.trim()) {
                Swal.fire({
                  text: '사용하실 비밀번호를 입력해주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 비밀번호 유효성 검사
              if (!isPasswordValid) {
                Swal.fire({
                  text: '올바른 비밀번호 형식으로 입력해주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 비밀번호 확인 우뮤 검사
              if (!confirmPassword.trim()) {
                Swal.fire({
                  text: '확인을 위해 비밀번호를 재입력해주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 비밀번호 확인 요휴성 검사
              if (!isConfirmPasswordValid) {
                Swal.fire({
                  text: '비밀번호가 일치하지 않습니다. 확인해 주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 필수 동의 체크박스 검사
              if (!isRequiredChecked) {
                Swal.fire({
                  text: '필수 약관에 동의해 주세요.',
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
                return
              }

              // 회원가입 처리
              try {
                await handleSignUp(email, password)
              } catch (error) {
                Swal.fire({
                  text: `${errorMessage}`,
                  icon: 'warning',
                  confirmButtonColor: '#1E1E1E',
                  confirmButtonText: '확인',
                  scrollbarPadding: false,
                })
              }
            }}
          >
            {/* 이메일 입력 및 중복 확인 */}
            <IdInputCon>
              <Input
                type="text"
                placeholder="사용하실 이메일을 입력해주세요."
                setEmail={setEmail}
                email={email}
                setIsIdValid={setIsIdValid}
                setIscheckRedundancyOpened={setIscheckRedundancyOpened}
              />
              <button
                type="button"
                onClick={async () => {
                  if (isIdValid && email.length > 0) {
                    await setIscheckRedundancyOpened(true)
                    const result = await checkEmailExists(email)
                    setIsEmailExists(result)
                  }
                }}
              >
                중복확인
              </button>
            </IdInputCon>

            <HelperTextCon>
              <HelperText>
                {ischeckRedundancyOpened && (
                  <div>
                    <CheckRedundancy isemailexists={isEmailExists.toString()}>
                      {isEmailExists
                        ? '이미 가입한 이메일입니다.'
                        : '사용 가능한 이메일입니다.'}
                    </CheckRedundancy>
                  </div>
                )}
                {!ischeckRedundancyOpened && email === '' && (
                  <div>@앞 4~12자/영문 소문자, 숫자 가능 (중복확인 필수)</div>
                )}
                {!ischeckRedundancyOpened && email && isIdValid && (
                  <div style={{ color: 'rgb(0, 101, 196)' }}>
                    올바른 이메일 형식입니다, 중복확인을 해주세요.
                  </div>
                )}
                {!ischeckRedundancyOpened && email && !isIdValid && (
                  <WarningText>올바른 이메일 형식이 아닙니다.</WarningText>
                )}
              </HelperText>
            </HelperTextCon>

            {/* 비밀번호 입력 */}
            <PasswordInputCon>
              <InputWrapper>
                <Input
                  setPassword={setPassword}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  password={password}
                  setIsPasswordValid={setIsPasswordValid}
                />
              </InputWrapper>

              {/* 비밀번호 확인 입력 및 아이콘 */}
              <InputWrapper>
                <Input
                  setConfirmPassword={setConfirmPassword}
                  type={isPasswordVisible ? 'text' : 'password'} // 상태에 따라 type 변경
                  placeholder="비밀번호 확인을 위해 다시 입력해주세요."
                />
                {/* 눈 모양 아이콘 */}
                <EyeIcon onClick={() => setIsPasswordVisible(prev => !prev)}>
                  {isPasswordVisible ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </EyeIcon>
              </InputWrapper>
            </PasswordInputCon>

            <HelperTextCon>
              {/* 비밀번호 조건 안내 및 유효성/일치 확인 메시지 */}
              {!password.trim() && (
                <HelperText>
                  6~20자/영문 대문자. 소문자, 숫자, 특수문자 중 2가지 이상 조합
                </HelperText>
              )}

              {/* 우선순위: 비밀번호 형식이 잘못된 경우만 표시 */}
              {password && !isPasswordValid && (
                <WarningText>올바른 비밀번호 형식이 아닙니다.</WarningText>
              )}

              {/* 비밀번호 형식이 올바를 때만 일치 여부 확인 */}
              {password.trim() &&
                isPasswordValid &&
                confirmPassword &&
                !isConfirmPasswordValid && (
                  <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
                )}

              {/* 비밀번호가 올바르고 비밀번호 확인란이 비어 있을 때 */}
              {isPasswordValid && !confirmPassword && (
                <HelperText style={{ color: 'rgb(0, 101, 196)' }}>
                  올바른 비밀번호 형식입니다.
                </HelperText>
              )}

              {/* 비밀번호가 올바르고 비밀번호 확인도 일치할 때 */}
              {isPasswordValid && isConfirmPasswordValid && confirmPassword && (
                <ValidText>비밀번호가 일치합니다.</ValidText>
              )}
            </HelperTextCon>

            <hr />

            {/* 필수 약관 동의 */}
            <AgreeCon>
              <AgreeWrapper>
                <input
                  type="checkbox"
                  checked={isRequiredChecked}
                  onChange={e => setIsRequiredChecked(e.target.checked)}
                />
                <label>[필수]만 14세 이상이며 모두 동의합니다.</label>
              </AgreeWrapper>
              <AiOutlinePlus />
            </AgreeCon>

            <AgreeCon>
              <AgreeWrapper>
                <input type="checkbox" />
                <label>[선택]광고성 정보 수신에 모두 동의합니다.</label>
              </AgreeWrapper>
              <AiOutlinePlus />
            </AgreeCon>

            <JoinBtn type="submit">가입하기</JoinBtn>
          </Form>
        </FormWrapper>
      </FormCon>

      {windowWidth === 1920 && (
        <ImgCon>
          {!isImageLoaded && (
            <Loading>
              <img src={loadingIcon} alt="Loading..." />
            </Loading>
          )}
          <img
            src={join_image}
            alt=""
            onLoad={() => setIsImageLoaded(true)}
            style={{ display: isImageLoaded ? 'block' : 'none' }}
          />
        </ImgCon>
      )}
    </JoinCon>
  )
}

const JoinCon = styled.div`
  width: 100%;
  display: flex;
`

interface FormConType {
  windowwidth: number
}

const FormCon = styled.div<FormConType>`
  width: ${props => (props.windowwidth === 1920 ? '50%' : '100%')};
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    input {
      margin-bottom: 10px;
    }
  }

  @media (max-width: 600px) {
    form {
      input {
        margin-bottom: 10px;
      }
    }
  }
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 476px;

  hr {
    width: 100%;
    margin-bottom: 30px;
  }

  @media (max-width: 600px) {
    min-width: none;

    hr {
      width: 80%;
      margin-bottom: 10px;
    }
  }
`

const Form = styled.form``

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 40px;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    width: 85%;
    margin: 0 auto 30px;
    padding-left: 10px;
  }
`
const IdInputCon = styled.div`
  width: 100%;
  display: flex;

  input {
    flex: 1 0 0;
  }

  button {
    height: 100%;
    font-size: 0.9rem;
    font-weight: 300;
    padding: 12px;
    margin-left: 4px;
    background-color: rgba(30, 30, 30, 1);
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: rgba(50, 50, 50, 1);
    }
  }

  @media (max-width: 600px) {
    width: 80%;
    display: flex;
    margin: 0 auto;
    align-item: center;

    input {
      flex: 1 0 0;
    }

    button {
      font-size: 0.8rem;
      padding: 10px 12px;
      margin-left: 6px;
    }
  }
`

const PasswordInputCon = styled.div`
  width: 100%;
`
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
  }

  @media (max-width: 600px) {
    display: flex;
    input {
      width: 80%;
    }
  }
`

const EyeIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-70%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #000;

  @media (max-width: 600px) {
    right: 60px;
  }
`

const HelperTextCon = styled.div`
  width: 100%;
  display: flex;
  margin-left: 10px;

  @media (max-width: 600px) {
    width: 90%;
    margin-bottom: 40px;
    padding-left: 10px;
  }
`

const HelperText = styled.p`
  font-size: 0.9rem;
  color: rgba(90, 90, 90, 1); /* 비밀번호 조건 텍스트와 동일한 색상 */
  margin: 6px 0 35px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`

const WarningText = styled.span`
  color: red;
  font-size: 0.9rem;
  margin: 6px 0 35px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`

const ValidText = styled.span`
  color: green;
  font-size: 0.9rem;
  margin: 6px 0 35px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`

const CheckRedundancy = styled.span<{ isemailexists: string }>`
  color: ${props => (props.isemailexists === 'true' ? 'red' : 'green')};
`

const AgreeCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;

  @media (max-width: 600px) {
    width: 80%;
    margin: 10px auto;
  }
`

const AgreeWrapper = styled.div`
  input {
    margin: 10px 10px 0 0;
  }

  label {
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    display: flex;

    input {
      width: 10px;
      margin: 0 14px 0 0;
    }

    label {
      font-size: 0.8rem;
    }
  }
`

const JoinBtn = styled.button`
  color: #fff;
  background-color: rgba(30, 30, 30, 1);
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  margin-top: 30px;

  &:hover {
    background-color: rgba(50, 50, 50, 1);
  }

  @media (max-width: 600px) {
    width: 80%;
    margin: 20px auto 0;
  }
`

const ImgCon = styled.div`
  width: 50%;
  height: 100vh;
  overflow: hidden;

  img {
    width: 100%;
    height: 100vh;
  }
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  width: 100%;

  img {
    width: 15%;
  }
`
