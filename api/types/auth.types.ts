export interface SignInPayload {
  email: string;
  password: string;
  pushToken?: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  displayName?: string;
  pushToken?: string;
}
