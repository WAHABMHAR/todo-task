import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifySuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate("/login"), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-50">
            <div className="bg-white !p-8 rounded-xl shadow-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    ✅ Email Verified Successfully!
                </h1>
                <p className="text-gray-600">Redirecting you to login page...</p>
            </div>
        </div>
    );
}
