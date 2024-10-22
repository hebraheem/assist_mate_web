export interface IUser {
  username?: string;
  firstName?: string;
  bio?: string;
  lastName?: string;
  avatar?: string;
  email: string;
  password?: string;
  nationality?: string;
  primaryLanguage?: string;
  mobile?: string;
  verified?: boolean;
  locationAllowed?: boolean;
  userType?: 'SEEKER' | 'HELPER';
  active?: boolean;
  otherLanguages?: Array<unknown>;
  hobbies?: Array<unknown>;
  reviews?: Array<unknown>;
  requests?: Array<unknown>;
  chats?: Array<unknown>;
  address?: IAddress;
  settings?: ISettings;
}
export interface ICoordinate {
  lat?: null;
  lng?: null;
}
export interface IAddress {
  street?: string;
  city?: string;
  houseNumber?: string;
  state?: string;
  country?: string;
  coordinate?: ICoordinate;
}
export interface IDocuments {
  id?: string;
  proof_1?: string;
  proof_2?: string;
  proof_3?: string;
}
export interface ISettings {
  language?: string;
  occupation?: string;
  currentLatLng?: ICoordinate;
  documents?: IDocuments;
}

export interface IUserResponse {
  address?: IAddress;
  email?: string;
  firstName?: string;
  hobbies?: Array<unknown>;
  otherLanguages?: Array<unknown>;
  isActive?: boolean;
  lastName?: string;
  chats?: Array<unknown>;
  mobile?: string;
  displayName?: string;
  nationality?: string;
  lastLogIn?: ILastLogIn;
  username?: string;
  userType?: string;
  settings?: ISettings;
  primaryLanguage?: string;
  verified?: boolean;
  bio?: string;
  createdAt?: ILastLogIn;
  requests?: Array<unknown>;
  locationAllowed?: boolean;
  reviews?: Array<unknown>;
  id?: string;
  meta?: IMeta;
  emailVerified?: boolean;
  providerId?: string;
  uid?: string;
  phoneNumber?: null;
  photoURL?: string;
  metadata?: unknown;
}
export interface ICoordinate {
  lng?: null;
  lat?: null;
}
export interface IAddress {
  country?: string;
  state?: string;
  houseNumber?: string;
  street?: string;
  coordinate?: ICoordinate;
  city?: string;
}
export interface ILastLogIn {
  seconds?: number;
  nanoseconds?: number;
}
export interface IDocuments {
  proof_2?: string;
  id?: string;
  proof_1?: string;
  proof_3?: string;
}
export interface ICurrentLatLng {
  lat?: null;
  lng?: null;
}
export interface ISettings {
  documents?: IDocuments;
  currentLatLng?: ICurrentLatLng;
  occupation?: string;
  language?: string;
}
export interface IMeta {
  hasPendingWrites?: boolean;
  fromCache?: boolean;
}
