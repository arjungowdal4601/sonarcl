export interface User {
  id: string;
  name: string;
  dpUrl: string;
  bio: string;
  gender: 'male' | 'female';
  age: number;
  distance: number;
  interests: string[];
  links: {
    Twitter: string;
    Instagram: string;
    LinkedIn: string;
  };
  stories?: Story[];
}

export interface Story {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userDpUrl: string;
  title: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  location?: string;
}