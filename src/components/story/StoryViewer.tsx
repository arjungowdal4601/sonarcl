import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../../types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { StoryProgress } from './StoryProgress';
import { StoryHeader } from './StoryHeader';

interface Props {
  user: User;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const StoryViewer: React.FC<Props> = ({
  user,
  onClose,
  onNext,
  onPrevious
}) => {
  const stories = user.stories || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleStoryComplete = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onNext();
    }
  }, [currentIndex, stories.length, onNext]);

  const handlePreviousStory = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    } else {
      onPrevious();
    }
  }, [currentIndex, onPrevious]);

  useEffect(() => {
    if (stories.length === 0) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleStoryComplete();
          return 0;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [stories.length, handleStoryComplete]);

  if (!stories.length) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="w-full h-full max-w-lg mx-auto relative">
        <StoryProgress
          totalStories={stories.length}
          currentIndex={currentIndex}
          progress={progress}
        />

        <StoryHeader
          userDpUrl={user.dpUrl}
          userName={user.name}
          onClose={onClose}
        />

        <img
          src={stories[currentIndex].mediaUrl}
          alt="Story"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex">
          <button
            className="w-1/2 h-full focus:outline-none"
            onClick={handlePreviousStory}
          />
          <button
            className="w-1/2 h-full focus:outline-none"
            onClick={handleStoryComplete}
          />
        </div>

        {currentIndex > 0 && (
          <ChevronLeftIcon 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-white cursor-pointer"
            onClick={handlePreviousStory}
          />
        )}
        
        {currentIndex < stories.length - 1 && (
          <ChevronRightIcon 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-white cursor-pointer"
            onClick={handleStoryComplete}
          />
        )}
      </div>
    </div>
  );
};