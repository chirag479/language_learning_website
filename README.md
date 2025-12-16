# LangSphere

Welcome to LangSphere, an interactive language learning platform designed to help you master Hindi, English, and Spanish.

![LangSphere Screenshot](public/langsphere-logo.png)

## Features

-   **Multi-Language Support**: Learn and practice Hindi, English, and Spanish.
-   **Interactive Lessons**: Engage with a variety of question types, including multiple-choice and writing exercises.
-   **Dynamic Progress Tracking**: Your XP, daily streak, and completed lessons are tracked and updated in real-time.
-   **User Authentication**: A simple but effective sign-up and login system.
-   **Clean, Modern UI**: A responsive and intuitive user interface built with Next.js and Tailwind CSS.
-   **No Onboarding**: Get straight to learning after signing in.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (React)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need to have Node.js and npm (or yarn/pnpm) installed on your machine.

-   npm
    ```sh
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/chirag479/language_learning_website.git
    ```
2.  Navigate to the project directory
    ```sh
    cd language_learning_website
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `/app`: Contains all the routes and core UI of the application.
    -   `/app/dashboard`: The main user dashboard.
    -   `/app/lesson`: The interactive lesson pages.
-   `/components`: Shared UI components.
-   `/hooks`: Custom React hooks, including `useUserProgress` for state management.
-   `/lib`: Core helper functions and data, including the multi-language lesson library.
-   `/public`: Static assets like the logo.

---

This project was built with the help of an AI pair programmer. 