import { useRouter } from 'next/router';
import { useUserPostsQuery, useUserQuery } from 'src/hooks/query';
import { FilterData } from '@/components/user-profile/types';

const useUser = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const section = router.query?.section as string | undefined;
  const filter = router.query?.filter as string | undefined;

  const { data: userDetails, isError: isUserError } = useUserQuery(userId);
  const {
    data: postData,
    fetchNextPage,
    hasNextPage,
  } = useUserPostsQuery(userId, filter);

  const closeModal = () => {
    const { section, userId, ...restParams } = router.query;

    router.replace(
      {
        pathname: `/user/${userId}`,
        query: { ...restParams },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  };

  const filters: FilterData[] = [
    {
      id: '1',
      filterName: undefined,
      displayName: 'posts',
    },
    {
      id: '2',
      filterName: 'ratings',
      displayName: 'ratings',
    },
    {
      id: '3',
      filterName: 'CV',
      displayName: 'cv',
    },
  ];
  return {
    userId,
    filters,
    closeModal,
    section,
    userDetails,
    isUserError,
    postData,
    fetchNextPage,
    hasNextPage,
  };
};

export default useUser;
