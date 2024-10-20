import React from 'react';

const Switcher6 = ({ isChecked, handleCheckboxChange }) => {
  return (
    <>
      <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div className='box bg-primary block h-8 w-14 rounded-full'></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition  ${
              isChecked ? '!bg-white translate-x-full' : 'bg-black'
            }`
        }
          ></div>
        </div>
      </label>
    </>
  );
};

export default Switcher6;
