export type User = {
  fName?: string;
  lName?: string;
  email?: string;
  password?: string;
  address?: string;
}

export type loginTypes = {
  email: string;
  password: string;
}

export type SignUpTypes = {
  fName: string;
  lName: string;
  email: string;
  password: string;
  address: string;
  role?: string
}
