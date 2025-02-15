import React from 'react';
import styles from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className={`${styles.loader} dark:[background:#fff_50%_0,#fff_50%_100%,#fff_100%_50%,#fff_0_50%]`}></div>
    </div>
  );
};

export default Loader;