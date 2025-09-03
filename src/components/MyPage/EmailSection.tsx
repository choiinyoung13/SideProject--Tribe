import styled from "styled-components";
import Swal from "sweetalert2";
import { useState } from "react";
import { ChangeEmail, verifyOtpCode } from "../../config/api/user/ChangeEmail";
import { emailRegex } from "../../utill/checkInputValueValid";
import { checkEmailExists } from "../../utill/checkEmailExists";
import CircleLoading from "../Common/CircleLoading";

interface EmailSectionProps {
  userInfo: any;
  isEmailEditMode: boolean;
  setIsEmailEditMode: (value: boolean) => void;
  setUserInfo: (userInfo: any) => void;
}

export function EmailSection({
  userInfo,
  isEmailEditMode,
  setIsEmailEditMode,
  setUserInfo,
}: EmailSectionProps) {
  const [newEmail, setNewEmail] = useState<string>("");
  const [changeEmailLoading, setChangeEmailLoading] = useState<boolean>(false);

  const sendVerificationCode = async () => {
    if (!newEmail) return;

    if (!emailRegex.test(newEmail)) {
      Swal.fire({
        text: "유효한 이메일 형식이 아닙니다.",
        icon: "warning",
        confirmButtonColor: "#1E1E1E",
        confirmButtonText: "확인",
        scrollbarPadding: false,
      });
      return;
    }

    const res = await checkEmailExists(newEmail);

    // 사용중인 이메일이 존재할 경우
    if (res) {
      Swal.fire({
        text: "현재 사용되고있는 이메일 입니다.",
        icon: "warning",
        confirmButtonColor: "#1E1E1E",
        confirmButtonText: "확인",
        scrollbarPadding: false,
      });
      return;
    }

    // 사용중인 이메일이 존재하지 않을 경우 해당 이메일로 인증번호 전송
    if (!res) {
      await setChangeEmailLoading(true);
      const result = await ChangeEmail(newEmail);
      setChangeEmailLoading(false);

      if (result.success) {
        Swal.fire({
          html: "<strong>인증 메일이 발송되었습니다!</strong><br>이메일을 확인하여 인증을 완료해 주세요.",
          icon: "success",
          confirmButtonColor: "#1E1E1E",
          confirmButtonText: "확인",
          scrollbarPadding: false,
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              html: `
                <h1 style="font-weight:500; font-size:22px;">인증번호 입력</h1>
                <input type="text" id="otp-code" class="swal2-input" placeholder="6자리 인증번호 입력">
              `,
              confirmButtonText: "확인",
              showCancelButton: true,
              cancelButtonText: "취소",
              allowOutsideClick: false,
              confirmButtonColor: "#1E1E1E",
              cancelButtonColor: "#1E1E1E",
              preConfirm: () => {
                const otpCode = (
                  document.getElementById("otp-code") as HTMLInputElement
                ).value;
                if (!otpCode || otpCode.length !== 6) {
                  Swal.showValidationMessage("6자리 인증번호를 입력하세요.");
                  return false;
                }
                return otpCode;
              },
            }).then(async (result) => {
              if (result.isConfirmed && result.value) {
                // 디버깅: 실제 값들 확인
                console.log("verifyOtpCode 호출 시 값들:");
                console.log("newEmail:", newEmail);
                console.log("result.value (OTP):", result.value);
                console.log("userInfo.email:", userInfo.email);

                // 인증번호 검증 로직 실행
                const res = await verifyOtpCode(newEmail, result.value);

                if (res.success) {
                  Swal.fire({
                    text: "이메일 인증이 완료되었습니다!",
                    icon: "success",
                    confirmButtonColor: "#1E1E1E",
                    allowOutsideClick: false,
                    confirmButtonText: "확인",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                } else if (!res.success) {
                  if (res.error === "Token has expired or is invalid") {
                    Swal.fire({
                      text: "인증코드가 유효하지 않습니다.",
                      icon: "warning",
                      confirmButtonColor: "#1E1E1E",
                      confirmButtonText: "확인",
                    });
                  } else {
                    Swal.fire({
                      text: "인증과정 중 오류가 발생했습니다.",
                      icon: "warning",
                      confirmButtonColor: "#1E1E1E",
                      confirmButtonText: "확인",
                    });
                  }
                }
              }
            });
          }
        });
      } else {
        Swal.fire({
          text: "인증 메일 발송에 실패했습니다. 다시 시도해 주세요.",
          icon: "error",
          confirmButtonColor: "#1E1E1E",
          confirmButtonText: "확인",
          scrollbarPadding: false,
        });
      }
    }
  };

  return (
    <Section>
      <SectionHeader>
        <Title>이메일</Title>
        <ButtonWrapper>
          {!isEmailEditMode && (
            <button
              onClick={() => {
                setNewEmail(userInfo.email);
                setIsEmailEditMode(true);
              }}
            >
              수정
            </button>
          )}
          {isEmailEditMode && (
            <EditButtonWrapper>
              <button
                disabled={changeEmailLoading}
                onClick={() => {
                  sendVerificationCode();
                }}
              >
                {changeEmailLoading ? <CircleLoading /> : "이메일 수정"}
              </button>

              <button
                disabled={changeEmailLoading}
                onClick={() => {
                  setUserInfo({ ...userInfo });
                  setIsEmailEditMode(false);
                  setNewEmail("");
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
          disabled={!isEmailEditMode || changeEmailLoading}
          value={newEmail ? newEmail : userInfo.email}
          onChange={(e) => setNewEmail(e.target.value)}
          style={{ pointerEvents: isEmailEditMode ? "auto" : "none" }}
        />
        <Infomation>
          * 이메일 수정 후 인증 메일 전송을 누르면 해당 이메일로 인증 메일이
          발송됩니다. <br />* 이미 사용중인 이메일로 변경 불가능합니다.
          <br />* 이메일 변경 시 따로 설정한 닉네임이 없다면 이메일 @앞부분
          아이디로 닉네임이 변경됩니다.
        </Infomation>
      </SectionBody>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
`;

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
`;

const SectionBody = styled.div`
  input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    background-color: rgb(245, 245, 245);
    border: 1px solid rgba(230, 230, 230, 1);
    border-radius: 6px;

    &:focus {
      outline: 2px solid rgba(30, 30, 30, 1);
    }

    &:disabled {
      color: rgba(150, 150, 150, 1);
    }
  }

  @media (max-width: 768px) {
    input {
      font-size: 0.85rem;
    }
  }
`;

const Infomation = styled.p`
  line-height: 28px;
  margin-top: 10px;
  color: rgba(120, 120, 120, 1);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(50, 50, 50, 1);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonWrapper = styled.div``;

const EditButtonWrapper = styled.div`
  display: flex;

  button {
    &:disabled {
      color: rgba(150, 150, 150, 1);
      cursor: not-allowed;
    }
  }
`;
