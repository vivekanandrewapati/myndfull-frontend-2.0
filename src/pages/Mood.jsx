import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const moodOptions = [
    { value: 'Happy', emoji: '😊', color: 'bg-yellow-400 hover:bg-yellow-500' },
    { value: 'Peaceful', emoji: '😌', color: 'bg-blue-400 hover:bg-blue-500' },
    { value: 'Neutral', emoji: '😐', color: 'bg-gray-400 hover:bg-gray-500' },
    { value: 'Sad', emoji: '😢', color: 'bg-indigo-400 hover:bg-indigo-500' },
    { value: 'Angry', emoji: '😠', color: 'bg-red-400 hover:bg-red-500' },
    { value: 'Anxious', emoji: '😰', color: 'bg-purple-400 hover:bg-purple-500' },
    { value: 'Tired', emoji: '😴', color: 'bg-green-400 hover:bg-green-500' },
    { value: 'Confused', emoji: '😕', color: 'bg-orange-400 hover:bg-orange-500' }
];

function Mood() {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [selectedMood, setSelectedMood] = useState(null);
    const [journal, setJournal] = useState('');
    const [gratitude, setGratitude] = useState('');
    const [goals, setGoals] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [moodHistory, setMoodHistory] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const checkAuthAndLoadData = async () => {
            try {
                // Check authentication using cookies
                const userResponse = await axios.get(`${backendUrl}/api/v1/users/current-user`, {
                    withCredentials: true
                });

                if (userResponse.data?.data) {
                    setCurrentUser(userResponse.data.data);
                } else {
                    navigate('/login');
                    return;
                }

                // Then mood history
                await  fetchMoodHistory();

            } catch (err) {
                console.error('Auth check error:', err);
                if (err.response?.status === 401) {
                    navigate('/login');
                } else {
                    setError('Failed to load content');
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndLoadData();
    }, [navigate]);

    // useEffect(() => {
       
    // }, []);

    const fetchMoodHistory = async () => {
        try {

    
            const response = await axios.get(`${backendUrl}/api/v1/mood/history`, {
            
                withCredentials: true  // Add this line
            });
            setMoodHistory(response.data.data);
        } catch (error) {
            console.error('Error fetching mood history:', error);
            if (error.response?.status === 401) {
               
                navigate('/login');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            console.log('No current user');
            navigate('/login');
            return;
        }
        if (!selectedMood) {
            setError('Please select a mood');
            return;
        }

        setLoading(true);
        setError('');

        try {

            await axios.post(`${backendUrl}/api/v1/mood`, {
                mood: selectedMood,
                journal,
                gratitude,
                goals
            }, {
                withCredentials: true  // Add this line
            });

            // Reset form and refresh history
            setSelectedMood(null);
            setJournal('');
            setGratitude('');
            setGoals('');
            fetchMoodHistory(); // Refresh the history after successful submission
        } catch (error) {
            console.error('Error saving mood:', error);
            setError(error.response?.data?.message || 'Failed to save mood entry');
            if (error.response?.status === 401) {
               
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            if (!currentUser) {
                console.log('No current user');
                navigate('/login');
                return;
            }

            await axios.delete(`${backendUrl}/api/v1/mood/${id}`, {
                withCredentials: true  // Add this line
            });
            fetchMoodHistory();
        } catch (error) {
            console.error('Error deleting mood:', error);
            if (error.response?.status === 401) {
                
                navigate('/login');
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <nav className='shadow-md bg-white'>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl p-3 font-heading font-bold text-primary-500 mb-8">
                        Mood Tracker
                    </h1>
                </div>
            </nav>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mood Entry Form */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold  font-heading text-primary-500 mb-4">How are you feeling?</h2>

                            <form onSubmit={handleSubmit} className="space-y-6 font-body text-text-700">
                                {/* Mood Selection */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {moodOptions.map((mood) => (
                                        <button
                                            key={mood.value}
                                            type="button"
                                            onClick={() => setSelectedMood(mood.value)}
                                            className={`p-4 rounded-lg text-center transition-colors ${selectedMood === mood.value
                                                ? `${mood.color} text-white`
                                                : 'bg-gray-100 hover:bg-gray-200'
                                                }`}
                                        >
                                            <div className="text-2xl mb-2">{mood.emoji}</div>
                                            <div className="text-sm font-body break-words">{mood.value}</div>
                                        </button>
                                    ))}
                                </div>

                                {/* Journal Entry */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Journal</label>
                                    <textarea
                                        value={journal}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 500) {  // Limit to 500 characters
                                                setJournal(value);
                                            }
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        rows="3"
                                        maxLength={500}
                                        placeholder="How are you feeling today? (max 500 characters)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{journal.length}/500 characters</p>
                                </div>

                                {/* Gratitude */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Gratitude</label>
                                    <textarea
                                        value={gratitude}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 200) {  // Limit to 200 characters
                                                setGratitude(value);
                                            }
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        rows="2"
                                        maxLength={200}
                                        placeholder="What are you grateful for? (max 200 characters)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{gratitude.length}/200 characters</p>
                                </div>

                                {/* Goals */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Goals</label>
                                    <textarea
                                        value={goals}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length <= 200) {  // Limit to 200 characters
                                                setGoals(value);
                                            }
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        rows="2"
                                        maxLength={200}
                                        placeholder="What are your goals for today? (max 200 characters)"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{goals.length}/200 characters</p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading || !selectedMood}
                                    className={`w-full py-3 font-body rounded-lg font-semibold transition-colors
                                        ${loading || !selectedMood
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-primary-500 text-white hover:bg-primary-600'}`
                                    }
                                >
                                    Save Mood
                                </button>
                            </form>
                        </div>

                        {/* Mood History Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold font-heading text-primary-500 mb-4">Mood History</h2>
                            {moodHistory.length === 0 ? (
                                <p className="text-gray-500 font-body">No mood entries yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {moodHistory.map((entry) => {
                                        const moodOption = moodOptions.find(m => m.value === entry.mood);
                                        const bgColor = moodOption ? moodOption.color.replace('hover:bg-', 'bg-opacity-10 ') : 'bg-gray-100';
                                        
                                        return (
                                            <div key={entry._id} className={`${bgColor} rounded-lg p-4 relative`}>
                                                <button
                                                    onClick={() => handleDelete(entry._id)}
                                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                                    aria-label="Delete entry"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                                <div className="mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl">{moodOption?.emoji}</span>
                                                        <p className="font-semibold font-body text-text-700">{entry.mood}</p>
                                                    </div>
                                                    <p className="text-sm text-text-500 font-body">
                                                        {new Date(entry.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                {entry.journal && (
                                                    <div className="max-h-32 overflow-y-auto mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                                        <p className="text-text-700 font-body pr-2 break-words">{entry.journal}</p>
                                                    </div>
                                                )}
                                                {entry.gratitude && (
                                                    <div className="max-h-24 overflow-y-auto mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                                        <p className="text-text-700 font-body pr-2 break-words">
                                                            <span className="font-medium">Grateful for:</span> {entry.gratitude}
                                                        </p>
                                                    </div>
                                                )}
                                                {entry.goals && (
                                                    <div className="max-h-24 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                                                        <p className="text-text-700 font-body pr-2 break-words">
                                                            <span className="font-medium">Goals:</span> {entry.goals}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mood;