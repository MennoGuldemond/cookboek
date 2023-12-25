import { CategoryRecipe } from './category-recipe.model';
import { Category } from './category.model';
import { User } from './user.model';

export class Recipe {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  instructions: string;
  ingredients: string;
  likes: number;
  published: boolean;
  authorId: string;
  createdAt: Date;
  author: User;
  categories: Category[] | CategoryRecipe[];
}
