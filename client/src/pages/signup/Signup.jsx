import React from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../../services/auth/Auth";

export default function Signup() {
    const [form] = Form.useForm();
    const [signup, { isLoading }] = useSignupMutation();

    const handleSubmit = async (values) => {
        try {
            let body = { ...values };
            const result = await signup(body).unwrap();
            if (result) {
                notification.success({
                    message: result?.message,
                });
                form.resetFields();
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
                <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Sign Up</h2>

                <Form
                    autoComplete="off"
                    form={form}
                    name="signup"
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        autoComplete="new-names"
                        rules={[{ required: true, message: "Please input your name!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="name" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        autoComplete="new-email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        autoComplete="new-password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Please confirm your password!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Passwords do not match!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm Password"
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
                            Sign Up
                        </Button>
                    </Form.Item>

                    <div className="flex justify-between text-sm text-gray-600">
                        <Link to="/forget-password">Forgot password?</Link>
                        <p className="mt-4 text-center text-gray-600 text-sm">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 hover:underline font-semibold"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
}
