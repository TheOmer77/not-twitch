import { SignIn } from '@clerk/nextjs';
import clerkTheme from '../../clerkTheme';

const LoginPage = () => {
  return <SignIn appearance={clerkTheme} />;
};

export default LoginPage;
