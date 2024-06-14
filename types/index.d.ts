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

type DBImage = {
    title: string;
    transformationType: string;
    publicId: string;
    secureUrl: string; 
    width?: number;
    height?: number;
    config?: object; 
    transformedUrl?: string; 
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author: string;
}