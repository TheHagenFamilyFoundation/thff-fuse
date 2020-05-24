export class User {
    id: string;

    username: string;

    password: string;

    firstName: string;

    lastName: string;

    token?: string;

    createdAt: Date;

    updatedAt: Date;

    email: string;

    resetTime: Date;

    resetCode: string;

    accessLevel: number;
}
