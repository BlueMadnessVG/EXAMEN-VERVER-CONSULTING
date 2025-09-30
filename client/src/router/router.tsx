import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthGuard } from "../guards/auth.guard";
import { AnimatePresence } from "motion/react";
import { PublicRoutes } from "./router.config";

const Home = lazy(() =>
  import("../pages/public/Home/Home").then((module) => ({
    default: module.Home as React.ComponentType<any>,
  }))
);

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnimatePresence mode="wait" initial={true}>
        <Routes location={location} key={location.pathname}>
          <Route path={PublicRoutes.HOME} element={<Home />} />
          <Route element={<AuthGuard />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};
