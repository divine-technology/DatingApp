import {AuthUser} from '../../apiClient';

export const mockData: AuthUser[] = [
  {
    _id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-01T08:00:00Z',
    location: {
      type: '',
      coordinates: [37.7749, -122.4194]
    },
    gender: 'male',
    preference: 'female',
    age: 28,
    bio: "Hello, I'm John! Nice to meet you.",
    hobbies: ['reading', 'hiking', 'photography']
  },
  {
    _id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-02T10:30:00Z',
    location: {
      type: '',
      coordinates: [34.0522, -118.2437]
    },
    gender: 'female',
    preference: 'male',
    age: 24,
    bio: "Hey there! I'm Jane, nice to connect.",
    hobbies: ['painting', 'traveling', 'dancing']
  },
  {
    _id: '3',
    firstName: 'David',
    lastName: 'Johnson',
    email: 'david@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-03T14:15:00Z',
    location: {
      type: '',
      coordinates: [40.7128, -74.006]
    },
    gender: 'male',
    preference: 'female',
    age: 35,
    bio: "Hi, I'm David. Looking forward to making new friends.",
    hobbies: ['cooking', 'gardening', 'movies']
  },
  {
    _id: '4',
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-04T16:45:00Z',
    location: {
      type: '',
      coordinates: [51.5074, -0.1278]
    },
    gender: 'female',
    preference: 'male',
    age: 29,
    bio: "Hello! I'm Emily. Let's explore the world together.",
    hobbies: ['reading', 'traveling', 'yoga']
  },
  {
    _id: '5',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-05T09:30:00Z',
    location: {
      type: '',
      coordinates: [52.52, 13.405]
    },
    gender: 'male',
    preference: 'female',
    age: 31,
    bio: "Hey, I'm Michael. Excited to meet interesting people.",
    hobbies: ['sports', 'music', 'cooking']
  },
  {
    _id: '6',
    firstName: 'Emma',
    lastName: 'Jones',
    email: 'emma@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-06T11:00:00Z',
    location: {
      type: '',
      coordinates: [48.8566, 2.3522]
    },
    gender: 'female',
    preference: 'male',
    age: 27,
    bio: "Hi there! I'm Emma. Let's chat and share stories.",
    hobbies: ['photography', 'traveling', 'painting']
  },
  {
    _id: '7',
    firstName: 'Daniel',
    lastName: 'Miller',
    email: 'daniel@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-07T13:20:00Z',
    location: {
      type: '',
      coordinates: [37.7749, -122.4194]
    },
    gender: 'male',
    preference: 'female',
    age: 26,
    bio: "Hello, I'm Daniel. Looking for like-minded folks.",
    hobbies: ['coding', 'movies', 'hiking']
  },
  {
    _id: '8',
    firstName: 'Olivia',
    lastName: 'Davis',
    email: 'olivia@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-08T15:40:00Z',
    location: {
      type: '',
      coordinates: [34.0522, -118.2437]
    },
    gender: 'female',
    preference: 'male',
    age: 30,
    bio: "Hey! I'm Olivia. Let's have some interesting conversations.",
    hobbies: ['reading', 'cooking', 'dancing']
  },
  {
    _id: '9',
    firstName: 'Christopher',
    lastName: 'Martinez',
    email: 'christopher@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-09T17:50:00Z',
    location: {
      type: '',
      coordinates: [40.7128, -74.006]
    },
    gender: 'male',
    preference: 'female',
    age: 23,
    bio: "Hi, I'm Chris. Excited to connect with new people.",
    hobbies: ['traveling', 'music', 'sports']
  },
  {
    _id: '10',
    firstName: 'Sophia',
    lastName: 'Anderson',
    email: 'sophia@example.com',
    role: 'user',
    createdAccountTimeStamp: '2023-08-10T20:00:00Z',
    location: {
      type: '',
      coordinates: [51.5074, -0.1278]
    },
    gender: 'female',
    preference: 'male',
    age: 25,
    bio: "Hello there! I'm Sophia. Let's make memories together.",
    hobbies: ['painting', 'yoga', 'reading']
  }
  //   {
  //     _id: '11',
  //     firstName: 'Matthew',
  //     lastName: 'Taylor',
  //     email: 'matthew@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-11T22:10:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [52.52, 13.405]
  //     },
  //     gender: 'male',
  //     preference: 'female',
  //     age: 33,
  //     bio: "Hey, I'm Matthew. Looking forward to meaningful conversations.",
  //     hobbies: ['cooking', 'gardening', 'movies']
  //   },
  //   {
  //     _id: '12',
  //     firstName: 'Ava',
  //     lastName: 'Harris',
  //     email: 'ava@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-12T09:15:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [48.8566, 2.3522]
  //     },
  //     gender: 'female',
  //     preference: 'male',
  //     age: 29,
  //     bio: "Hi there! I'm Ava. Let's share stories and experiences.",
  //     hobbies: ['photography', 'traveling', 'painting']
  //   },
  //   {
  //     _id: '13',
  //     firstName: 'William',
  //     lastName: 'Wilson',
  //     email: 'william@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-13T11:30:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [37.7749, -122.4194]
  //     },
  //     gender: 'male',
  //     preference: 'female',
  //     age: 28,
  //     bio: "Hello, I'm William. Excited to connect with interesting people.",
  //     hobbies: ['coding', 'movies', 'hiking']
  //   },
  //   {
  //     _id: '14',
  //     firstName: 'Isabella',
  //     lastName: 'White',
  //     email: 'isabella@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-14T13:45:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [34.0522, -118.2437]
  //     },
  //     gender: 'female',
  //     preference: 'male',
  //     age: 27,
  //     bio: "Hey there! I'm Isabella. Let's have engaging conversations.",
  //     hobbies: ['reading', 'cooking', 'dancing']
  //   },
  //   {
  //     _id: '15',
  //     firstName: 'James',
  //     lastName: 'Jackson',
  //     email: 'james@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-15T16:00:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [40.7128, -74.006]
  //     },
  //     gender: 'male',
  //     preference: 'female',
  //     age: 31,
  //     bio: "Hi, I'm James. Let's explore and enjoy life together.",
  //     hobbies: ['traveling', 'music', 'sports']
  //   },
  //   {
  //     _id: '16',
  //     firstName: 'Sophie',
  //     lastName: 'Lee',
  //     email: 'sophie@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-16T18:15:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [51.5074, -0.1278]
  //     },
  //     gender: 'female',
  //     preference: 'male',
  //     age: 24,
  //     bio: "Hello! I'm Sophie. Let's create wonderful memories.",
  //     hobbies: ['painting', 'yoga', 'reading']
  //   },
  //   {
  //     _id: '17',
  //     firstName: 'Liam',
  //     lastName: 'Thomas',
  //     email: 'liam@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-17T20:30:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [52.52, 13.405]
  //     },
  //     gender: 'male',
  //     preference: 'female',
  //     age: 29,
  //     bio: "Hey, I'm Liam. Let's have meaningful discussions.",
  //     hobbies: ['cooking', 'gardening', 'movies']
  //   },
  //   {
  //     _id: '18',
  //     firstName: 'Mia',
  //     lastName: 'Martin',
  //     email: 'mia@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-18T22:45:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [48.8566, 2.3522]
  //     },
  //     gender: 'female',
  //     preference: 'male',
  //     age: 28,
  //     bio: "Hi there! I'm Mia. Let's share stories and experiences.",
  //     hobbies: ['photography', 'traveling', 'painting']
  //   },
  //   {
  //     _id: '19',
  //     firstName: 'Ethan',
  //     lastName: 'Brown',
  //     email: 'ethan@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-19T09:00:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [37.7749, -122.4194]
  //     },
  //     gender: 'male',
  //     preference: 'female',
  //     age: 30,
  //     bio: "Hello, I'm Ethan. Looking forward to connecting with you.",
  //     hobbies: ['coding', 'movies', 'hiking']
  //   },
  //   {
  //     _id: '20',
  //     firstName: 'Aria',
  //     lastName: 'Johnson',
  //     email: 'aria@example.com',
  //     role: 'user',
  //     createdAccountTimeStamp: '2023-08-20T11:15:00Z',
  //     location: {
  //       type: '',
  //       coordinates: [34.0522, -118.2437]
  //     },
  //     gender: 'female',
  //     preference: 'male',
  //     age: 25,
  //     bio: "Hey there! I'm Aria. Let's have engaging conversations.",
  //     hobbies: ['reading', 'cooking', 'dancing']
  //   }
];
