import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const ExerciseList: FC = () => {
  const { pathname } = useLocation();
  const [, type, level] = pathname.split('/');

  return (
    <div>
      {type}, {level}
    </div>
  );
};
