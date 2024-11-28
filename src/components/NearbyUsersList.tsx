import React from 'react';
import { User } from '../types';

interface Props {
  users: User[];
}

export const NearbyUsersList: React.FC<Props> = ({ users }) => {
  return (
    <div className="flex overflow-x-auto space-x-6 pb-4 px-2">
      {users.map((user) => (
        <div key={user.id} className="flex-shrink-0 w-20">
          <div className="relative">
            <div className="w-20 h-20 rounded-full ring-2 ring-blue-500 p-1">
              <img
                src={user.dpUrl}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          <h3 className="text-xs font-semibold mt-2 text-center truncate">{user.name}</h3>
          <p className="text-xs text-gray-400 text-center truncate">
            {user.distance}m away
          </p>
        </div>
      ))}
    </div>
  );
};