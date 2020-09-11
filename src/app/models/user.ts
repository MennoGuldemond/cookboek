export interface User extends GoogleUser {
    recipeIds: string[];
    createdOn: Date;
}

export interface GoogleUser {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
}
