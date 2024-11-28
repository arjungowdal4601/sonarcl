import React from 'react';

interface Props {
  onLogin: () => void;
}

export const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="https://static.vecteezy.com/system/resources/previews/051/723/223/non_2x/a-black-and-white-logo-with-a-circle-and-a-black-and-white-circle-free-vector.jpg"
            alt="Sonar"
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h1 className="text-4xl font-bold mt-4 text-white">Welcome to Sonar</h1>
        </div>
        
        <button
          onClick={onLogin}
          className="w-full max-w-xs bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};