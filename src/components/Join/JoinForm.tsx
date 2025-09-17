import styled from 'styled-components'
import EmailSection from './EmailSection'
import PasswordSection from './PasswordSection'
import AgreeSection from './AgreeSection'
import Spinner from '../Common/Spinner'
import { useJoinForm } from '../../hooks/useJoinForm'
import { useJoinFormLogic } from './JoinFormLogic'
import { JOIN_CONSTANTS } from '../../constants/joinConstants'

interface JoinFormProps {
  windowWidth: number
}

/**
 * 회원가입 폼 컴포넌트 - UI와 로직 완전 분리
 */
export const JoinForm = ({ windowWidth }: JoinFormProps) => {
  // 폼 상태 관리
  const {
    formData,
    updateFormData,
    updateEmail,
    updatePassword,
    updateConfirmPassword,
    updateIsEmailValid,
    updateIsPasswordValid,
    updateIsConfirmPasswordValid,
    updateIsEmailExists,
    updateIsRequiredChecked,
  } = useJoinForm()

  // 폼 비즈니스 로직
  const { isSignUpLoading, handleSubmit, openVerificationModal } =
    useJoinFormLogic({
      formData,
      updateFormData,
    })

  return (
    <FormCon windowwidth={windowWidth}>
      <FormWrapper>
        <FormTitleWrapper>
          <FormTitle>Tribe 회원가입</FormTitle>
        </FormTitleWrapper>
        <Form onSubmit={handleSubmit}>
          <EmailSection
            email={formData.email}
            setEmail={updateEmail}
            setIsEmailValid={updateIsEmailValid}
            isEmailExists={formData.isEmailExists}
            setIsEmailExists={updateIsEmailExists}
            disabled={formData.isInputsDisabled}
          />
          <PasswordSection
            password={formData.password}
            setPassword={updatePassword}
            confirmPassword={formData.confirmPassword}
            setConfirmPassword={updateConfirmPassword}
            setIsPasswordValid={updateIsPasswordValid}
            setIsConfirmPasswordValid={updateIsConfirmPasswordValid}
            disabled={formData.isInputsDisabled}
          />
          <AgreeSection
            isRequiredChecked={formData.isRequiredChecked}
            setIsRequiredChecked={updateIsRequiredChecked}
            disabled={formData.isInputsDisabled}
          />
          {formData.isInputsDisabled ? (
            <JoinBtn
              type="button"
              onClick={() => openVerificationModal(formData.email)}
            >
              이메일 인증
            </JoinBtn>
          ) : (
            <JoinBtn type="submit" disabled={isSignUpLoading}>
              {isSignUpLoading ? (
                <Spinner width={27} height={27} />
              ) : (
                '가입하기'
              )}
            </JoinBtn>
          )}
        </Form>
      </FormWrapper>
    </FormCon>
  )
}

const FormCon = styled.div<{ windowwidth: number }>`
  width: ${props =>
    props.windowwidth >= JOIN_CONSTANTS.BREAKPOINTS.DESKTOP
      ? JOIN_CONSTANTS.LAYOUT.FORM_WIDTH_DESKTOP
      : JOIN_CONSTANTS.LAYOUT.FORM_WIDTH_MOBILE};
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;

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
