import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">

                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-100 rounded-full animate-pulse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>

                {/* Text Section */}
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Payment Cancelled
                </h2>
                <p className="text-gray-500 mb-8">
                    Your transaction was cancelled and no funds were deducted.
                    If this was a mistake, you can try again.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <Link to="/cart" className="btn btn-primary w-full">
                        Try Again
                    </Link>

                    <Link to="/" className="btn btn-outline w-full">
                        Return to Home
                    </Link>
                </div>

                {/* Help Text */}
                <div className="mt-6 text-sm text-gray-400">
                    <p>Need help? <Link to="/contact" className="text-blue-500 hover:underline">Contact Support</Link></p>
                </div>

            </div>
        </div>
    );
};

export default PaymentCancel;