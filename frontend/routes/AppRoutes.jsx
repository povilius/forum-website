import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { PATHS } from "./consts";
import Topbar from "../components/Topbar";
import AppWrapper from "../components/AppWrapper";

const AppRoutes = () => {
  return (
    <>
      <Topbar  />
    <AppWrapper>
      <Routes>
        <Route path={PATHS.Home} element={<Home />} />
        <Route path={PATHS.Login} element={<Login />} />
        <Route path={PATHS.Register} element={<Register />} />
      </Routes>
      </AppWrapper>
    </>
  );
};

export default AppRoutes;
