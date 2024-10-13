export interface IRootObject {
  user?: null;
  signIn?: unknown;
  signOut?: unknown;
}

export interface IBasicChild {
  children: React.ReactElement;
}

export interface IAuthData {
  token: string | null;
  isAuthenticated: boolean;
  user?: UseAuthReturn;
  error?: any;
  isLoading: boolean;
}
