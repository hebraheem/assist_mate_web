import { IDefaultRequest } from '../../@types/request';
import { IUser } from '../../@types/user';

export const defaultUser: IUser = {
  username: '',
  bio: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  nationality: '',
  primaryLanguage: '',
  mobile: '',
  otherLanguages: [],
  userType: 'SEEKER',
  locationAllowed: true,
  reviews: [],
  chats: [],
  requests: [],
  hobbies: [],
  address: {
    street: '',
    city: '',
    houseNumber: '',
    state: '',
    country: '',
    coordinate: { lat: null, lng: null },
  },
  settings: {
    language: '',
    occupation: '',
    documents: [],
  },
};

export const defaultRequest: IDefaultRequest = {
  title: '',
  category: '',
  description: '',
  dueDateTime: '',
  status: 'CREATED',
  otherCategory: '',
  chats: [],
  user: '',
  resolver: '',
  tempResolvers: [],
  files: [],
};
