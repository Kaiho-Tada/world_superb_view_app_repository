import { Home } from "components/pages/Home";
import { Login } from "components/pages/Login";
import { SignUp } from "components/pages/SignUp";
import { FC, memo, } from "react";
import { Route, Routes } from "react-router-dom";

export const Router: FC = memo(() => {

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
  );
});
