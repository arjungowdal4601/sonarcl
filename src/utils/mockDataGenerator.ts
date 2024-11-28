import { nanoid } from 'nanoid';
import { User, Post, Story } from '../types';

const maleFirstNames = [
  'John', 'Mike', 'David', 'Alex', 'Chris', 'Daniel', 'James', 'Matthew'
];

const femaleFirstNames = [
  'Jane', 'Sarah', 'Emily', 'Katie', 'Emma', 'Olivia', 'Sophia', 'Isabella'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'
];

const bios = {
  male: [
    'Tech enthusiast & developer 💻',
    'Adventure seeker | Climber 🏔️',
    'Photographer 📸',
    'Fitness trainer 💪'
  ],
  female: [
    'Digital artist 🎨',
    'Yoga instructor 🧘‍♀️',
    'Fashion blogger 👗',
    'Food photographer 📸'
  ]
};

const interests = [
  'Photography', 'Travel', 'Fitness', 'Music', 'Art', 'Technology', 'Food', 'Fashion'
];

const locations = [
  'New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'
];

const postCaptions = [
  'Living my best life! 🌟',
  'Another beautiful day 🌅',
  'Can\'t beat this view 😍',
  'Weekend vibes 🎉',
  'Making memories 📸'
];

function generateStories(userId: string): Story[] {
  return Array.from({ length: 3 }, () => ({
    id: nanoid(),
    mediaUrl: `https://picsum.photos/800/1200?random=${nanoid()}`,
    caption: 'Story moment ✨',
    timestamp: new Date().toISOString()
  }));
}

function generateUser(gender: 'male' | 'female', index: number): User {
  const id = nanoid();
  const firstName = gender === 'male' 
    ? maleFirstNames[index % maleFirstNames.length]
    : femaleFirstNames[index % femaleFirstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${index}`;
  
  const userInterests = Array.from({ length: 3 }, () => 
    interests[Math.floor(Math.random() * interests.length)]
  );

  return {
    id,
    name,
    dpUrl: `https://i.pravatar.cc/300?img=${index}${gender === 'male' ? 'm' : 'f'}`,
    bio: gender === 'male' 
      ? bios.male[index % bios.male.length]
      : bios.female[index % bios.female.length],
    gender,
    age: Math.floor(Math.random() * (45 - 18) + 18),
    distance: Math.floor(Math.random() * 250),
    interests: Array.from(new Set(userInterests)),
    links: {
      Twitter: `https://twitter.com/${username}`,
      Instagram: `https://instagram.com/${username}`,
      LinkedIn: `https://linkedin.com/in/${username}`,
    },
    stories: generateStories(id)
  };
}

export function generatePosts(user: User): Post[] {
  return Array.from({ length: 6 }, () => ({
    id: nanoid(),
    userId: user.id,
    userName: user.name,
    userDpUrl: user.dpUrl,
    title: `Post by ${user.name}`,
    mediaUrl: `https://picsum.photos/800/600?random=${nanoid()}`,
    caption: postCaptions[Math.floor(Math.random() * postCaptions.length)],
    timestamp: new Date().toISOString(),
    location: locations[Math.floor(Math.random() * locations.length)]
  }));
}

export const mockUsers = {
  male: Array.from({ length: 10 }, (_, i) => generateUser('male', i)),
  female: Array.from({ length: 10 }, (_, i) => generateUser('female', i))
};