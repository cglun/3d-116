import React, { useContext } from 'react';

import test from '../../public/images/test.png';

import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  Spinner,
  Toast,
} from 'react-bootstrap';
import ModalBase from './Modal/ModalBase';
import AlertBase from './AlertBase';
import { ACTION_TYPE, APP_COLOR, DELAY, HTTP_TYPE } from '../type';
import { getThemeColor } from '../app/config';
import { setClassName } from '../app/utils';
import { MyContext } from '../MyContext';

interface List {
  name: string;
  action: string;
  isLoading: boolean;
  error: any;
  data: any;
}

interface Options {
  id: number;
  projectId: number;
  name: string;
}
export default function ListCard(list: List) {
  if (list.isLoading) {
    return <Spinner animation="grow" />;
  }
  if (list.error) {
    console.error(list.error.message);
    return AlertBase(APP_COLOR.Danger, '查看控制台');
  }

  if (list.data === null) {
    return <div className="px-2"> {list.name}为空 </div>;
  }

  return (
    <div className="d-flex flex-wrap">
      {list.data.map((item: Options, index: number) => {
        return Item(item, index, 8);
      })}
    </div>
  );
}
function Item(options: Options, index: number, width: number) {
  function editorSource() {}
  const { state, dispatch } = useContext(MyContext);
  const { modal } = state;
  function deleteObj() {
    dispatch({
      type: 'modal',
      modal: {
        title: '删除',
        show: true,
        body: '名称：' + options.name,
        action: {
          targetId: options.id,
          type: ACTION_TYPE.DELETE,
        },
      },
    });
  }
  return (
    <div key={index}>
      <Card style={{ width: `${width}rem` }} className="ms-2 mt-2">
        <Card.Header title={options.name}>{options.name}</Card.Header>
        <Card.Body className="d-flex flex-column  align-items-center">
          <Card.Img src={test} variant="top" />

          <ButtonGroup aria-label="Basic example" className="mt-2">
            <Button
              variant={getThemeColor()}
              size="sm"
              onClick={() => editorSource()}
            >
              <i className={setClassName('pencil')} title="编辑"></i>
            </Button>
            <Button
              variant={getThemeColor()}
              size="sm"
              onClick={() => {
                deleteObj();
                console.log('删除ID:' + options.name);
              }}
            >
              <i className={setClassName('trash')} title="删除"></i>
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
