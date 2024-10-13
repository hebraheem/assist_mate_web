import { IUser } from '../../@types/user';

export const defaultUser: IUser = {
  username: '',
  firstName: '',
  lastName: '',
  avatar: '',
  email: '',
  password: '',
  nationality: '',
  primaryLanguage: '',
  mobile: '',
  verified: false,
  active: false,
  otherLanguages: [],
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
    currentLatLng: { lat: null, lng: null },
    documents: {
      id: '',
      proof_1: '',
      proof_2: '',
      proof_3: '',
    },
  },
};
