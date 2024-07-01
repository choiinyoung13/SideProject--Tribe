import styled from 'styled-components'
import Input from '../components/Common/Input'
import { AiOutlinePlus } from 'react-icons/ai'
import join_image from '../assets/images/join_web_1.jpg'
import useWindowWidth from '../hooks/useWindowWidth'
import { useEffect, useState } from 'react'
import { useHandleSignUp } from '../hooks/usehandleSignUp'
import { checkEmailExists } from '../utill/checkEmailExists'

export default function Join() {
  const windowWidth = useWindowWidth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isIdValid, setIsIdValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
  const [isEmailExists, setIsEmailExists] = useState(false)
  const [ischeckRedundancyOpened, setIscheckRedundancyOpened] = useState(false)
  const { handleSignUp, errorMessage } = useHandleSignUp()

  useEffect(() => {
    if (email === '') {
      setIsIdValid(true)
    }
  }, [email])

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
            onSubmit={e => {
              e.preventDefault()
              try {
                if (!isIdValid) {
                  alert('올바른 아이디 형식으로 적어 주세요')
                  return
                }

                if (!isPasswordValid) {
                  alert('올바른 비밀번호 형식으로 적어 주세요')
                  return
                }

                if (!isConfirmPasswordValid) {
                  alert('비밀번호 일치하지 않습니다 확인해 주세요.')
                  return
                }

                if (isEmailExists) {
                  alert('이미 가입한 이메일 계정입니다.')
                  return
                }

                if (!ischeckRedundancyOpened) {
                  alert('이메일 중복 확인해 주세요.')
                  return
                }
                handleSignUp(email, password)
              } catch {
                alert(errorMessage)
              }
            }}
          >
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
              <IdHelperText>
                {ischeckRedundancyOpened && (
                  <div>
                    <CheckRedundancy isemailexists={isEmailExists.toString()}>
                      {isEmailExists
                        ? '이미 가입한 이메일입니다.'
                        : '사용 가능한 이메일입니다.'}
                    </CheckRedundancy>
                  </div>
                )}
                {!ischeckRedundancyOpened && (
                  <div>
                    {isIdValid ? (
                      '@앞 4~12자/영문 소문자, 숫자 가능 (중복확인 필수)'
                    ) : (
                      <WarningText>올바른 이메일 형식이 아닙니다.</WarningText>
                    )}
                  </div>
                )}
              </IdHelperText>
            </HelperTextCon>
            <PasswordInputCon>
              <Input
                setPassword={setPassword}
                type="password"
                placeholder="비밀번호를 입력해주세요."
                password={password}
                setIsPasswordValid={setIsPasswordValid}
              />
              <Input
                setConfirmPassword={setConfirmPassword}
                type="password"
                placeholder="비밀번호 확인을 위해 다시 입력해주세요."
              />
            </PasswordInputCon>
            <HelperTextCon>
              <PasswordHelperText>
                {!isPasswordValid && password.length >= 1 ? (
                  <WarningText>올바른 비밀번호 형식이 아닙니다.</WarningText>
                ) : !isConfirmPasswordValid && confirmPassword.length === 0 ? (
                  '6~20자/영문 대문자. 소문자, 숫자, 특수문자 중 2가지 이상 조합'
                ) : !isConfirmPasswordValid && confirmPassword.length >= 1 ? (
                  <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
                ) : (
                  <ValidText>비밀번호가 일치합니다.</ValidText>
                )}
              </PasswordHelperText>
            </HelperTextCon>

            <hr />
            <AgreeCon>
              <AgreeWrapper>
                <input type="checkbox" required />
                <label htmlFor="">
                  {' '}
                  [필수]만 14세 이상이며 모두 동의합니다.
                </label>
              </AgreeWrapper>
              <AiOutlinePlus />
            </AgreeCon>
            <AgreeCon>
              <AgreeWrapper>
                <input type="checkbox" required />
                <label htmlFor="">
                  {' '}
                  [선택]광고성 정보 수신에 모두 동의합니다.
                </label>
              </AgreeWrapper>
              <AiOutlinePlus />
            </AgreeCon>
            <JoinBtn type="submit">가입하기</JoinBtn>
          </Form>
        </FormWrapper>
      </FormCon>
      {windowWidth === 1920 && (
        <ImgCon>
          <img src={join_image} alt="" />
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
  over-flow: hidden;
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
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 410px;

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
    font-size: 1rem;
    padding: 10px 12px;
    margin-left: 4px;
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
  input {
    width: 100%;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    input {
      width: 80%;
    }
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

const IdHelperText = styled.p`
  font-size: 0.9rem;
  color: 'rgba(90, 90, 90, 1)';
  margin: 6px 0 40px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`

const PasswordHelperText = styled.p`
  font-size: 0.9rem;
  color: rgba(90, 90, 90, 1);
  margin: 6px 0 40px;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    width: 85%;
    margin: 0 auto;
  }
`

const WarningText = styled.span`
  color: red;
`

const ValidText = styled.span`
  color: green;
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
    margin: 0 auto;
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
    label {
      font-size: 0.8rem;
    }
  }
`
const JoinBtn = styled.button`
  color: #fff;
  background-color: rgba(20, 20, 20, 1);
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  margin-top: 30px;

  &:hover {
    background-color: rgba(30, 30, 30, 1);
  }

  @media (max-width: 600px) {
    width: 80%;
    margin: 20px auto 0;
  }
`

const ImgCon = styled.div`
  width: 50%;
  height: 100vh;
  over-flow: hidden;

  img {
    width: 100%;
    height: 100vh;
  }
`
