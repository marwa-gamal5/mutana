import React from 'react';
import image from '../../img/404.png';

function NotFound() {
  return (
    <div>
      <img src={image} alt="Page not found" />
    </div>
  );
}

export default NotFound;