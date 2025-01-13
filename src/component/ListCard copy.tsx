import { memo, useState } from 'react';

import { Button, ButtonGroup, Card, Container, Spinner } from 'react-bootstrap';

import AlertBase from './AlertBase';

import { getThemeColor } from '../app/config';
import { setClassName } from '../app/utils';
import { APP_COLOR, DELAY } from '../type';
import Toast3d, { Toast, ToastDefault } from './Toast3d';
import ModalConfirm3d, {
  ModalConfirm,
  ModalConfirmDefault,
} from './Modal/ModalConfirm3d';

interface List {
  id: 8;
  name: '场景8';
  type: '场景';
  desc: '这是一个场景';
}

interface Options {
  id: number;
  name: string;
  type: string;
  desc: string;
}

function ListCard({ list, setList, getType }) {
  const { isLoading, error } = getType;
  if (isLoading) {
    return <Spinner animation="grow" />;
  }
  if (error) {
    console.error(error);
    return <AlertBase type={APP_COLOR.Danger} text={'查看控制台'} />;
  }

  if (list === null) {
    return <AlertBase type={APP_COLOR.Warning} text={'无数据'} />;
  }
  // setList([
  //   {
  //     id: 1,
  //     name: '模型1',
  //     type: '模型',
  //     desc: '这是一个场景',
  //   },
  // ]);

  return (
    <Container fluid className="d-flex flex-wrap">
      {list.map((options: Options, index: number) => {
        return Item(options, index, list, setList);
      })}
    </Container>
  );
}
export default memo(ListCard);

function Item(options: Options, index: number, list: any, setList: any) {
  const [modalConfirm, setModalConfirm] = useState<ModalConfirm>({
    ...ModalConfirmDefault,
  });
  const [toast, setToast] = useState<Toast>({ ...ToastDefault });

  function deleteBtn(options: Options) {
    setModalConfirm({
      ...ModalConfirmDefault,
      title: `删除${options.type}`,
      content: `${options.name}`,
      type: APP_COLOR.Danger,
      show: true,
      onOk: () => {
        setToast({
          ...ToastDefault,
          title: '提示',
          content: `${options.name}-删除成功`,
          type: APP_COLOR.Success,
          delay: DELAY.SHORT,
          show: true,
        });
        debugger;
        // const newData = list.filter((item: any) => item.id !== options.id);
        //  const newData = (list[0].name = 'sb');
        //const b = list.filter((item: any) => item.id !== options.id);
        //const c = list.slice(0, 1);
        setList([
          {
            id: 1,
            name: '模型1',
            type: '模型',
            desc: '这是一个场景',
          },
        ]);

        setModalConfirm({
          ...ModalConfirmDefault,
          show: false,
        });
      },
    });
  }
  return (
    <div key={index}>
      <Card className="ms-2 mt-2">
        <Card.Header title={options.name}>{options.name}</Card.Header>
        <Card.Body className="d-flex flex-column ">
          <Card.Img src={'/assets/images/test.png'} variant="top" />
          <ButtonGroup aria-label="Basic example" className="mt-2">
            <Button
              variant={getThemeColor()}
              size="sm"
              onClick={() => {
                console.log('预览ID:' + options.name);
              }}
            >
              <i className={setClassName('pencil')} title="编辑"></i>
            </Button>
            <Button
              variant={getThemeColor()}
              size="sm"
              onClick={() => deleteBtn(options)}
            >
              <i className={setClassName('trash')} title="删除"></i>
            </Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
      <ModalConfirm3d
        modalConfirm={{ ...modalConfirm }}
        setModalConfirm={setModalConfirm}
      ></ModalConfirm3d>

      <Toast3d toast={{ ...toast }} setToast={setToast}></Toast3d>
    </div>
  );
}
