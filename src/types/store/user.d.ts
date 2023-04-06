export interface UserState {
  token: string;
  expires?: string;
  id?: string | number;
  name?: string;
  avatar: string;
  roles: string[];
  perms: string[];
}
