import { useState, useContext } from 'react';
import { ModalContext } from '../../pages/Detail';
import { useBottomSheet } from '../../hooks/useBottomSheet';

import Comment from './Comment';
import Input from './Input';
import Background from './Background';

export default function Modal() {
  //   const reply = true;
  const [inputValue, setInputValue] = useState('');

  const { commentModalMode, setCommentModalMode } = useContext(ModalContext);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useBottomSheet(() => {
    setCommentModalMode(false);
  });
  // 댓글 목록
  const [comments, setComments] = useState([]);

  // 새로운 댓글
  const [newComment, setNewComment] = useState({ nickname: 'leelee', date: '2020년 10월 10일', content: '' });

  // 댓글 추가
  function addCommentHandler() {
    setComments([...comments, { ...newComment, content: inputValue }]);
    setNewComment({ ...newComment, content: '' });
    setInputValue('');
  }

  return (
    <div>
      <Background commentModalMode={commentModalMode} setCommentModalMode={setCommentModalMode} />
      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="w-full h-[76vh] bg-white absolute bottom-0 rounded-t-[20px] z-[10] animate-[bottom-sheet-up_200ms_ease-in-out] ">
          <div className="flex justify-center">
            <div className="w-1/6 h-[4px] bg-gray-3 rounded-[8px] mt-[16px]"></div>
          </div>
          <hr className="border-gray-3 mt-[64px] mb-[18px]" />
          <div className="w-full h-[312px] overflow-scroll scrollbar-hide">
            {comments.length === 0 ? (
              <p className="text-[14px] text-gray-1 text-center">작성된 댓글이 없습니다.</p>
            ) : (
              comments.map((comment, index) => (
                <Comment key={index} nickname={comment.nickname} date={comment.date} content={comment.content} />
              ))
            )}
          </div>
          <Input
            className={'absolute bottom-[28px] w-full'}
            inputValue={inputValue}
            addCommentHandler={addCommentHandler}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </div>
  );
}