import { Recipe } from './recipe-model';

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
  recipes: Recipe[];
  createdAt: Date;
  provider: string;
}
