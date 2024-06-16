import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Home from "../views/Home";
import Join from "../views/Join";
import Login from "../views/Login";
import Shop from "../views/Shop";
import About from "../views/About";
import CommunityFeatures from "../views/CommunityFeatures";
import ProductDetail from "../views/ProductDetail";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/community-feature" element={<CommunityFeatures />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
  );
};

export default memo(Router);
