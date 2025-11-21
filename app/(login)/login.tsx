"use client";

import { Logo } from '@/components/logo';
import GoogleButton from 'react-google-button';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from './actions';
import { redirect, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup'; }) {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const inviteId = searchParams.get('inviteId');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);
  
  const redirectTo = useMemo(() => role === 'owner' ? '/onboarding?role=owner' : '/chat', [ role ]);
  
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle(redirectTo, role || undefined);
    } catch (error) {
      setError('Failed to sign in with Google');
      setIsLoading(false);
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    // For signup, we need to call signUp action. But here we are reusing Login component?
    // Actually, I should separate them or pass the action.
    // But wait, the file is `app/(login)/login.tsx` which exports `Login` component.
    // `app/(login)/sign-up/page.tsx` imports `Login`.
    // I should probably make this component flexible.
    
    // However, `signInWithEmail` and `signUp` are different actions.
    // I will use the `mode` prop.
    
    if (mode === 'signup') {
      if (role) formData.append('role', role);
      if (inviteId) formData.append('inviteId', inviteId);
      
      const result = await signUpWithEmail({}, formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    } else {
      // Sign In
      const result = await signInWithEmail({}, formData);
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="border min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="mt-6 text-xl text-center text-foreground">
          {mode === 'signup' ? 'Create an account' : 'Sign in to GoCareerPath'}
        </h1>
        {role === 'owner' && (
          <p className="mt-2 text-sm text-muted-foreground">
            Start upskilling your team today.
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form action={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required
                  minLength={8}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  mode === 'signup' ? 'Sign up' : 'Sign in'
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <GoogleButton 
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                label={mode === 'signup' ? 'Sign up with Google' : 'Sign in with Google'}
              />
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <a href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
                    Sign in
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <a href={`/sign-up${role ? `?role=${role}` : ''}`} className="font-medium text-blue-600 hover:text-blue-500">
                    Sign up
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
