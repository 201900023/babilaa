import { useRouter } from 'next/router';
import ArrowLeftIcon from './icons/arrow-left';

const BackButton = () => {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  if (router.pathname === '/') return null;

  return (
    <button
      type="button"
      onClick={onClickBack}
      className="my-3 px-2  text-sm font-poppins font-semibold flex items-center fill-purple-0 text-purple-0 "
    >
      <ArrowLeftIcon width={16} height={16} />
      <p className="ml-2">Home</p>
    </button>
  );
};

export default BackButton;
