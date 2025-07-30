# MovieApp

A modern, full-stack movie search and trending platform built with React, Vite, and Supabase.

<img width="935" height="842" alt="1" src="https://github.com/user-attachments/assets/f0179546-c3b0-4688-a736-91addf56fee5" />
<img width="1915" height="862" alt="2" src="https://github.com/user-attachments/assets/f9b456ba-9ed7-4e83-ab6f-541638f78a5b" />
<img width="1896" height="877" alt="3" src="https://github.com/user-attachments/assets/d49a1412-2dc9-43d5-942f-7928a0b93d97" />
<img width="1877" height="871" alt="4" src="https://github.com/user-attachments/assets/16857cc1-9ac2-4675-8e15-9be5dfe9882f" />

## Features

- 🔍 **Movie Search:** Search for movies using the TMDB API with debounced input and live results.
- 📈 **Trending Movies:** Track and display trending movies based on user searches, with secure user-specific data.
- 🔐 **Authentication:** Email sign-up/sign-in powered by Supabase Auth, with secure session management.
- 🗂 **Pagination:** Browse movies with intuitive pagination controls.
- 🎨 **Modern UI:** Beautiful, responsive interface adapted from a popular open-source GitHub project, further customized for a professional look.
- 🛡 **Security:** Row Level Security (RLS) on Supabase for all user data operations.

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Auth & Database)
- [TMDB API](https://www.themoviedb.org/documentation/api)
- [@supabase/auth-ui-react](https://github.com/supabase/auth-ui)

## Getting Started

1. **Clone the repository:**
   ```bash
   https://github.com/mabdullahbaig/react-movie-app.git
   cd movieapp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and fill in your Supabase and TMDB API keys.
4. **Run the app:**
   ```bash
   npm run dev
   ```

## Environment Variables

```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
