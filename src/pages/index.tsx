import type { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import React from "react";
import dynamic from "next/dynamic";
import MainLayout from "@/components/layouts/main-layout";
import PostList from "@/components/post/post-list";
import ModalWrapper from "@/components/common/modal-wrapper";
import PostDetails from "@/components/post/post-details";
import Head from "next/head";
import useHome from "@/components/home/use-home";
import HomeFallbackCard from "@/components/home/home-fallback-card";
import { authOptions } from "./api/auth/[...nextauth]";
const PostInputView = dynamic(() => import("@/components/post-input-new"), {
  ssr: false,
});

const Home: NextPage = () => {
  const {
    closeShowcasedPost,
    data,
    fetchNextPage,
    hasNextPage,
    showcasedPostId,
    isPostsNotExists,
  } = useHome();

  return (
    <>
      <Head>
        <title>Babila</title>
      </Head>
      <MainLayout>
        <div className="px-2 mt-5">
          <PostInputView />
        </div>

        {isPostsNotExists ? (
          <HomeFallbackCard />
        ) : (
          <PostList
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        )}
      </MainLayout>
      {showcasedPostId && (
        <ModalWrapper title="Post" handleCloseModal={closeShowcasedPost} isBig>
          <PostDetails postId={showcasedPostId!} />
        </ModalWrapper>
      )}
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default Home;
