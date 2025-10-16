import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { useNewsletterModalMutation } from "../../services/auth/Auth";

const NewsletterModal = ({ open, onClose, user }) => {
    // const getUser = useSelector(getUser);
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(false);
    const [newsletter] = useNewsletterModalMutation();

    const handleNewsLetter = async () => {
        try {
            setLoading(true);
            const result = await newsletter({ email, userId: user?._id }).unwrap();
            message.success("Newsletter Submitted Successfully");
            onClose();
        } catch (err) {
            console.error(err);
            message.error("Subscription failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            footer={null}
            onCancel={onClose}
            closable={false}
            centered
            className="rounded-2xl"
        >
            <div className="p-4 text-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">🎉 Welcome, {user?.name}!</h2>
                <p className="text-gray-600">
                    Subscribe to our newsletter for the latest updates and offers!
                </p>

                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="p-2 border border-gray-300 rounded-md"
                />

                <div className="flex justify-between mt-5 gap-4">
                    <Button
                        type="primary"
                        // loading={loading}
                        className="w-1/2 bg-blue-600 hover:bg-blue-700"
                        onClick={handleNewsLetter}
                    >
                        Subscribe
                    </Button>

                    <Button className="w-1/2" onClick={handleNewsLetter}>
                        Skip
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default NewsletterModal;
