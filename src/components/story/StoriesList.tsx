import React, { useState, useCallback } from 'react';
import { User } from '../../types';
import { StoryViewer } from './StoryViewer';

interface Props {
  users: User[];
}

export const StoriesList: React.FC<Props> = ({ users }) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const usersWithStories = users.filter(user => user.stories?.length).slice(0, 10);

  const handleClose = useCallback(() => {
    setSelectedUserIndex(null);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedUserIndex === null || selectedUserIndex >= usersWithStories.length - 1) {
      handleClose();
    } else {
      setSelectedUserIndex(selectedUserIndex + 1);
    }
  }, [selectedUserIndex, usersWithStories.length, handleClose]);

  const handlePrevious = useCallback(() => {
    if (selectedUserIndex !== null && selectedUserIndex > 0) {
      setSelectedUserIndex(selectedUserIndex - 1);
    }
  }, [selectedUserIndex]);

  return (
    <div className="relative">
      <div className="flex overflow-x-auto hide-scrollbar space-x-4 p-4">
        {usersWithStories.map((user, index) => (
          <button
            key={user.id}
            className="flex flex-col items-center space-y-1 flex-shrink-0"
            onClick={() => setSelectedUserIndex(index)}
          >
            <div className="w-16 h-16 rounded-full ring-2 ring-blue-500 p-0.5">
              <img
                src={user.dpUrl}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-gray-300 truncate w-16">
              {user.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {selectedUserIndex !== null && usersWithStories[selectedUserIndex] && (
        <StoryViewer
          key={usersWithStories[selectedUserIndex].id}
          user={usersWithStories[selectedUserIndex]}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};