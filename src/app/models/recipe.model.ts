export class Recipe {
  id: string;
  title: string;
  description: string;
  photoURL: string;
  createdOn: any;
  instructions: string;
  ingredients: string;

  likes: string[];

  ownerId: string;
  ownerName: string;
}
