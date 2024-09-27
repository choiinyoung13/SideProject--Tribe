import { useEffect, useState } from 'react'
import styled from 'styled-components'
import loadingIcon from '../assets/images/logo/ball-triangle.svg'
import join_image from '../assets/images/join_web_1.jpg'
import useWindowWidth from '../hooks/useWindowWidth'
import { useHandleSignUp } from '../hooks/usehandleSignUp'
import Swal from 'sweetalert2'

import EmailSection from '../components/Join/EmailSection'
import PasswordSection from '../components/Join/PasswordSection'
import AgreeSection from '../components/Join/AgreeSection'

// 메인 Join 컴포넌트
export default function Join() {
  const windowWidth = useWindowWidth() // 창 너비 가져오기
  const [email, setEmail] = useState('') // 이메일 상태 관리
  const [password, setPassword] = useState('') // 비밀번호 상태 관리
  const [confirmPassword, setConfirmPassword] = useState('') // 비밀번호 확인 상태 관리
  const [isIdValid, setIsIdValid] = useState(true) // 이메일 유효성 상태
  const [isPasswordValid, setIsPasswordValid] = useState(false) // 비밀번호 유효성 상태
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false) // 비밀번호 일치 상태
  const [isEmailExists, setIsEmailExists] = useState(false) // 이메일 중복 확인 상태
  const [ischeckRedundancyOpened, setIscheckRedundancyOpened] = useState(false) // 중복 확인 여부
  const [isRequiredChecked, setIsRequiredChecked] = useState(false) // 필수 동의 여부
  const { handleSignUp, errorMessage } = useHandleSignUp() // 회원가입 처리 핸들러
  const [isImageLoaded, setIsImageLoaded] = useState(false) // 이미지 로딩 상태
  const [isPasswordVisible, setIsPasswordVisible] = useState(false) // 비밀번호 가시성 상태
  const [isOtpEmailSent, setIsOtpEmailSent] = useState(false) // OTP 이메일 발송 여부
  const [otp, setOtp] = useState('') // OTP 코드 상태
  const [isOtpValid, setIsOtpValid] = useState(false) // OTP 유효성 상태

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
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

  // 폼 제출 핸들러
  const onSubmit = async (e: { preventDefault: () => void }) => {
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

    // 인증번호 유효성 검사
    if (!isOtpValid) {
      Swal.fire({
        text: '인증번호가 다릅니다.',
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
  }

  return (
    <JoinCon>
      {/* 이메일 입력 섹션 */}
      <FormCon windowwidth={windowWidth}>
        <FormWrapper>
          <FormTitle>Tribe 회원가입</FormTitle>
          <Form onSubmit={onSubmit}>
            <EmailSection
              email={email}
              setEmail={setEmail}
              isIdValid={isIdValid}
              setIsIdValid={setIsIdValid}
              isEmailExists={isEmailExists}
              setIsEmailExists={setIsEmailExists}
              isOtpEmailSent={isOtpEmailSent}
              setIsOtpEmailSent={setIsOtpEmailSent}
              otp={otp}
              setOtp={setOtp}
              isOtpValid={isOtpValid}
              setIsOtpValid={setIsOtpValid}
              ischeckRedundancyOpened={ischeckRedundancyOpened}
              setIscheckRedundancyOpened={setIscheckRedundancyOpened}
            />

            {/* 비밀번호 입력 섹션 */}
            <PasswordSection
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              isPasswordVisible={isPasswordVisible}
              setIsPasswordVisible={setIsPasswordVisible}
              isPasswordValid={isPasswordValid}
              setIsPasswordValid={setIsPasswordValid}
              isConfirmPasswordValid={isConfirmPasswordValid}
            />

            <hr />

            {/* 필수 약관 동의 섹션 */}
            <AgreeSection
              isRequiredChecked={isRequiredChecked}
              setIsRequiredChecked={setIsRequiredChecked}
            />

            <JoinBtn type="submit">가입하기</JoinBtn>
          </Form>
        </FormWrapper>
      </FormCon>

      {/* 이미지 로딩 */}

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
  width: ${props => (props.windowwidth >= 1720 ? '50%' : '100%')};
  height: 100vh;
  min-height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    min-height: 700px;
  }
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 476px;
`

const Form = styled.form`
  width: 100%;
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 40px;
`

const ImgCon = styled.div`
  width: 50%;
  height: 100vh;
  min-height: 900px;

  img {
    width: 100%;
    height: 100vh;
    min-height: 900px;
  }

  @media (max-width: 1719px) {
    display: none;
  }
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  img {
    width: 15%;
  }
`

const JoinBtn = styled.button`
  width: 100%;
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
`
