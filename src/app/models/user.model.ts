import { Recipe } from './recipe.model';

export interface IUser {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
  recipes: Recipe[];
  createdAt: Date;
  provider: string;
}
