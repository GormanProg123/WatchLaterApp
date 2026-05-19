export interface User {
  id: string;
  email: string;

  displayName?: string;
  phoneNumber?: string;

  pushToken?: string;
  notificationsEnabled: boolean;

  createdAt: string;
  updatedAt: string;
}
