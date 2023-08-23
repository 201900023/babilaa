import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
interface CommentInputProps {
  onMessageSubmit: (message: string) => void;
}

const CommentInput = ({ onMessageSubmit }: CommentInputProps) => {
  const { data } = useSession();
  const [commentMessageValue, setCommentMessageValue] = useState('');
  const textareaRef = useRef<HTMLInputElement | null>(null);

  const submitDisabled = !commentMessageValue.length;

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitDisabled) return;
    onMessageSubmit(commentMessageValue);
    setCommentMessageValue('');
  };

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = '0px';
    const { scrollHeight } = textareaRef.current;
    textareaRef.current.style.height = `${scrollHeight}px`;
  }, [commentMessageValue]);

  const me = data?.user!;

  return (
    <form
      className="w-full grid grid-cols-[4fr_1fr] rounded-lg my-5 "
      onSubmit={handleOnSubmit}
    >

      <input

        ref={textareaRef}
        placeholder="Enter your comment..."
        value={commentMessageValue}
        onChange={({ target }) => setCommentMessageValue(target.value)}
        className='border-2  py-4 px-2 rounded-md placeholder:text-purple-0' type="text" />

      <button className='font-bold text-purple-0' type='submit' disabled={submitDisabled}>Post</button>

    </form>
  );
};

export default CommentInput;
