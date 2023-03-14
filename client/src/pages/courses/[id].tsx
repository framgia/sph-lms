import React from 'react';
import { useRouter } from 'next/router';

const CourseDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="container mx-auto border">
      <h1>Use this page as detail page</h1>
      <h2>Course ID: {id}</h2>
    </div>
  );
};

export default CourseDetails;
