import Link from 'next/link';
import createSupabaseServerClient from '@/lib/supabase/server';
import getUserSession from '@/lib/getUserSession';
import { Session } from '@supabase/supabase-js';

interface UserData {
  session: Session | null; // Definición del tipo para la sesión
}
const Header = async (): Promise<JSX.Element> => {
  const { data }: { data: UserData } = await getUserSession();

  const logoutAction = async () => {
    'use server';
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  };

  return (
    <header className=' h-20 text-black'>
      <nav className='h-full flex justify-between container items-center'>
        <div>
          <Link href='/' className='text-2xl font-semibold'>
            CodevoWeb
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
          <Link href='/' className=''>
            Home
          </Link>
          <Link href='/profile' className=''>
            Profile
          </Link>
          {!data.session && (

            <Link href='/login' className=''>
              Login
            </Link>
          )}
          {data.session && (
            <form action={logoutAction} className='flex'>

              <button className='ml-4'>Logout</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
