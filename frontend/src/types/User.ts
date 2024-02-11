export interface User {
  fName?: string;
  lName?: string;
  email?: string;
  password?: string;
  address?: string;
}

export interface loginTypes {
  email: string;
  password: string;
}

export interface SignUpTypes {
  fName: string;
  lName: string;
  email: string;
  password: string;
  address: string;
  role?: string
}
