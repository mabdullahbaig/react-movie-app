import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabase';

export default function AuthComponent() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e293b 0%, #0ea5e9 100%)',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
        padding: '2.5rem 2rem',
        minWidth: 340,
        maxWidth: 380,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img src="./logo.png" alt="Logo" style={{ width: 64, height: 64, marginBottom: 16 }} />
        <h2 style={{ margin: '0 0 1.5rem 0', color: '#0ea5e9', fontWeight: 700, fontSize: '1.5rem', letterSpacing: 1 }}>Sign in to MovieApp</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0ea5e9',
                  brandAccent: '#1e293b',
                  inputBorder: '#e5e7eb',
                  inputLabelText: '#334155',
                  anchorTextColor: '#0ea5e9',
                },
                fontSizes: {
                  baseBodySize: '1rem',
                  baseInputSize: '1rem',
                  baseLabelSize: '1rem',
                },
                radii: {
                  inputBorderRadius: '0.5rem',
                  buttonBorderRadius: '0.5rem',
                },
              },
            },
          }}
          providers={[]}
          theme="light"
        />
        <p style={{ marginTop: 24, color: '#64748b', fontSize: 14, textAlign: 'center' }}>
          Sign in with your email to access your personalized trending movies.
        </p>
      </div>
    </div>
  );
}
