import { Button, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCartsQuery } from "../../services/cart/Cart";
import { ShoppingCartOutlined, LogoutOutlined, HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, getUser } from "../../store/slices/auth/authSlice";
import { getOrCreateCartId } from "../../utils/utils";

const Header = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(getUser);
    const cartId = getOrCreateCartId();
    const { data: cartList } = useGetAllCartsQuery(cartId);
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
                    <div className="relative" onClick={() => navigate("/cart")}>
                        <ShoppingCartOutlined
                            className="text-2xl text-gray-700 cursor-pointer"
                            title="Cart"
                        />
                        {cartList?.items?.length > 0 && (
                            <span className="absolute -top-1 -right-2 flex items-center justify-center w-4 h-4 text-[10px] font-semibold text-white bg-red-500 rounded-full">
                                {cartList?.items?.length}
                            </span>
                        )}
                    </div>
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
