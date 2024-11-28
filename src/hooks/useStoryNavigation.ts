import { useState, useCallback, useEffect } from 'react';
import { Story } from '../types';

interface UseStoryNavigationProps {
  stories: Story[];
  onNext: () => void;
  onPrevious: () => void;
}

export const useStoryNavigation = ({ stories, onNext, onPrevious }: UseStoryNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onNext();
    }
  }, [currentIndex, stories.length, onNext]);

  const handlePrevious = useCallback(() => {
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
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [stories.length, handleNext]);

  return {
    currentIndex,
    progress,
    handleNext,
    handlePrevious,
    currentStory: stories[currentIndex]
  };
};