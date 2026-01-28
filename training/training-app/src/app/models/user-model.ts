export interface UserCredentials {
  id?: string;
  username: string;
  password: string;
}

export interface Account extends Omit<UserCredentials, 'password'> {
  email?: string;
  phoneNumber?: string;
  role?: string;
  active?: boolean;
  firstName?: string;
  lastName?: string;
  lastUpdated?: Date;
  creationDate: string;
}
