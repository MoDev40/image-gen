declare type CreateUser = {
    clerkId: string;
    email: string;
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
}

type DBUser = {
    _id: string;
    clerkId: string;
    email: string;
    username: string;
    photo: string;
    firstName: string;
    lastName: string;
    planId: number;
    creditBalance: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}