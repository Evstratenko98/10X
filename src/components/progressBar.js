import React from 'react'

const ProgressBar = (props) => {
  const { completed } = props;

  const fillerStyles = {
    width: `${completed}%`,
  }

  return (
    <div className="containerStyles">
      <div className="fillerStyles" style={fillerStyles}>
      </div>
    </div>
  );
};

export default ProgressBar;