import { createLazyFileRoute } from '@tanstack/react-router';

import ListCard from '../component/ListCard';
import React from 'react';
import useFetch from '../app/hooks';
import { Spinner } from 'react-bootstrap';
import { HTTP_TYPE } from '../type';
export const Route = createLazyFileRoute('/')({
  component: ModelList,
});
function ModelList() {
  const [l, setL] = React.useState([
    {
      description: '',
      id: 386,
      name: '测试一测试a',
      projectId: 20,
      type: 'scene',
    },
    {
      description: '',
      id: 389,
      name: 'b 试一下',
      projectId: 20,
      type: 'scene',
    },
  ]);

  const { data, isLoading, error } = useFetch('type=Mesh', HTTP_TYPE.GET);

  return (
    <ListCard
      name={'模型'}
      data={data}
      action={'删除模型'}
      isLoading={isLoading}
      error={error}
    ></ListCard>
  );
}
