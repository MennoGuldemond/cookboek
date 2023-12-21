export class Recipe {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  createdAt: any;
  instructions: string;
  ingredients: string;
  categories: string[];

  likes: string[];

  ownerId: string;
  ownerName: string;
}
