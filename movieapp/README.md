# MovieApp

A modern, full-stack movie search and trending platform built with React, Vite, and Supabase.

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


