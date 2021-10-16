import React from 'react';
import styled from '@styles/FinishedForgotPassword.module.css';

const SuccessCheck = () => {
  return (
    <div className={styled.successAnimation}>
      <svg
        className={styled.checkmark}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className={styled.checkmark__circle}
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className={styled.checkmark__check}
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
};

export default SuccessCheck;
