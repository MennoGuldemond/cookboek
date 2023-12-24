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
  // categories: any;
}
