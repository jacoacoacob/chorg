# Chorg

A tool for keeping track of chores and who is doing them.

## Setup

This project uses <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">Next.js</a> and <a href="https://supabase.com/docs/guides/cli/local-development" target="_blank" rel="noopener noreferrer">Supabase</a>.

### Requirements
- Node.js
- Docker

### Running Locally
After cloning and `cd`ing into the project root on your machine...

1. Install project dependencies
  ```bash
  npm i
  ```
2. Start local supabase services _(read more about <a href="https://supabase.com/docs/guides/cli/local-development" target="_blank" rel="noopener noreferrer">developing locally with supabase</a>)_
  ```bash
  npx supabase start
  ```
3. Start the development server
```bash
npm run dev
```