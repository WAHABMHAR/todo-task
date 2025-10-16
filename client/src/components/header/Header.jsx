import { Button, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUser } from "../../store/slices/auth/authSlice";
import { getOrCreateCartId } from "../../utils/utils";

const Header = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
        localStorage.clear();
        dispatch(clearUser());
        notification.success({ message: "You have successfully logged out" });
        navigate("/login");
    };

    return (
        <header className="wrapper flex justify-center bg-gray-800 mx-4 h-14 !py-3 !px-6 text-white shadow-md">
            <div className="container flex justify-between items-center ">
                <div>
                    <HomeOutlined
                        className="text-2xl cursor-pointer hover:text-blue-500 transition-colors"
                        onClick={() => navigate("/")}
                    />
                </div>

                <div className="flex items-center justify-center gap-6">
                    {!user && <Button onClick={() => navigate("/login")}>Login</Button>}
                    {user && (
                        <LogoutOutlined
                            title="Logout"
                            className="text-2xl cursor-pointer hover:text-red-500 transition-colors"
                            onClick={handleLogout}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
