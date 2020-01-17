import React, { Fragment } from 'react';
import './TopPage.styles.scss';

const TopPage = () => {
  const webApi = 'https://swapi.co/api/people/1';

  const fetchTest = async () => {
    const res = await fetch(webApi);
    const data = await res.json();
  };

  fetchTest();

  return (
    <>
      <div className="hello">Hello</div>
      <div className="test" />
    </>
  );
};
export default TopPage;
