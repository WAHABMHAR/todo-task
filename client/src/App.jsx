import React, { useEffect, useEffectEvent, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/protectedRoute/ProtectedRoutes";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import SingleProduct from "./pages/singleProduct/SingleProduct";

import NotFound from "./pages/notFound/NotFound";
import VerifySuccess from "./pages/verifySuccess/VerifySuccess";
import VerifyFailed from "./pages/verifyFailed/VerifyFailed";
import Cart from "./pages/cart/Cart";
import { useAuthUserQuery } from "./services/auth/Auth";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/auth/authSlice";
import NewsletterModal from "./components/NewsLetter/NewsLetter";

function App() {
    const user = JSON.parse(localStorage.getItem("user"));
    const { data } = useAuthUserQuery(undefined, {
        skip: !user,
    });
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.data) {
            dispatch(setUser(data?.data));
        }
    }, [data]);

    useEffect(() => {
        if (user?.isFirstLogin && data?.data?.isFirstLogin) {
            setShowModal(true);
        }
    }, [user, data?.data]);

    return (
        <>
            <Routes>
                <Route
                    path="/signup"
                    element={
                        <ProtectedRoutes>
                            {" "}
                            <Signup />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <ProtectedRoutes>
                            {" "}
                            <Login />
                        </ProtectedRoutes>
                    }
                />
                <Route
                    path="/forget-password"
                    element={
                        <ProtectedRoutes>
                            <ForgetPassword />
                        </ProtectedRoutes>
                    }
                />
                <Route path="/" element={<Home />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
                <Route path="/verify-success" element={<VerifySuccess />} />
                <Route path="/verify-failed" element={<VerifyFailed />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {showModal && (
                <NewsletterModal open={showModal} onClose={() => setShowModal(false)} user={user} />
            )}
        </>
    );
}

export default App;
