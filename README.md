# tic-tac-toe

A simple tic-tac-toe game to showcase a full JS stack.

## Requirements

- Node.js (=18.x)
- Yarn (>=1.15)

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Game logic is forked from [React Tutorial](https://react.dev/learn/tutorial-tic-tac-toe).

The game is using Firebase as the real-time database storage.

To install dependencies:

```bash
yarn
```

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run the built application on Android:

```bash
yarn deploy:android
```

Android Studio emulator should also be opened.

To update APIs on Firebase Cloud Functions:

```bash
yarn deploy:api
```

To have environment variables, below schema is used:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_API_AUTH=
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Capacitor Documentation](https://capacitorjs.com/docs/getting-started) - learn about Capacitor.
- [Firebase Documentation](https://firebase.google.com/docs/cli) - learn about Firebase.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
