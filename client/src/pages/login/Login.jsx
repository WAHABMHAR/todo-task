import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { setLocalStorage } from "../../utils/utils";
import { useLoginMutation } from "../../services/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../../store/slices/auth/authSlice";

export default function Login() {
    const [login, { isLoading }] = useLoginMutation();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (values) => {
        try {
            let body = { ...values };
            const result = await login(body).unwrap();
            if (result) {
                dispatch(setUser(result?.data));
                setLocalStorage("user", result?.data);
                notification.success({
                    message: result?.message,
                });

                navigate("/");
            }
        } catch (err) {
            notification.error({
                message: err?.data?.message,
            });
            form.resetFields();
        }
    };

    return (
        <div className="flex items-center justify-center  h-screen bg-gradient-to-b from-yellow-200 to-blue-400">
            <div className="bg-white bg-opacity-70 backdrop-blur-lg !p-[24px] rounded-2xl shadow-2xl w-[450px]">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100">
                        <UserOutlined className="text-3xl text-blue-500" />
                    </div>
                </div>
                <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Login</h2>

                <Form name="signup" onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                            size="large"
                        >
                            Login
                        </Button>
                    </Form.Item>

                    <div className="flex justify-between text-sm text-gray-600">
                        <p className="mt-4 text-center text-gray-600 text-sm">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="text-blue-500 hover:underline font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}
