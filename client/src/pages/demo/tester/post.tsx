/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

const TestPostAPI: React.FunctionComponent = () => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const data = {
      title: 'Course 20',
      description: 'Course 20 description',
      created_by: 1,
      course_category: 2
    };

    const response = await fetch('http://localhost:8000/api/course/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    console.log(result);
  };

  return (
    <div className='container border mx-auto'>
      working
      <div className='m-2 border'>
        <form onSubmit={handleSubmit}>
          <button type='submit'>Submits</button>
        </form>
      </div>
    </div>
  );
};

export default TestPostAPI;
