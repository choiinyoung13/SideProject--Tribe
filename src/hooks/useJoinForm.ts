import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { sessionStorageHelpers } from '../utill/sessionStorageHelpers'

/**
 * Join 폼 상태 관리를 위한 커스텀 훅
 */
export const useJoinForm = () => {
  const [formData, setFormData] = useState(() =>
    sessionStorageHelpers.restoreFromSession()
  )

  // 컴포넌트 언마운트 시 세션 클리어
  useEffect(() => {
    return () => {
      sessionStorageHelpers.clearSession()
    }
  }, [])

  // 폼 데이터 업데이트
  const updateFormData = (updates: Partial<typeof formData>) => {
    const newData = { ...formData, ...updates }
    setFormData(newData)
    sessionStorageHelpers.saveToSession(newData)
  }

  // 범용 업데이트 함수 생성기 - DRY 원칙 적용
  const createFieldUpdater = <T extends keyof typeof formData>(
    fieldName: T
  ): Dispatch<SetStateAction<(typeof formData)[T]>> => {
    return value => {
      const newValue =
        typeof value === 'function'
          ? (value as (prev: (typeof formData)[T]) => (typeof formData)[T])(
              formData[fieldName]
            )
          : value
      updateFormData({ [fieldName]: newValue } as Partial<typeof formData>)
    }
  }

  // 개별 필드 업데이트 함수들
  const fieldUpdaters = {
    updateEmail: createFieldUpdater('email'),
    updatePassword: createFieldUpdater('password'),
    updateConfirmPassword: createFieldUpdater('confirmPassword'),
    updateIsEmailValid: createFieldUpdater('isEmailValid'),
    updateIsPasswordValid: createFieldUpdater('isPasswordValid'),
    updateIsConfirmPasswordValid: createFieldUpdater('isConfirmPasswordValid'),
    updateIsEmailExists: createFieldUpdater('isEmailExists'),
    updateIsRequiredChecked: createFieldUpdater('isRequiredChecked'),
  }

  return {
    formData,
    updateFormData,
    ...fieldUpdaters,
  }
}
