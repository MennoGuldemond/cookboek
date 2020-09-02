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
}
