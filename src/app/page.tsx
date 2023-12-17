import { UserButton } from '@clerk/nextjs';

const Home = () => {
  return (
    <nav className='flex h-16 flex-row items-center justify-between gap-4 bg-background px-4 shadow'>
      <h1 className='text-xl font-bold tracking-tight'>Home</h1>
      <UserButton afterSignOutUrl='/' />
    </nav>
  );
};

export default Home;
