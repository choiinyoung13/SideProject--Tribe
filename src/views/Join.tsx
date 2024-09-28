import { useState, useEffect } from 'react'
import styled from 'styled-components'
import loadingIcon from '../assets/images/logo/ball-triangle.svg'
import join_image from '../assets/images/join_web_1.jpg'
import useWindowWidth from '../hooks/useWindowWidth'
import { useHandleSignUp } from '../hooks/usehandleSignUp'
import Swal from 'sweetalert2'
import EmailSection from '../components/Join/EmailSection'
import PasswordSection from '../components/Join/PasswordSection'
import AgreeSection from '../components/Join/AgreeSection'
import Spinner from '../components/Common/Spinner'
import { useNavigate } from 'react-router-dom'

export default function Join() {
  const windowWidth = useWindowWidth()
  const [email, setEmail] = useState(sessionStorage.getItem('email') || '') // 세션에서 데이터 복원
  const [isEmailValid, setIsEmailValid] = useState(
    JSON.parse(sessionStorage.getItem('isEmailValid') || 'false')
  )
  const [password, setPassword] = useState(
    sessionStorage.getItem('password') || ''
  )
  const [confirmPassword, setConfirmPassword] = useState(
    sessionStorage.getItem('confirmPassword') || ''
  )
  const [isPasswordValid, setIsPasswordValid] = useState(
    JSON.parse(sessionStorage.getItem('isPasswordValid') || 'false')
  )
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(
    JSON.parse(sessionStorage.getItem('isConfirmPasswordValid') || 'false')
  )
  const [isEmailExists, setIsEmailExists] = useState<boolean | null>(
    JSON.parse(sessionStorage.getItem('isEmailExists') || 'null')
  )
  const [isRequiredChecked, setIsRequiredChecked] = useState(
    JSON.parse(sessionStorage.getItem('isRequiredChecked') || 'false')
  )
  const [isInputsDisabled, setIsInputsDisabled] = useState(
    JSON.parse(sessionStorage.getItem('isInputsDisabled') || 'false')
  )
  const { handleSignUp, verifyOtpCode } = useHandleSignUp()
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isSignUpLoading, setIsSignUpLoading] = useState(false)
  const navigate = useNavigate()

  // 취소 버튼을 눌렀을 때 세션에 데이터 저장
  const saveToSession = () => {
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('isEmailValid', JSON.stringify(isEmailValid))
    sessionStorage.setItem('password', password)
    sessionStorage.setItem('confirmPassword', confirmPassword)
    sessionStorage.setItem('isPasswordValid', JSON.stringify(isPasswordValid))
    sessionStorage.setItem(
      'isConfirmPasswordValid',
      JSON.stringify(isConfirmPasswordValid)
    )
    sessionStorage.setItem('isEmailExists', JSON.stringify(isEmailExists))
    sessionStorage.setItem(
      'isRequiredChecked',
      JSON.stringify(isRequiredChecked)
    )
    sessionStorage.setItem('isInputsDisabled', JSON.stringify(true))
  }

  // 인증번호 입력 모달 띄우기
  const openVerificationModal = (email: string) => {
    Swal.fire({
      html: `
        <h1 style="font-weight:500; font-size:22px;">인증번호 입력</h1>
        <input type="text" id="otp-code" class="swal2-input" placeholder="6자리 인증번호 입력">
      `,
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
      allowOutsideClick: false,
      confirmButtonColor: '#1E1E1E',
      cancelButtonColor: '#1E1E1E',
      preConfirm: () => {
        const otpCode = (
          document.getElementById('otp-code') as HTMLInputElement
        ).value
        if (!otpCode || otpCode.length !== 6) {
          Swal.showValidationMessage('6자리 인증번호를 입력하세요.')
          return false
        }
        return otpCode
      },
    }).then(async result => {
      if (result.isConfirmed && result.value) {
        // 인증번호 검증 로직 실행
        const success = await verifyOtpCode(email, result.value)
        if (success) {
          Swal.fire({
            text: '이메일 인증이 완료되었습니다!',
            icon: 'success',
            confirmButtonColor: '#1E1E1E',
            confirmButtonText: '확인',
          }).then(() => {
            // 인증 성공 후 리다이렉트
            navigate('/')
          })
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // 인증번호 모달을 취소했을 때 처리 (입력 필드 비활성화)
        setIsInputsDisabled(true)
        saveToSession() // 취소했을 때 세션에 데이터 저장
      }
    })
  }

  // 폼 제출 핸들러
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

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

    if (!isEmailValid) {
      Swal.fire({
        text: '올바른 이메일 형식으로 입력해주세요.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    if (isEmailExists === null) {
      Swal.fire({
        text: '중복확인을 진행해 주세요.',
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

    if (!confirmPassword.trim()) {
      Swal.fire({
        text: '비밀번호 확인란을 입력해주세요.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

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
    setIsSignUpLoading(true)
    const result = await handleSignUp(email, password)

    if (!result.success) {
      // 계정 등록 실패 메시지
      if (result.error?.message === 'email rate limit exceeded') {
        Swal.fire({
          text: '이메일 발신 횟수 제한을 초과했습니다.',
          icon: 'warning',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
      } else {
        Swal.fire({
          text: '계정등록 오류가 발생했습니다.',
          icon: 'warning',
          confirmButtonColor: '#1E1E1E',
          confirmButtonText: '확인',
          scrollbarPadding: false,
        })
      }
      setIsSignUpLoading(false)
      return
    }

    // 계정 등록 성공 메시지
    Swal.fire({
      html: '<strong>계정 등록이 성공했습니다!</strong><br>이메일을 확인하여 인증을 완료해 주세요.',
      icon: 'success',
      confirmButtonColor: '#1E1E1E',
      confirmButtonText: '확인',
      scrollbarPadding: false,
    }).then(() => {
      // 이메일 인증번호 모달을 띄움
      openVerificationModal(email)
    })
    setIsSignUpLoading(false)
  }

  return (
    <JoinCon>
      <FormCon windowwidth={windowWidth}>
        <FormWrapper>
          <FormTitleWrapper>
            <FormTitle>Tribe 회원가입</FormTitle>
          </FormTitleWrapper>
          <Form onSubmit={onSubmit}>
            <EmailSection
              email={email}
              setEmail={setEmail}
              setIsEmailValid={setIsEmailValid}
              isEmailExists={isEmailExists}
              setIsEmailExists={setIsEmailExists}
              disabled={isInputsDisabled} // 비활성화 상태 적용
            />
            <PasswordSection
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              setIsPasswordValid={setIsPasswordValid}
              setIsConfirmPasswordValid={setIsConfirmPasswordValid}
              disabled={isInputsDisabled} // 비활성화 상태 적용
            />
            <AgreeSection
              isRequiredChecked={isRequiredChecked}
              setIsRequiredChecked={setIsRequiredChecked}
              disabled={isInputsDisabled} // 비활성화 상태 적용
            />
            {isInputsDisabled ? (
              <JoinBtn
                type="button"
                onClick={() => openVerificationModal(email)} // 이메일 인증 버튼으로 변경
              >
                이메일 인증
              </JoinBtn>
            ) : (
              <JoinBtn type="submit" disabled={isSignUpLoading}>
                {isSignUpLoading ? (
                  <Spinner width={20} height={20} />
                ) : (
                  '가입하기'
                )}
              </JoinBtn>
            )}
          </Form>
        </FormWrapper>
      </FormCon>
      <ImgCon>
        {!isImageLoaded && (
          <Loading>
            <img src={loadingIcon} alt="Loading..." />
          </Loading>
        )}
        <img
          src={join_image}
          alt="회원가입 페이지 이미지"
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
  align-items: center;
  min-width: 476px;
`

const Form = styled.form`
  width: 100%;

  @media (max-width: 600px) {
    width: 85%;
  }
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 40px;
`

const FormTitleWrapper = styled.div`
  display: flex;
  width: 100%;

  @media (max-width: 600px) {
    width: 85%;
  }
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
  height: 50px;
  color: #fff;
  font-size: 1rem;
  background-color: rgba(30, 30, 30, 1);
  cursor: pointer;
  border: none;
  border-radius: 6px;
  margin-top: 30px;

  &:hover {
    background-color: rgba(50, 50, 50, 1);
  }

  &:disabled {
    background-color: rgba(150, 150, 150, 1);
    cursor: not-allowed;
  }

  &:disabled:hover {
    background-color: rgba(150, 150, 150, 1);
  }

  @media (max-width: 600px) {
    margin-top: 20px;
    font-size: 0.9rem;
    height: 40px;
  }
`
