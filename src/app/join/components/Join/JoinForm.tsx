'use client'

import EmailSection from './EmailSection'
import PasswordSection from './PasswordSection'
import AgreeSection from './AgreeSection'
import { useJoinFormLogic } from './JoinFormLogic'
import { useCallback, useState } from 'react'
import type { JoinFormData } from '@/features/auth/join/types'

/**
 * 회원가입 컴포넌트 - UI와 로직 완전 분리
 */
export const JoinForm = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState<JoinFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    isEmailValid: false,
    isPasswordValid: false,
    isConfirmPasswordValid: false,
    isEmailExists: null,
    isRequiredChecked: false,
    isInputsDisabled: false,
  })

  const updateFormData = useCallback((updates: Partial<JoinFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }, [])

  // 하위 컴포넌트 prop 타입(Dispatch<SetStateAction<T>>)과 맞추기 위해 setState 형태로 제공합니다.
  const updateEmail = useCallback<React.Dispatch<React.SetStateAction<string>>>(
    value => {
      setFormData(prev => ({
        ...prev,
        email: typeof value === 'function' ? value(prev.email) : value,
      }))
    },
    []
  )
  const updatePassword = useCallback<
    React.Dispatch<React.SetStateAction<string>>
  >(value => {
    setFormData(prev => ({
      ...prev,
      password: typeof value === 'function' ? value(prev.password) : value,
    }))
  }, [])
  const updateConfirmPassword = useCallback<
    React.Dispatch<React.SetStateAction<string>>
  >(value => {
    setFormData(prev => ({
      ...prev,
      confirmPassword:
        typeof value === 'function' ? value(prev.confirmPassword) : value,
    }))
  }, [])

  const updateIsEmailValid = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(value => {
    setFormData(prev => ({
      ...prev,
      isEmailValid:
        typeof value === 'function' ? value(prev.isEmailValid) : value,
    }))
  }, [])
  const updateIsPasswordValid = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(value => {
    setFormData(prev => ({
      ...prev,
      isPasswordValid:
        typeof value === 'function' ? value(prev.isPasswordValid) : value,
    }))
  }, [])
  const updateIsConfirmPasswordValid = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(value => {
    setFormData(prev => ({
      ...prev,
      isConfirmPasswordValid:
        typeof value === 'function'
          ? value(prev.isConfirmPasswordValid)
          : value,
    }))
  }, [])
  const updateIsEmailExists = useCallback<
    React.Dispatch<React.SetStateAction<boolean | null>>
  >(value => {
    setFormData(prev => ({
      ...prev,
      isEmailExists:
        typeof value === 'function' ? value(prev.isEmailExists) : value,
    }))
  }, [])
  const updateIsRequiredChecked = useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >(value => {
    setFormData(prev => ({
      ...prev,
      isRequiredChecked:
        typeof value === 'function' ? value(prev.isRequiredChecked) : value,
    }))
  }, [])

  // 핵심 비즈니스 로직
  const { isSignUpLoading, handleSubmit, openVerificationModal } =
    useJoinFormLogic({
      formData,
      updateFormData,
    })

  return (
    <div
      className="h-screen min-h-[900px] flex-1 min-w-0 flex justify-center items-center max-[600px]:min-h-[700px] w-full"
    >
      <div className="flex flex-col justify-center items-center min-w-[476px]">
        <div className="flex w-full max-[600px]:w-[85%]">
          <h2 className="text-[1.8rem] font-bold mb-[40px]">Tribe 회원가입</h2>
        </div>
        <form className="w-full max-[600px]:w-[85%]" onSubmit={handleSubmit}>
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
            <button
              className="w-full h-[50px] text-white text-[1rem] bg-[rgba(30,30,30,1)] cursor-pointer border-0 rounded-[6px] mt-[30px] flex justify-center items-center pb-[1px] hover:bg-[rgba(50,50,50,1)] disabled:bg-[rgba(150,150,150,1)] disabled:cursor-not-allowed disabled:hover:bg-[rgba(150,150,150,1)] max-[600px]:mt-[20px] max-[600px]:text-[0.9rem] max-[600px]:h-[40px]"
              type="button"
              onClick={() => openVerificationModal(formData.email)}
            >
              OTP 인증하기
            </button>
          ) : (
            <button
              className="w-full h-[50px] text-white text-[1rem] bg-[rgba(30,30,30,1)] cursor-pointer border-0 rounded-[6px] mt-[30px] flex justify-center items-center pb-[1px] hover:bg-[rgba(50,50,50,1)] disabled:bg-[rgba(150,150,150,1)] disabled:cursor-not-allowed disabled:hover:bg-[rgba(150,150,150,1)] max-[600px]:mt-[20px] max-[600px]:text-[0.9rem] max-[600px]:h-[40px]"
              type="submit"
              disabled={isSignUpLoading}
            >
              {isSignUpLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white motion-safe:animate-dot-pulse" />
                  <div
                    className="w-2 h-2 rounded-full bg-white motion-safe:animate-dot-pulse"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full bg-white motion-safe:animate-dot-pulse"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
              ) : (
                '가입하기'
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
