'use client';

import {
  Connection as ClerkConnection,
  Field as ClerkField,
  FieldError as ClerkFieldError,
  Input as ClerkInput,
  Label as ClerkLabel,
  Loading as ClerkLoading,
} from '@clerk/elements/common';
import {
  Action as SignInAction,
  SafeIdentifier as SignInSafeIdentifier,
  SignIn,
  Step as SignInStep,
  Strategy as SignInStrategy,
} from '@clerk/elements/sign-in';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Link } from '@/components/ui/Link';
import { Spinner } from '@/components/ui/Spinner';
import { GithubIcon } from '@/components/icons/GithubIcon';
import {
  AuthContent,
  AuthDescription,
  AuthFooter,
  AuthHeader,
  AuthSeparator,
  AuthTitle,
} from '@/components/layout/Auth';
import { SIGN_IN_URL, SIGN_UP_URL } from '@/constants/clerk';

const SignInPage = () => (
  <SignIn>
    <ClerkLoading>
      {isGlobalLoading => (
        <>
          <SignInStep name='start'>
            <AuthHeader>
              <AuthTitle>Welcome back!</AuthTitle>
              <AuthDescription>
                Sign in to continue to NotTwitch.
              </AuthDescription>
            </AuthHeader>
            <AuthContent>
              <ClerkConnection name='github' asChild>
                <Button
                  type='button'
                  disabled={isGlobalLoading}
                  className='w-full'
                >
                  <ClerkLoading scope='provider:github'>
                    {isLoading => (
                      <>
                        {isLoading ? (
                          <Spinner className='me-2 size-4' />
                        ) : (
                          <GithubIcon className='me-2 size-4' />
                        )}
                        Sign in with GitHub
                      </>
                    )}
                  </ClerkLoading>
                </Button>
              </ClerkConnection>
              <AuthSeparator>or</AuthSeparator>
              <ClerkField name='identifier' className='space-y-2'>
                <ClerkLabel asChild>
                  <Label>Username</Label>
                </ClerkLabel>
                <ClerkInput required asChild>
                  <Input />
                </ClerkInput>
                <ClerkFieldError className='block text-sm text-destructive' />
              </ClerkField>
              <SignInAction submit asChild>
                <Button
                  variant='primary'
                  disabled={isGlobalLoading}
                  className='w-full'
                >
                  <ClerkLoading>
                    {isLoading =>
                      isLoading ? <Spinner className='size-4' /> : 'Continue'
                    }
                  </ClerkLoading>
                </Button>
              </SignInAction>
            </AuthContent>
            <AuthFooter>
              Don&apos;t have an account?{' '}
              <Link href={SIGN_UP_URL}>Sign up</Link>
            </AuthFooter>
          </SignInStep>

          <SignInStep name='verifications'>
            <SignInStrategy name='password'>
              <AuthHeader>
                <AuthTitle>
                  Hi, <SignInSafeIdentifier />!
                </AuthTitle>
                <AuthDescription>
                  Enter your password here to sign in.
                </AuthDescription>
              </AuthHeader>
              <AuthContent>
                <ClerkField name='password' className='space-y-2'>
                  <ClerkLabel asChild>
                    <Label>Password</Label>
                  </ClerkLabel>
                  <ClerkInput type='password' asChild>
                    <Input />
                  </ClerkInput>
                  <ClerkFieldError className='block text-sm text-destructive' />
                </ClerkField>
                <SignInAction submit asChild>
                  <Button
                    variant='primary'
                    disabled={isGlobalLoading}
                    className='w-full'
                  >
                    <ClerkLoading>
                      {isLoading =>
                        isLoading ? <Spinner className='size-4' /> : 'Sign in'
                      }
                    </ClerkLoading>
                  </Button>
                </SignInAction>
              </AuthContent>
              <div className='mt-4 text-sm'>
                <Link asChild href={SIGN_IN_URL}>
                  <SignInAction navigate='start'>Change user</SignInAction>
                </Link>
              </div>
            </SignInStrategy>
          </SignInStep>
        </>
      )}
    </ClerkLoading>
  </SignIn>
);

export default SignInPage;
