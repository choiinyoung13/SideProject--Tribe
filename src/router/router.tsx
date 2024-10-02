import { Routes, Route } from 'react-router-dom'
import { memo } from 'react'
import Error from '../views/Error'
import Home from '../views/Home'
import Join from '../views/Join'
import Login from '../views/Login'
import Shop from '../views/Shop'
import About from '../views/About'
import Cart from '../views/Cart'
import CommunityFeatures from '../views/CommunityFeatures'
import Community from '../views/Community'
import ProductDetail from '../views/ProductDetail'
import MyPage from '../views/MyPage'
import Signup from '../views/Signup'

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/fakeSignup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/community-feature" element={<CommunityFeatures />} />
      <Route path="/community" element={<Community />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  )
}

export default memo(Router)
