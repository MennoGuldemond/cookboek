import { CategoryRecipe } from './category-recipe.model';
import { Category } from './category.model';
import { Like } from './like.model';
import { User } from './user.model';

export class Recipe {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  instructions: string;
  ingredients: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  author: User;
  categories: Category[] | CategoryRecipe[];
  likes: Like[];
}
