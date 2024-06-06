import { Routes, Route } from 'react-router-dom'
import { memo } from 'react'
import Error from '../views/Error'
import Home from '../views/Home'
import Join from '../views/Join'
import Login from '../views/Login'

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      {/* 라우팅 추가 해보세요. */}
    </Routes>
  )
}

export default memo(Router)
