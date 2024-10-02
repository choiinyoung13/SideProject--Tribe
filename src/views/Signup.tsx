import { useState } from 'react'
import styled from 'styled-components'
import { createClient } from '@supabase/supabase-js'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseRoleKey = import.meta.env.VITE_SUPABASE_SURVICE_ROLE_KEY
  const adminSupabase = createClient(supabaseUrl, supabaseRoleKey)

  // 회원가입 처리 함수
  const handleSignup = async () => {
    // 관리자 권한으로 회원가입 처리
    const { data, error } = await adminSupabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // 이메일을 확인된 상태로 만듦
    })

    if (error) {
      console.error('회원가입 오류:', error.message)
      alert('회원가입 실패: ' + error.message)
    } else {
      console.log('회원가입 성공:', data)
      alert('회원가입 성공! 이제 로그인할 수 있습니다.')
    }
  }

  return (
    <Con>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>가입</button>
    </Con>
  )
}

const Con = styled.div`
  margin-top: 150px;
  margin-left: 100px;

  input {
    display: block;
    margin-bottom: 10px;
    padding: 8px;
    width: 200px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
`
