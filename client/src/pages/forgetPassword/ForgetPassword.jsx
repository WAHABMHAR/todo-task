import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
        navigate("/login");
        notification.success({
            message: "Reset Password Sent Successfully",
        });
        form.resetFields();
    };
    //

    return (
        <div className="flex items-center justify-center  h-screen bg-gradient-to-b from-yellow-200 to-blue-400">
            <div className="bg-white bg-opacity-70 backdrop-blur-lg !p-[24px] rounded-2xl shadow-2xl w-[450px]">
                <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
                    Forget Password
                </h2>

                <Form form={form} name="signup" onFinish={handleSubmit} layout="vertical">
                    <Form.Item
                        name="emai"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                            size="large"
                        >
                            Forget Password
                        </Button>
                    </Form.Item>

                    <div className="flex items-end justify-between text-sm text-gray-600">
                        <p className="mt-4 text-center text-gray-600 text-sm">
                            Back to Login{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 hover:underline font-semibold"
                            >
                                login
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}
