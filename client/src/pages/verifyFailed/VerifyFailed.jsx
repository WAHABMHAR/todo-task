export default function VerifyFailed() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50">
            <div className="bg-white !p-8 rounded-xl shadow-md text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">❌ Verification Failed</h1>
                <p className="text-gray-600">The verification link is invalid or has expired.</p>
            </div>
        </div>
    );
}
