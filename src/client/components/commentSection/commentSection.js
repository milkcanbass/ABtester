import React from 'react';
import './commentSection.style.scss';

const CommentSection = (props) => {
  const { comments, window } = props;

  const comArr = [];

  for (let i = comments.length - 1; i >= 0; i--) {
    comArr.push(comments[i]);
  }

  return (
    <div className="commentWrapper">
      {comArr.map((comment) => (
        <div className={window === 'window1' ? 'speechBubble1' : 'speechBubble2'}>
          {comment.comment}
        </div>
      ))}
    </div>
  );
};
export default CommentSection;
