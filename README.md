# This is definitely not Twitch

If you somehow found this project - good for you, I guess. It's not finished though.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). I also use Docker Compose here to run it as well as some other stuff, like a Postgres DB and an Ngrok service.

## Prerequisites

- Nodejs 20
- Docker

## Getting Started

- First, copy the content of `.env.example` into a new `.env` file, and fill in all missing values.
- Install all dependencies:

  ```bash
  pnpm i
  ```

- To run all services:

  ```bash
  docker compose up -d
  ```

  The app will be available at [localhost:3000](http://localhost:3000), and also at the specified `NGROK_DOMAIN`.
  To run just the app and no other services, only at [localhost:3000](http://localhost:3000):

  ```bash
  pnpm dev
  ```
