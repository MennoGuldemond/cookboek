export class Recipe {
  constructor() {
    this.ingredients = [];
    this.steps = [];
  }

  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  photoURL: string;
  likes: string[];
  createdOn: Date;

  isTextOnly: boolean;
  text: string;

  ownerId: string;
  ownerName: string;
}
