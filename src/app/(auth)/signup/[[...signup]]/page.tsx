import { SignUp } from '@clerk/nextjs';
import clerkTheme from '../../clerkTheme';

const SignupPage = () => {
  return <SignUp appearance={clerkTheme} />;
};

export default SignupPage;
