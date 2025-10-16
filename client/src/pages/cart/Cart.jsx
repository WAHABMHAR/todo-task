import React, { useState, useMemo, useEffect } from "react";
import { Button, Divider, Empty, InputNumber, notification, Spin } from "antd";
import CartItem from "../../components/cartItem/CartItem";
import {
    useDeleteCartItemMutation,
    useGetAllCartsQuery,
    useProceedCheckoutMutation,
} from "../../services/cart/Cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/auth/authSlice";
import { getOrCreateCartId } from "../../utils/utils";

const Cart = () => {
    const user = useSelector(getUser);
    const cartId = getOrCreateCartId();
    const { data: cartList, isLoading: cartListLoading } = useGetAllCartsQuery(cartId, {
        skip: !cartId,
    });

    const [deleteCartItem] = useDeleteCartItemMutation();
    const [proceedCheckout] = useProceedCheckoutMutation();

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(null);
    const [loadingId, setLoadingId] = useState(null);

    useEffect(() => {
        if (cartList) {
            setCartItems(cartList);
        } else {
            setCartItems(null);
        }
    }, [cartList]);

    const handleRemove = async (item) => {
        try {
            setLoadingId(item?.productId?._id);
            let body = { productId: item?.productId?._id, userId: user?._id };
            const result = await deleteCartItem(body).unwrap();
            if (result) {
                notification.success({
                    message: "Item deleted from cart successfully",
                });
                setLoadingId(null);
            }
        } catch (err) {
            setLoadingId(null);
            notification.error({
                message: err?.data?.message,
            });
        }
    };

    const total = useMemo(() => {
        return cartItems?.items?.reduce(
            (acc, item) => acc + item?.productId?.price * item.quantity,
            0
        );
    }, [cartItems, cartList]);

    const handleCheckout = async () => {
        try {
            const cartId = getOrCreateCartId();
            const result = await proceedCheckout(cartId).unwrap();
            if (result) {
                notification.success({
                    message: "Order Placed Successfully",
                });
                navigate("/");
            }
        } catch (error) {
            notification.success({
                message: "Checkout Failed",
            });
        }
    };

    return (
        <Spin spinning={cartListLoading}>
            <div className="flex justify-center !py-[25px]">
                <div className="container !p-6">
                    {!cartList || cartList.length === 0 ? (
                        <div className="flex justify-center items-center h-[70vh]">
                            <Empty description="Your Cart is Empty" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
                                <div className="flex flex-col gap-4">
                                    {cartItems?.items?.map((item) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            handleRemove={handleRemove}
                                            loading={loadingId}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white !p-5 rounded-lg shadow-md h-fit border border-gray-100  md:!mt-[45px]">
                                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                                <Divider />
                                {cartItems?.items?.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between items-center text-gray-700 mb-2"
                                    >
                                        <span>
                                            {item?.productId?.title?.length > 20
                                                ? `${item?.productId?.title?.substring(0, 20)}...`
                                                : item?.productId?.title}{" "}
                                            × {item?.quantity}
                                        </span>
                                        <span>
                                            ${(item?.productId?.price * item?.quantity)?.toFixed(2)}
                                        </span>
                                    </div>
                                ))}

                                <Divider />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span>${total?.toFixed(2)}</span>
                                </div>
                                <Button
                                    type="primary"
                                    className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                                    size="large"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </Button>
                                <Button
                                    type="default"
                                    size="large"
                                    className="w-full !mt-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                    onClick={() => navigate("/")}
                                >
                                    Back to Shop
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Spin>
    );
};

export default Cart;
