export interface User {
  id?: string;
  username: string;
  password: string;
  creationDate: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface Account extends User {
  email: string;
  phoneNumber?: string;
  role: string;
}
