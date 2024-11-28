import { useState } from 'react';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RadarScreen } from './screens/RadarScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { CreatePostScreen } from './screens/CreatePostScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { HomeIcon, UserGroupIcon, UserIcon, PlusIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { User } from './types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGender] = useState<'male' | 'female'>('male');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pb-16">
        {activeTab === 'home' && <HomeScreen userGender={userGender} />}
        {activeTab === 'radar' && (
          <RadarScreen 
            userGender={userGender} 
            onNavigate={setActiveTab}
            onViewProfile={setSelectedUser} 
          />
        )}
        {activeTab === 'create' && <CreatePostScreen />}
        {activeTab === 'messages' && <MessagesScreen />}
        {activeTab === 'profile' && (
          <ProfileScreen 
            user={selectedUser} 
            onBack={() => setSelectedUser(null)}
          />
        )}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
        <div className="max-w-2xl mx-auto flex justify-around p-4">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('radar')}
            className={`flex flex-col items-center ${activeTab === 'radar' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <UserGroupIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`flex flex-col items-center ${activeTab === 'create' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <PlusIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Create</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center ${activeTab === 'messages' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <ChatBubbleLeftIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <UserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}