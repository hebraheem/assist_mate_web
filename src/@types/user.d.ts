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
  active?: boolean;
  otherLanguages?: Array<unknown>;
  hobbies?: Array<unknown>;
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
