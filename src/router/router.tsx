import { Routes, Route } from 'react-router-dom'
import { memo } from 'react'
import Error from '../views/Error'
import Home from '../views/Home'
import Join from '../views/Join'
import Login from '../views/Login'
import Shop from '../views/Shop'

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  )
}

export default memo(Router)
