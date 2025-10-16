import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
            <img
                src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
                alt="Not Found"
                className="w-60 h-60 object-contain mb-6"
            />

            <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
            <p className="text-gray-500 mb-8">
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </p>

            <Button
                type="primary"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg px-6 py-2"
                onClick={() => navigate("/")}
            >
                Back to Home
            </Button>
        </div>
    );
};

export default NotFound;
