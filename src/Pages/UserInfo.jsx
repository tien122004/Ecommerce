import { useNavigate } from 'react-router-dom';

const UserInfo = () => {
    const navigate = useNavigate()
    const userId = localStorage.getItem('userIndex')
    const account = JSON.parse(localStorage.getItem('users'))
    const handlEditInfo = () => {
        navigate('/edit-info')
    }

    const handlLogout = () => {
        localStorage.setItem('login', false)
        navigate('/home')
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{account[userId].username}</h1>
                    <p className="text-gray-500">{account[userId].email}</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Username:</span>
                        <span className="text-gray-500">{account[userId].username}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Email:</span>
                        <span className="text-gray-500">{account[userId].email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-medium">Password:</span>
                        <span className="text-gray-500">{account[userId].password}</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-10">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handlEditInfo}
                    >
                        Edit Profile
                    </button>
                    <button className="w-full bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={handlLogout}
                    >
                        logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;

