import Swal from 'sweetalert2'
import { SWAL_CONFIG, JOIN_CONSTANTS } from '../../constants/joinConstants'

interface VerificationModalProps {
  onSuccess: () => void
  onCancel: () => void
}

/**
 * 인증번호 입력 모달 컴포넌트 - 모달 로직 분리
 */
export const VerificationModal = {
  open: ({ onSuccess, onCancel }: VerificationModalProps) => {
    Swal.fire({
      html: `
        <h1 style="font-weight:500; font-size:22px;">인증번호 입력</h1>
        <input type="text" id="otp-code" class="swal2-input" placeholder="6자리 인증번호 입력">
      `,
      confirmButtonText: SWAL_CONFIG.CONFIRM_TEXT,
      showCancelButton: true,
      cancelButtonText: SWAL_CONFIG.CANCEL_TEXT,
      allowOutsideClick: false,
      confirmButtonColor: SWAL_CONFIG.CONFIRM_BUTTON_COLOR,
      cancelButtonColor: SWAL_CONFIG.CANCEL_BUTTON_COLOR,
      preConfirm: () => {
        const otpCode = (
          document.getElementById('otp-code') as HTMLInputElement
        ).value
        if (
          !otpCode ||
          otpCode.length !== JOIN_CONSTANTS.VALIDATION.OTP_LENGTH
        ) {
          Swal.showValidationMessage('6자리 인증번호를 입력하세요.')
          return false
        }
        return otpCode
      },
    }).then(async result => {
      if (result.isConfirmed && result.value) {
        onSuccess()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        onCancel()
      }
    })
  },

  showSuccess: (onConfirm: () => void) => {
    Swal.fire({
      text: '이메일 인증이 완료되었습니다!',
      icon: 'success',
      confirmButtonColor: SWAL_CONFIG.CONFIRM_BUTTON_COLOR,
      confirmButtonText: SWAL_CONFIG.CONFIRM_TEXT,
    }).then(onConfirm)
  },

  showError: (errorMessage: string, onRetry: () => void) => {
    Swal.fire({
      text: errorMessage,
      icon: 'warning',
      confirmButtonColor: SWAL_CONFIG.CONFIRM_BUTTON_COLOR,
      confirmButtonText: SWAL_CONFIG.CONFIRM_TEXT,
    }).then(result => {
      if (result.isConfirmed && result.value) {
        onRetry()
      }
    })
  },
}
