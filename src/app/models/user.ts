export class User implements GoogleUser {

    constructor() {
        this.recipeIds = [];
    }

    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    recipeIds: string[];
}

export interface GoogleUser {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
}
