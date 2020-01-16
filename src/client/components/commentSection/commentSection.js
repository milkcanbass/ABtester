import React from 'react';

const CommentSection = (props) => {
  const { comments } = props;

  const comArr = [];

  for (let i = comments.length - 1; i >= 0; i--) {
    comArr.push(comments[i]);
  }

  return comArr.map((comment) => <div>{comment.comment}</div>);
};
export default CommentSection;
