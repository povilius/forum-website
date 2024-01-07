import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Forum from "../pages/Forum";
import { PATHS } from "./consts";
import Topbar from "../components/Topbar";
import AppWrapper from "../components/AppWrapper";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <>
      <Topbar  />
    <AppWrapper>
      <Routes>
        <Route path={PATHS.Home} element={<Home />} />
        <Route path={PATHS.Forum} element={<Forum />} />
        <Route path={PATHS.Login} element={<Login />} />
        <Route path={PATHS.Register} element={<Register />} />
      </Routes>
      </AppWrapper>
    </>
  );
};

export default AppRoutes;
