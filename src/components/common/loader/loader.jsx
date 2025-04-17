import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Loader = ({ size = 'lg', message = '', className = '' }) => {
  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-center gap-2 py-4',
        className
      )}
    >
      <span className={`loading loading-bars loading-${size} text-primary`}></span>
      {message && (
        <p className="text-gray text-lg font-medium">{message}</p>
      )}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  message: PropTypes.string,
  className: PropTypes.string,
};

Loader.defaultProps = {
  size: 'lg',
  message: '',
  className: '',
};

export default Loader;