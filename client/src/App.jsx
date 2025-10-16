import React, { useEffect, useEffectEvent, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/notFound/NotFound";
import VerifySuccess from "./pages/verifySuccess/VerifySuccess";
import VerifyFailed from "./pages/verifyFailed/VerifyFailed";
import { useAuthUserQuery } from "./services/auth/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/auth/authSlice";
import PublicRoute from "./components/publicRoute/PublicRoute";
import ProtectedRoutes from "./components/protectedRoute/ProtectedRoutes";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import dayjs from "dayjs";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

function App() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { data } = useAuthUserQuery(undefined, {
        skip: !user,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.data) {
            dispatch(setUser(data?.data));
        }
    }, [data]);

    return (
        <>
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <PublicRoute>
                            {" "}
                            <Signup />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            {" "}
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/forget-password"
                    element={
                        <PublicRoute>
                            <ForgetPassword />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            {" "}
                            <Home />{" "}
                        </ProtectedRoutes>
                    }
                >
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="/verify-success" element={<VerifySuccess />} />
                <Route path="/verify-failed" element={<VerifyFailed />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
