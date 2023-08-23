import { CommentDetailsType } from '@/types/db';
import useComment from '@/components/comments-list/use-comment';
import CommentInput from './comment-input';
import clsx from 'clsx';

// import Author from '../post-card/author';
// import CommentFooter from './comment-footer';
// import CommentContent from './comment-content';
import DeletedCommenFallback from './deleted-comment-fallback';
import HeartIcon from '../common/icons/heart';
import HeartEmptyIcon from '../common/icons/heart-empty';
import { useToggleCommentLikeMutation } from '@/hooks/mutation';
import ReactTimeAgo from 'react-time-ago';
import UserProfilePicture from '../common/user-profile-image';

import Image from 'next/image';
export interface CommentitemProps {
  comment: CommentDetailsType;
  parentUserName: string | null;
}

const CommentItem = ({ comment, parentUserName }: CommentitemProps) => {
  const {
    onChangeDraftContent,
    handleAddCommentReply,
    handleUpdateComment,
    isReplying,
    toggleIsEditing,
    toggleIsReplying,
    draftContent,
    isEditing,
  } = useComment({ comment });

  if (comment.isDeleted) {
    return <DeletedCommenFallback />;
  }

  const toggleLike = useToggleCommentLikeMutation(comment.postId);

  const handleToggleLike = () => {
    toggleLike({ commentId: comment.id });
  };

  return (
    <>
      <div
        className="bg-[#F3EEF6] gap-x-3 p-3 py-4 rounded-lg mb-3"
        id={`comment-${comment.id}`}>


        <div className='w-full grid grid-cols-[50px_auto_50px]'>
          <div className='rounded-full'>
            <a className="h-10" onClick={(e) => e.stopPropagation()}>
              <Image
                src={comment.user.image || '/images/avatar-fallback.svg'}
                width="40"
                height="40"
                layout="fixed"
                alt=""
                className="rounded-full"
                objectFit="cover"
              />
            </a>
          </div>
          <div>
            <header className='flex gap-5 items-center '>
              <h2 className='text-purple-0 font-bold text-sm'>{comment.user.name}</h2>
              <span className='text-[13px] text-purple-0'> <ReactTimeAgo date={comment.createdAt} /></span>
            </header>
            <main className=''>{comment.message}</main>
          </div>
          <div className='flex items-center justify-center'>
            <button
              type="button"
              className={clsx([
                'flex items-center cursor-pointer w-fit',
                comment.likedByMe && 'text-red-500',
              ])}
              onClick={handleToggleLike}
            >
              {comment.likedByMe ? (
                <HeartIcon width={16} height={16} />
              ) : (
                <HeartEmptyIcon width={16} height={16} />
              )}
              <p className="ml-2 text-purple-0">{comment.likeCount}</p>
            </button>
          </div>
        </div>
      </div>
      {isReplying && <CommentInput onMessageSubmit={handleAddCommentReply} />}
    </>
  );
};

export default CommentItem;
