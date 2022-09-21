import { FC } from 'react';
import { IErrorResponse } from '@/models/response/IErrorResponse';
import { useFetchUsersQuery } from '@/services/usersService';

export const Users: FC = () => {
  const { data, error } = useFetchUsersQuery();

  if (error) {
    const { data } = error as IErrorResponse;

    return <p>{data.message}</p>;
  }

  return (
    <div>
      {data?.map(user => (
        <p key={user.id}>{user.email}</p>
      ))}
    </div>
  );
};
