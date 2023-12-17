import Logo from '@/components/Logo';
import { UserButton } from '@clerk/nextjs';

const Home = () => {
  return (
    <nav className='flex h-16 flex-row items-center justify-between gap-4 bg-background px-4 shadow'>
      <h1 className='flex flex-row items-center gap-4 text-xl font-bold tracking-tight'>
        <Logo className='text-5xl text-primary' />
        Home
      </h1>
      <UserButton afterSignOutUrl='/' />
    </nav>
  );
};

export default Home;
