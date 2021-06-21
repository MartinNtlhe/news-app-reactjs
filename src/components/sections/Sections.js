import React, { Fragment } from 'react';
import Articles from './Articles/Articles';
const sections = () => {
  return (
    <Fragment>
      <Articles loading={true}/>
    </Fragment>
  );
};

export default sections;
