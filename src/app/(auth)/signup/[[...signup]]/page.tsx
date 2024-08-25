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
  Action as SignUpAction,
  SignUp,
  Step as SignUpStep,
} from '@clerk/elements/sign-up';

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
import { SIGN_IN_URL } from '@/constants/clerk';

const SignUpPage = () => (
  <SignUp>
    <ClerkLoading>
      {isGlobalLoading => (
        <>
          <SignUpStep name='start'>
            <AuthHeader>
              <AuthTitle>Let&apos;s get started</AuthTitle>
              <AuthDescription>
                Fill in the details to create your account.
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
                        Sign up with GitHub
                      </>
                    )}
                  </ClerkLoading>
                </Button>
              </ClerkConnection>
              <AuthSeparator>or</AuthSeparator>
              <ClerkField name='username' className='space-y-2'>
                <ClerkLabel asChild>
                  <Label>Username</Label>
                </ClerkLabel>
                <ClerkInput required asChild>
                  <Input />
                </ClerkInput>
                <ClerkFieldError className='block text-sm text-destructive' />
              </ClerkField>
              <ClerkField name='password' className='space-y-2'>
                <ClerkLabel asChild>
                  <Label>Password</Label>
                </ClerkLabel>
                <ClerkInput type='password' required asChild>
                  <Input />
                </ClerkInput>
                <ClerkFieldError className='block text-sm text-destructive' />
              </ClerkField>
              {/* BUG: No redirect after signup (Clerk Elements bug?) */}
              <SignUpAction submit asChild>
                <Button
                  variant='primary'
                  disabled={isGlobalLoading}
                  className='w-full'
                >
                  <ClerkLoading>
                    {isLoading =>
                      isLoading ? <Spinner className='size-4' /> : 'Sign up'
                    }
                  </ClerkLoading>
                </Button>
              </SignUpAction>
            </AuthContent>
            <AuthFooter>
              Already have an account? <Link href={SIGN_IN_URL}>Sign in</Link>
            </AuthFooter>
          </SignUpStep>
        </>
      )}
    </ClerkLoading>
  </SignUp>
);

export default SignUpPage;
