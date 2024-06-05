# AI Image Transformation(ImageGen)

Welcome to the AI Image Transformation project! This project leverages the power of AI to transform images using various techniques and styles. It is built with cutting-edge technologies including Next.js, Mongoose, MongoDB, Shadcn UI, Clerk for authentication, Cloudinary for image storage, and TypeScript. The application is deployed on Vercel for a seamless and scalable experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [GitButler](#gitbutler)
- [Contributing](#contributing)
- [License](#license)

## Features

- AI-powered image transformations
- User authentication and management
- Secure image storage and handling
- Responsive and user-friendly UI
- Scalable and fast deployment on Vercel

## Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/)
- **Backend**: [Mongoose](https://mongoosejs.com/) and [MongoDB](https://www.mongodb.com/)
- **UI Components**: [Shadcn UI](https://shadcn.dev/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

To get a local copy of the project up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:
- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/MoDev40/image-gen
   ```
2. Navigate to the project directory
   ```sh
   cd ai-image-transformation
   ```
3. Install dependencies
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

### Usage

1. Set up environment variables:
   Create a `.env.local` file in the root of your project and add the following environment variables:

   ```plaintext
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

    MONGODB_URI=your_mongodb_uri
    
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    
   ```

2. Start the development server
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

The project is set up for deployment on Vercel. To deploy, follow these steps:

1. Push your code to a Git repository (GitHub, GitLab, etc.).
2. Connect your repository to Vercel.
3. Vercel will automatically detect the project settings and deploy your application.

For more details, refer to the [Vercel documentation](https://vercel.com/docs).

## GitButler

We are excited to introduce GitButler for enhanced Git management. GitButler makes Git operations incredibly easy with features such as:

- **Virtual Branches**: Simplify branch management without the overhead of traditional branching.
- **AI-Generated Commits**: Automatically generate meaningful commit messages using AI.
- **GUI Management**: Manage your Git operations through an intuitive graphical user interface.

### Install GitButler

1. Install GitButler [GitButler](https://gitbutler.com/).

For more details and advanced configurations, refer to the [GitButler documentation](https://docs.gitbutler.com/).

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Muktar - [Gmail](mailto:modev.404@gmail.com)

Project Link: [ImageGen](https://github.com/MoDev40/image-gen)