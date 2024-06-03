import { Routes, Route } from "react-router-dom";
import { memo } from "react";
import Error from "../views/Error";
import Home from "../views/Home";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="*" element={<Error />} />
      <Route path="/" element={<Home />} />
      {/* 라우팅 추가 해보세요. */}
    </Routes>
  );
};

export default memo(Router);
