import { getSession, signIn } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import FormInput from '@/components/form/form-input';
import GoogleIcon from '@/components/common/icons/google';
import GithubIcon from '@/components/common/icons/github';
import Button from '@/components/common/button';
import { useForm } from 'react-hook-form';


export interface SignInFormType {
  email: string;
}

export default function SignIn() {

  return (
    <div className="lg:grid grid-cols-2 min-h-screen bg-white dark:bg-transparent">
      <div className="hidden lg:flex bg-blue-900/90 dark:bg-blue-900/60 py-20">
        <div className="relative flex w-full items-center justify-center">
          <Image src="/images/blob-animation.svg" alt="" layout="fill" />
          <div className="w-[500px] h-[500px] relative">
            <Image src="/images/login-image.svg" alt="" layout="fill" />
          </div>
        </div>
      </div>

      <div className="p-5 lg:p-20 h-full max-w-[800px] mx-auto flex flex-col justify-center">
        <h1 className="font-poppins text-2xl lg:text-5xl font-semibold mb-5">
          Sign In
        </h1>
        <p className="text-lg lg:text-2xl mb-10 lg:mb-20">
          Join our growing community and share your moments with others{' '}
          <span className="text-3xl">👍</span>
        </p>
        <div className="flex lg:hidden">
          <div className="relative flex w-full items-center justify-center mb-10">
            <div className="w-full h-[200px] relative">
              <Image src="/images/login-image.svg" alt="" layout="fill" />
            </div>
          </div>
        </div>

        <div className="flex flex-col">

          <div className="flex flex-col space-y-5">
            <button
              type="button"
              onClick={() => signIn('google')}
              className="ring rounded-full flex items-center justify-center space-x-3 p-3 lg:text-lg"
            >
              <GoogleIcon /> <span>Sign in with google</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  return { props: {} };
}
