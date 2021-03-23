import React from 'react';

const LayoutSign = ({component: Component, ...props}) => {
  return (
    <div>
      <Component/>
    </div>
  );
};

export default LayoutSign;