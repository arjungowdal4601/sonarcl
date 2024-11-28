import React from 'react';
import { Post } from '../../types';
import { Avatar } from '../common/Avatar';
import { format } from 'date-fns';

interface Props {
  posts: Post[];
  onUserClick?: (userId: string) => void;
}

export const PostsFeed: React.FC<Props> = ({ posts, onUserClick }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="p-4 flex items-center space-x-3">
            <Avatar
              src={post.userDpUrl}
              alt={post.userName}
              size="md"
              showStatus
              onClick={() => onUserClick?.(post.userId)}
            />
            <div>
              <h3 className="font-semibold">{post.userName}</h3>
              {post.location && (
                <p className="text-sm text-gray-400">{post.location}</p>
              )}
            </div>
          </div>

          <img
            src={post.mediaUrl}
            alt={post.title}
            className="w-full aspect-video object-cover"
          />

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">
                {format(new Date(post.timestamp), 'MMM d, yyyy')}
              </p>
            </div>
            <h4 className="font-semibold mb-2">{post.title}</h4>
            <p className="text-gray-300">{post.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
};