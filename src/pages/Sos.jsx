import React, { useState, useEffect } from 'react';
import { FiPhone, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SOS() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [sosActivated, setSosActivated] = useState(false);
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [currentuser, setCurrentuser] = useState(null);

    // Add useEffect for auth check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/v1/users/check-auth`, {
                    withCredentials: true
                });
                
                if (!response.data.authenticated) {
                    navigate('/login');
                }
                if (userResponse.data?.data) {
                    setCurrentUser(userResponse.data.data);
                } else {
                    navigate('/login');
                    return;
                }
            } catch (error) {
                navigate('/login');
            }
        };
        
        checkAuth();
    }, [navigate, backendUrl]);

    const emergencyNumbers = [
        {
            name: 'National Emergency',
            number: '112',
            description: 'For any emergency situation'
        },
        {
            name: 'Suicide Prevention Helpline',
            number: '9152987821',
            description: '24/7 suicide prevention support'
        },
        {
            name: 'Mental Health Helpline',
            number: '1800-599-0019',
            description: 'KIRAN Mental health rehabilitation helpline'
        },
        {
            name: 'Women Helpline',
            number: '1091',
            description: '24/7 women safety emergency'
        }
    ];

    const handleSOSClick = () => {
        if(!currentuser)
        setShowConfirmation(true);
    };

    const handleConfirmSOS = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/v1/sos/trigger`, {}, {
                withCredentials: true
            });

            if (response.data.success) {
                setSosActivated(true);
                setShowConfirmation(false);
                // Show success message
            } else {
                throw new Error('Failed to trigger SOS');
            }
        } catch (error) {
            console.error('SOS Error:', error);
            // Show error message to user
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Emergency Header */}
                    <div className="bg-red-100 p-6 rounded-lg border-2 border-red-500 mb-8">
                        <h1 className="text-4xl font-heading font-bold text-red-600 mb-4">
                            Emergency Support
                        </h1>
                        <p className="text-red-800 mb-6">
                            If you're experiencing a life-threatening emergency, immediately call your local emergency services.
                        </p>
                        <button
                            onClick={handleSOSClick}
                            className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 font-bold text-lg flex items-center justify-center w-full md:w-auto"
                        >
                            <FiAlertCircle className="mr-2" size={24} />
                            Send SOS Alert
                        </button>
                    </div>

                    {/* Emergency Numbers */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6">Emergency Helplines</h2>
                        <div className="grid gap-6">
                            {emergencyNumbers.map((helpline, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:border-primary-500 transition-colors"
                                >
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">
                                            {helpline.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {helpline.description}
                                        </p>
                                    </div>
                                    <a
                                        href={`tel:${helpline.number}`}
                                        className="flex items-center text-primary-500 hover:text-primary-600 font-semibold"
                                    >
                                        <FiPhone className="mr-2" />
                                        {helpline.number}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-2xl font-semibold mb-4">Confirm SOS Alert</h2>
                            <p className="text-gray-600 mb-6">
                                This will alert other users and share your emergency contact information. Are you sure you want to proceed?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowConfirmation(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmSOS}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Send Alert
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {sosActivated && (
                    <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-6 py-3 rounded-lg shadow-md">
                        SOS Alert sent successfully! Help is on the way.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SOS;