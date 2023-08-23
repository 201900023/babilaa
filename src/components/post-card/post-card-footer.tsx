import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import {
  useRemovePostMutation,
  useToggleBookmarkMutation,
  useTogglePostLikeMutation,
} from 'src/hooks/mutation';
import React, { useState } from 'react';
import { PostDetailsType } from '@/types/db';
import BookmarkIcon from '@/components/common/icons/bookmark-empty';
import BookmarkEmptyIcon from '@/components/common/icons/bookmark';
import ShareIcon from '@/components/common/icons/share';
import HeartIcon from '@/components/common/icons/heart';
import HeartEmptyIcon from '@/components/common/icons/heart-empty';
import PostSharingModal from './post-sharing-modal';
import { usePostCommentsQuery } from '@/hooks/query';

import { AiOutlineMessage, AiOutlineDelete } from 'react-icons/ai';
import CommentsList from '../comments-list/comments-list';
import Loading from '../common/loading';

import CommentInput from '../comments-list/comment-input';
import { useAddCommentMutation } from 'src/hooks/mutation';

import { FiCopy, FiShare2 } from "react-icons/fi"
import { GoAlert } from "react-icons/go"

import { FaRegCommentDots } from "react-icons/fa"

interface PostCardFooterProps {
  post: PostDetailsType;
}

import { Dialog } from '@headlessui/react';

const PostCardFooter = ({ post }: PostCardFooterProps) => {

  const [comment, setComments] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const { data: comments, isSuccess: isCommentsSuccess } =
    usePostCommentsQuery(post.id);

  const [isSharing, setIsSharing] = useState(false);
  const { data: session } = useSession();
  const me = session?.user!;

  const closeSharingModal = () => {
    setIsSharing(false);
  };

  const toggleIsSharing = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSharing(!isSharing);
  };

  const toggleBookmark = useToggleBookmarkMutation();
  const togglePostLike = useTogglePostLikeMutation();
  const removePost = useRemovePostMutation();

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark({ postId: post.id });
  };


  const handleToggleMessages = () => {
    setIsOpen(!open)
  }

  const handleToggleLike = (e: React.MouseEvent) => {
    // e.preventDefault();
    e.stopPropagation();
    togglePostLike({ postId: post.id });
  };

  const handleRemovePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    removePost({ postId: post.id });
  };

  useTogglePostLikeMutation();

  const addComment = useAddCommentMutation(post.id);

  const handleAddComment = (message: string) => {
    addComment({
      message,
      parentId: null,
    });
  };

  return (
    <>


      <Dialog className={'bg-black bg-opacity-50 w-full h-full fixed top-0 left-0 z-50 flex items-end justify-center '} open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel >

          <div className='bg-purple-100  w-screen rounded-t-xl h-[600px] grid grid-rows-[40px_460px_100px]  py-3  overflow-hidden ' >

            <header className=' rounded-t-xl bg-transparent flex items-center  flex-col '>

              <p className='font-semibold text-purple-0'>{comments?.length} Comments</p>

              <div className='border-purple-0 border-t-2 w-[90%] mt-3'>&nbsp;</div>

            </header>


            <main className='px-5 mt-2  overflow-y-scroll ' >

              {isCommentsSuccess ? (
                <CommentsList comments={comments} />
              ) : (
                <Loading height={200} />
              )}

            </main>

            <footer className='px-5'>
              <CommentInput onMessageSubmit={handleAddComment} />
            </footer>

          </div>

        </Dialog.Panel>
      </Dialog>

      <div className="items-center flex justify-around gap-2 py-3   text-purple-0 ">
        <button
          type="button"
          className={clsx([
            'flex items-center cursor-pointer w-fit hover:opacity-80 transition-opacity',
            post.likedByMe && '',
          ])}
          onClick={handleToggleLike}
        >
          {post.likedByMe ? <HeartIcon /> : <HeartEmptyIcon />}
          <p className="ml-2">Like</p>
        </button>


        <button
          type="button"
          className={'flex items-center cursor-pointer w-fit   hover:opacity-50 transition-opacity'}
          onClick={() => { setIsOpen(true) }}
        >
          <FaRegCommentDots size={21} className={clsx(post.sharedByMe && 'fill-green-600')} />
          <p className="ml-2">Comment</p>
        </button>

        <button
          type="button"
          className={clsx(
            'flex items-center cursor-pointer w-fit   hover:opacity-50 transition-opacity',
            post.sharedByMe && 'text-green-600'
          )}
          onClick={toggleIsSharing}
        >
          <FiShare2 size={20} />
          <p className="ml-2">Share</p>

        </button>

        <button
          type="button"
          className="flex  items-center cursor-pointer w-fit  hover:opacity-50 transition-opacity"
          onClick={handleToggleBookmark}
        >
          {post.bookmarkedByMe ? <BookmarkEmptyIcon /> : <BookmarkIcon />}
          <p className="ml-2">Save</p>

        </button>

        {me.id === post.userId && (
          <button
            type="button"
            onClick={handleRemovePost}
            className="ml-3 font-medium text-xs text-red-400 hover:text-red-500 transition-colors"
          >
            <AiOutlineDelete size={28} />
          </button>
        )}
      </div>

      {
        isSharing && (
          <PostSharingModal
            closeSharingModal={closeSharingModal}
            sharedPost={post}
          />
        )
      }
    </>
  );
};

export default PostCardFooter;


