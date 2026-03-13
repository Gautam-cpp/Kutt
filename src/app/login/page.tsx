'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signIn('google', { callbackUrl: '/' });
    } catch {
      setError('Failed to connect to Google authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-16 bg-gradient-to-b from-[var(--brand-light)] to-[var(--background)]">
      <div className="card w-full max-w-md overflow-hidden animate-fade-up">
        {/* Card header */}
        <div className="bg-gradient-to-br from-[var(--brand)] to-[#4f46e5] px-8 py-8 text-white relative flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-5 no-underline">
            <Image src="/logo.svg" alt="Kutt" width={24} height={32} className="brightness-0 invert" />
            <span className="font-bold text-2xl text-white">Kutt</span>
          </Link>
          <h1 className="text-2xl font-bold mb-1 text-center">Welcome</h1>
          <p className="text-violet-200 text-sm text-center">Sign in or create a new account to continue.</p>
        </div>

        {/* Form body */}
        <div className="px-8 py-10 flex flex-col gap-5 items-center">
          
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2 animate-fade-up w-full text-center">
              {error}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-4 w-full pt-2">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              aria-label="Continue with Google"
              className="w-full flex items-center justify-center gap-3 h-12 rounded-full bg-white text-gray-800 text-sm font-semibold shadow-md hover:bg-gray-50 border border-gray-200 disabled:opacity-60 transition-all cursor-pointer"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin-slow" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
              )}
              Continue with Google
            </button>
          </div>

          <p className="text-center text-xs text-[var(--text-muted)] mt-4">
            By continuing, you agree to our{' '}
            <a href="#" className="text-brand hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-brand hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
