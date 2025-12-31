'use client'

import { useEffect, useState } from 'react'

import { NicknameSection } from './MyPage/NicknameSection'
import { EmailSection } from './MyPage/EmailSection'
import { PasswordSection } from './MyPage/PasswordSection'
import { AccountDeletionSection } from './MyPage/AccountDeletionSection'
import { ProfileSection } from './MyPage/ProfileSection'
import { passwordRegex } from '@/lib/utils/checkInputValueValid'
import ActivitySection from './MyPage/ActivitySection'

import { useNavigate } from '@/shared/routing/navigation'
import { StatusMessageSection } from './MyPage/StatusMessageSection'
import type { UserInfoType } from '@/types/UserInfoType'
import { useSearchParams } from 'next/navigation'

type Props = {
  userId: string
  initialUserInfo: UserInfoType | null
}

export default function MyPage({ userId, initialUserInfo }: Props) {
  const [isNicknameEditMode, setIsNicknameEditMode] = useState(false)
  const [isStatusMessageEditMode, setIsStatusMessageEditMode] = useState(false)
  const [isEmailEditMode, setIsEmailEditMode] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    id: initialUserInfo?.id ?? userId,
    email: initialUserInfo?.email ?? '',
    avatar_url: initialUserInfo?.avatar_url ?? null,
    status_message: initialUserInfo?.status_message ?? null,
    username: initialUserInfo?.username ?? '',
    admin: initialUserInfo?.admin ?? false,
    likes: initialUserInfo?.likes ?? null,
    nickname: initialUserInfo?.nickname ?? null,
  })

  const [currentPassword, setCurrentPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
  const [warningText, setWarningText] = useState('')
  const [selectedReason, setSelectedReason] = useState('')
  const navigate = useNavigate()
  const isDeletionButtonDisabled = !selectedReason

  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  useEffect(() => {
    if (!initialUserInfo) return
    setUserInfo({
      id: initialUserInfo.id,
      email: initialUserInfo.email,
      avatar_url: initialUserInfo.avatar_url,
      status_message: initialUserInfo.status_message,
      username: initialUserInfo.username,
      admin: initialUserInfo.admin,
      likes: initialUserInfo.likes,
      nickname: initialUserInfo.nickname ? initialUserInfo.nickname : null,
    })
  }, [initialUserInfo])

  useEffect(() => {
    const isValidPassword = passwordRegex.test(password)
    setIsPasswordValid(isValidPassword)

    const isPasswordMatching = password === confirmPassword && password !== ''
    setIsConfirmPasswordValid(isPasswordMatching)

    if (!password) {
      setWarningText('')
    } else if (!isValidPassword && !isPasswordMatching) {
      setWarningText(
        '6~20자 / 영문자, 숫자, 특수문자 중 2가지 이상 조합만 가능합니다.'
      )
    } else if (!isValidPassword) {
      setWarningText(
        '6~20자 / 영문자, 숫자, 특수문자 중 2가지 이상 조합만 가능합니다.'
      )
    } else if (!isPasswordMatching && confirmPassword) {
      setWarningText('비밀번호가 일치하지 않습니다.')
    } else {
      setWarningText('')
    }
  }, [password, confirmPassword])

  return (
    <div className="mt-[100px] border-t border-[rgba(210,210,210,1)] pb-[90px] max-[768px]:mt-[74px] max-[768px]:pb-[80px] max-[600px]:mt-[60px]">
      <header className="max-w-[1080px] mx-auto">
        <div className="flex w-full mx-auto border-b border-[rgba(230,230,230,1)] gap-[23px]">
          <div
            className={`py-[20px] text-[1rem] cursor-pointer hover:border-b-2 hover:border-black ${
              tab === null
                ? 'border-b-2 border-[rgba(0,0,0,1)] font-[700]'
                : 'font-[400]'
            }`}
            onClick={() => {
              navigate('/mypage')
            }}
          >
            내 정보
          </div>
          <div
            className={`py-[20px] text-[1rem] cursor-pointer hover:border-b-2 hover:border-black ${
              tab === '1'
                ? 'border-b-2 border-[rgba(0,0,0,1)] font-[700]'
                : 'font-[400]'
            }`}
            onClick={() => {
              navigate('/mypage?tab=1')
            }}
          >
            내 활동
          </div>
        </div>
      </header>
      <main
        className={`max-w-[1080px] flex max-[768px]:flex-col max-[768px]:w-full ${
          tab === null ? 'mt-[40px] mx-auto' : 'mx-auto'
        }`}
      >
        {tab === null ? (
          <>
            <div className="flex-1 pr-[50px] max-[768px]:pr-0 max-[768px]:mb-[50px]">
              <ProfileSection
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                avatar_url={initialUserInfo?.avatar_url ?? ''}
              />
            </div>
            <div className="flex-[3] flex flex-col gap-[55px] pr-[50px] max-[768px]:px-[30px] max-[768px]:pr-0">
              <NicknameSection
                userInfo={userInfo}
                isNicknameEditMode={isNicknameEditMode}
                setIsNicknameEditMode={setIsNicknameEditMode}
                setUserInfo={setUserInfo}
              />
              <StatusMessageSection
                userInfo={userInfo}
                isStatusMessageEditMode={isStatusMessageEditMode}
                setIsStatusMessageEditMode={setIsStatusMessageEditMode}
                setUserInfo={setUserInfo}
              />
              <EmailSection
                userInfo={userInfo}
                isEmailEditMode={isEmailEditMode}
                setIsEmailEditMode={setIsEmailEditMode}
                setUserInfo={setUserInfo}
              />
              <PasswordSection
                userInfo={userInfo}
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                isConfirmPasswordVisible={isConfirmPasswordVisible}
                setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
                isPasswordValid={isPasswordValid}
                isConfirmPasswordValid={isConfirmPasswordValid}
                warningText={warningText}
                setWarningText={setWarningText}
              />
              <AccountDeletionSection
                selectedReason={selectedReason}
                setSelectedReason={setSelectedReason}
                isDeletionButtonDisabled={isDeletionButtonDisabled}
              />
            </div>
          </>
        ) : (
          <ActivitySection />
        )}
      </main>
    </div>
  )
}
