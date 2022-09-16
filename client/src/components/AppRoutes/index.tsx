import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../../pages/login";
import { Registration } from "../../pages/registration";
import { Users } from "../../pages/users";

export const AppRoutes: FC = () => (
  <Routes>
    <Route path="/users" element={<Users />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
  </Routes>
);
