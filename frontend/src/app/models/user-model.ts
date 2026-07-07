export type UserRole = 'USER' | 'ADMIN';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  imageURL: string;
  bearerToken: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  createdAt: Date;
  provider: string;
  role: UserRole;
  numberOfRecipes: number;
  numberOfLikesGiven: number;
  numberOfLikesReceived: number;
}
