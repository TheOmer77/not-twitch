import { UserButton } from '@clerk/nextjs';

const Home = () => {
  return (
    <div className='align-center flex flex-row justify-between gap-4 bg-background p-4 shadow'>
      <h1 className='text-xl font-bold tracking-tight'>Home</h1>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

export default Home;
