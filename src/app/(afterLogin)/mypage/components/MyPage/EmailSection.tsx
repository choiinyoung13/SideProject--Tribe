import Swal from 'sweetalert2'
import { useState } from 'react'
import { requestEmailChange } from '@/app/(afterLogin)/mypage/lib/user/requestEmailChange'
import { verifyEmailChangeOtp } from '@/app/(afterLogin)/mypage/lib/user/verifyEmailChangeOtp'
import { emailRegex } from '@/lib/utils/checkInputValueValid'
import { checkEmailExists } from '@/lib/utils/checkEmailExists'
import CircleLoading from '@/components/Common/CircleLoading'
import type { UserInfoType } from '@/types/UserInfoType'
import type { Dispatch, SetStateAction } from 'react'

interface EmailSectionProps {
  userInfo: UserInfoType
  isEmailEditMode: boolean
  setIsEmailEditMode: (value: boolean) => void
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>
}

export function EmailSection({
  userInfo,
  isEmailEditMode,
  setIsEmailEditMode,
  setUserInfo,
}: EmailSectionProps) {
  const [newEmail, setNewEmail] = useState<string>('')
  const [changeEmailLoading, setChangeEmailLoading] = useState<boolean>(false)

  const sendVerificationCode = async () => {
    if (!newEmail) return

    if (!emailRegex.test(newEmail)) {
      Swal.fire({
        text: '유효하지 않은 이메일 형식입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    const res = await checkEmailExists(newEmail)

    if (res) {
      Swal.fire({
        text: '이미 사용 중인 이메일입니다.',
        icon: 'warning',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
      return
    }

    await setChangeEmailLoading(true)
    const result = await requestEmailChange(newEmail)
    setChangeEmailLoading(false)

    if (result.success) {
      Swal.fire({
        html: '<strong>인증 메일을 발송했습니다.</strong><br>이메일을 확인하여 인증을 완료해 주세요.',
        icon: 'success',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
        allowOutsideClick: false,
      }).then(result => {
        if (result.isConfirmed) {
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
              const res = await verifyEmailChangeOtp(newEmail, result.value)

              if (res.success) {
                Swal.fire({
                  text: '이메일 인증이 완료되었습니다.',
                  icon: 'success',
                  confirmButtonColor: '#1E1E1E',
                  allowOutsideClick: false,
                  confirmButtonText: '확인',
                }).then(result => {
                  if (result.isConfirmed) {
                    window.location.reload()
                  }
                })
              } else if (!res.success) {
                if (res.error === 'Token has expired or is invalid') {
                  Swal.fire({
                    text: '인증코드가 유효하지 않습니다.',
                    icon: 'warning',
                    confirmButtonColor: '#1E1E1E',
                    confirmButtonText: '확인',
                  })
                } else {
                  Swal.fire({
                    text: '인증 과정 중 오류가 발생했습니다.',
                    icon: 'warning',
                    confirmButtonColor: '#1E1E1E',
                    confirmButtonText: '확인',
                  })
                }
              }
            }
          })
        }
      })
    } else {
      Swal.fire({
        text: '인증 메일 발송에 실패했습니다. 다시 시도해주세요.',
        icon: 'error',
        confirmButtonColor: '#1E1E1E',
        confirmButtonText: '확인',
        scrollbarPadding: false,
      })
    }
  }

  return (
    <section className="w-full">
      <div className="w-full flex items-center justify-between mb-[10px] [&_button]:bg-transparent [&_button]:border-0 [&_button]:cursor-pointer [&_button]:text-[1rem] [&_button]:text-[rgb(0,109,235)]">
        <div className="text-[1.2rem] font-[600] text-[rgba(50,50,50,1)] max-[768px]:text-[1.1rem]">
          이메일
        </div>
        <div>
          {!isEmailEditMode && (
            <button
              onClick={() => {
                setNewEmail(userInfo.email)
                setIsEmailEditMode(true)
              }}
            >
              수정
            </button>
          )}
          {isEmailEditMode && (
            <div className="flex">
              <button
                className="disabled:text-[rgba(150,150,150,1)] disabled:cursor-not-allowed"
                disabled={changeEmailLoading}
                onClick={() => {
                  sendVerificationCode()
                }}
              >
                {changeEmailLoading ? <CircleLoading /> : '이메일 수정'}
              </button>

              <button
                className="disabled:text-[rgba(150,150,150,1)] disabled:cursor-not-allowed"
                disabled={changeEmailLoading}
                onClick={() => {
                  setUserInfo({ ...userInfo })
                  setIsEmailEditMode(false)
                  setNewEmail('')
                }}
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="max-[768px]:[&_input]:text-[0.85rem] [&_input]:w-full [&_input]:p-[10px] [&_input]:text-[1rem] [&_input]:bg-[rgb(245,245,245)] [&_input]:border [&_input]:border-[rgba(230,230,230,1)] [&_input]:rounded-[6px] [&_input]:focus:outline [&_input]:focus:outline-2 [&_input]:focus:outline-[rgba(30,30,30,1)] [&_input]:disabled:text-[rgba(150,150,150,1)]">
        <input
          type="email"
          draggable={false}
          disabled={!isEmailEditMode || changeEmailLoading}
          value={newEmail ? newEmail : userInfo.email}
          onChange={e => setNewEmail(e.target.value)}
          style={{ pointerEvents: isEmailEditMode ? 'auto' : 'none' }}
        />
        <p className="leading-[28px] mt-[10px] text-[rgba(120,120,120,1)] text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis max-[768px]:text-[0.8rem]">
          * 이메일 수정 시 인증 메일이 발송되며, 해당 이메일 인증 완료 후 변경됩니다. <br />*
          이미 사용 중인 이메일로는 변경할 수 없습니다.
          <br />* 이메일 변경 완료 후 설정된 닉네임이 없다면 이메일 아이디로 닉네임이
          변경될 수 있습니다.
        </p>
      </div>
    </section>
  )
}


