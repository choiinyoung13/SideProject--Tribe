import styled from "styled-components";
import google_logo from "../assets/images/logo/logo_google.png";
import kakao_logo from "../assets/images/logo/logo_kakao.png";
import login_image from "../assets/images/logo/login_web_1.jpg";
import useWindowWidth from "../hooks/useWindowWidth";
import loadingIcon from "../assets/images/logo/ball-triangle.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHandleSignIn } from "../hooks/usehandleSignIn";
import Swal from "sweetalert2";
import { useHandleSignUp } from "../hooks/usehandleSignUp";

export default function Login() {
  const windowWidth = useWindowWidth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignIn, signInWithOAuth, errorMessage } = useHandleSignIn();
  const { verifyOtpCode } = useHandleSignUp();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  // 인증번호 입력 모달 띄우기
  const openVerificationModal = (email: string) => {
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
        // 인증번호 검증 로직 실행
        const res = await verifyOtpCode(email, result.value);

        if (res.success) {
          Swal.fire({
            text: "이메일 인증이 완료되었습니다!",
            icon: "success",
            confirmButtonColor: "#1E1E1E",
            confirmButtonText: "확인",
          }).then(() => {
            // 인증 성공 후 리다이렉트
            navigate("/");
            return;
          });
        } else if (!res.success && res.error) {
          if (res.error.message === "Token has expired or is invalid") {
            Swal.fire({
              text: "인증코드가 유효하지 않습니다.",
              icon: "warning",
              confirmButtonColor: "#1E1E1E",
              confirmButtonText: "확인",
            }).then((result) => {
              if (result.isConfirmed && result.value) {
                openVerificationModal(email);
                return;
              }
            });
          } else {
            Swal.fire({
              text: "인증과정 중 오류가 발생했습니다.",
              icon: "warning",
              confirmButtonColor: "#1E1E1E",
              confirmButtonText: "확인",
            }).then((result) => {
              if (result.isConfirmed && result.value) {
                openVerificationModal(email);
                return;
              }
            });
          }
        }
      }
    });
  };

  return (
    <LoginCon>
      <FormCon windowwidth={windowWidth}>
        <FormWrapper>
          <FormTitle>Tribe에 도착한 여러분 환영합니다.</FormTitle>
          <FormSubTitle>
            우리 함께 당신의 공간을 아름답게 꾸며 볼까요?
          </FormSubTitle>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!email.trim()) {
                Swal.fire({
                  text: "아이디를 입력해 주세요.",
                  icon: "warning",
                  confirmButtonColor: "#1E1E1E",
                  confirmButtonText: "확인",
                  scrollbarPadding: false,
                });
                return;
              }

              if (!password.trim()) {
                Swal.fire({
                  text: "비밀번호를 입력해 주세요.",
                  icon: "warning",
                  confirmButtonColor: "#1E1E1E",
                  confirmButtonText: "확인",
                  scrollbarPadding: false,
                });
                return;
              }

              const result = await handleSignIn(email, password);

              if (!result.success && result.error) {
                if (result?.error?.message === "Email not confirmed") {
                  Swal.fire({
                    text: "이메일 인증이 완료되지 않은 계정입니다.",
                    icon: "warning",
                    allowOutsideClick: false,
                    confirmButtonColor: "#1E1E1E",
                    confirmButtonText: "확인",
                    scrollbarPadding: false,
                  }).then((result) => {
                    if (result.isConfirmed && result.value) {
                      openVerificationModal(email);
                    }
                  });
                  return;
                }
              }
            }}
          >
            <EmailInput
              type="text"
              placeholder="가입한 이메일을 입력해주세요.( test계정 id: test1@gmail.com )"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <PasswordInput
              type="password"
              placeholder="비밀번호를 입력해주세요. ( test계정 pw: 123456 )"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errorMessage && (
              <p style={{ color: "rgb(243, 28, 0)" }}>{errorMessage}</p>
            )}
            <HelperTextCon>
              <HelperText>
                계정을 잊으셨나요? <span>ID찾기</span> 또는{" "}
                <span>비밀번호 찾기</span>
              </HelperText>
            </HelperTextCon>
            <LoginBtn type="submit">로그인</LoginBtn>
            <GoogleLoginBtn
              type="button"
              onClick={() => {
                signInWithOAuth("google");
              }}
            >
              <img src={google_logo} alt="" />
              Google로 시작하기
            </GoogleLoginBtn>
            <KaKaoLoginBtn
              type="button"
              onClick={() => {
                signInWithOAuth("kakao");
              }}
            >
              <img src={kakao_logo} alt="" />
              Kakao로 시작하기
            </KaKaoLoginBtn>
          </form>
          <HelperTextCon>
            <HelperText>
              아직 회원이 아니신가요?
              <span>
                <Link to={"/join"}> 회원가입</Link>
              </span>
            </HelperText>
          </HelperTextCon>
        </FormWrapper>
      </FormCon>

      <ImgCon>
        {!isImageLoaded && (
          <Loading>
            <img src={loadingIcon} alt="Loading..." />
          </Loading>
        )}
        <img
          src={login_image}
          alt=""
          onLoad={() => setIsImageLoaded(true)}
          style={{ display: isImageLoaded ? "block" : "none" }}
        />
      </ImgCon>
    </LoginCon>
  );
}

const LoginCon = styled.div`
  width: 100%;
  display: flex;
`;

interface FormConType {
  windowwidth: number;
}

const FormCon = styled.div<FormConType>`
  width: ${(props) => (props.windowwidth >= 1920 ? "50%" : "100%")};
  height: 100vh;
  min-height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    
  }

  @media (max-width: 600px) {
    min-height: 700px;
    }
  }
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  min-width: 460px;

  @media (max-width: 600px) {
    align-items: center;
    min-width: 100%;
  }
`;

const FormTitle = styled.h2`
  margin-top: 30px;
  font-size: 1.8rem;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }

  @media (max-width: 370px) {
    font-size: 1.1rem;
  }
`;

const FormSubTitle = styled.p`
  font-size: 1rem;
  color: rgba(40, 40, 40, 1);
  margin: 20px 0 50px;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    margin: 20px 0 38px;
  }
`;

const LoginBtn = styled.button`
  color: #fff;
  background-color: rgba(20, 20, 20, 1);
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: rgba(30, 30, 30, 1);
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 85%;
    margin: 0 auto 14px;
  }
`;
const GoogleLoginBtn = styled.button`
  color: rgba(20, 20, 20, 1);
  background-color: #fff;
  padding: 12px 20px;
  cursor: pointer;
  border: 1px solid rgba(200, 200, 200, 1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 85%;
    margin: 0 auto 14px;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const KaKaoLoginBtn = styled.button`
  color: rgba(20, 20, 20, 1);
  background-color: #fae100;
  padding: 12px 20px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 85%;
    margin: 0 auto;
    margin-bottom: 10px;

    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const HelperTextCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HelperText = styled.p`
  font-size: 0.9rem;
  color: rgba(90, 90, 90, 1);
  margin: 6px 0 50px;
  cursor: pointer;

  span {
    font-weight: 600;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const ImgCon = styled.div`
  width: 50%;
  height: 100vh;
  min-height: 900px;

  img {
    width: 100%;
    height: 100vh;
    min-height: 900px;
  }

  @media (max-width: 1919px) {
    display: none;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  img {
    width: 15%;
  }
`;

const EmailInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    width: 85%;
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`;

const PasswordInput = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  width: 100%;
  background-color: rgb(245, 245, 245);
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    width: 85%;
    font-size: 0.8rem;
    margin: 0 auto 14px;
  }
`;
