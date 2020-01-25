import React from 'react';
import './commentSection.style.scss';

const CommentSection = (props) => {
  const { comments, window } = props;

  const comArr = [];
  let commentArea;

  if (comments.length < 1) {
    commentArea = null;
  } else {
    for (let i = comments.length - 1; i >= 0; i--) {
      comArr.push(comments[i]);
    }
    commentArea = comArr.map((comment) => (
      <p className={window === 'window1' ? 'speechBubble1' : 'speechBubble2'}>{comment.comment}</p>
    ));
  }

  return <div className="commentWrapper">{commentArea}</div>;
};
export default CommentSection;
