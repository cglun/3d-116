import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  ButtonGroup,
  Offcanvas,
  InputGroup,
  Form,
  Dropdown,
  Badge,
} from 'react-bootstrap';

import {
  addCube,
  camera,
  createScene,
  getCamera,
  getScene,
  renderer,
  setCamera,
  setScene,
} from '../../three/threeInit';
import { DELAY, HTTP_TYPE, APP_COLOR, ACTION_TYPE } from '../../type';
import ToastExample from '../../component/ToastExample';
import ListCard from '../../component/ListCard';
import useFetch from '../../app/hooks';
import { MyContext } from '../../MyContext';
import ModalBase from '../../component/Modal/ModalBase';

import { ObjectLoader } from 'three';
import {
  getThemeColor,
  initThemeColor,
  setThemeColor,
  SPACE,
} from '../../app/config';
import { setClassName } from '../../app/utils';
import OutlineView from '../../component/OutlineView';

export default function Editor() {
  document.title = '3D编辑器';
  initThemeColor();
  const tc116 = getThemeColor();
  const [appTheme, setAppTheme] = useState(tc116);

  function setTheme(color: string) {
    document.body.setAttribute('data-bs-theme', color);
    localStorage.setItem('app_theme', color);
    setThemeColor(color);
    setAppTheme(color);
  }

  const canvas: React.RefObject<HTMLDivElement> = useRef<any>({});
  useEffect(() => {
    const s = localStorage.getItem('scene');
    const c = localStorage.getItem('camera');

    if (canvas.current !== null) {
      if (s && c) {
        createScene(canvas.current);

        setScene(new ObjectLoader().parse(JSON.parse(s)));

        setCamera(new ObjectLoader().parse(JSON.parse(c)));
      } else {
        createScene(canvas.current);
        addCube();
      }

      window.addEventListener('resize', onWindowResize);
    }
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  function onWindowResize() {
    if (canvas.current !== null) {
      camera.aspect = canvas.current.offsetWidth / canvas.current.offsetHeight; // 设置相机的宽高比和视口的宽高比一致
      camera.updateProjectionMatrix(); // 更新相机的投影矩阵
      renderer.setSize(canvas.current.offsetWidth, canvas.current.offsetHeight); // 更新渲染器的大小
    }
  }

  const { data, error, isLoading } = useFetch('type=Scene', HTTP_TYPE.GET);

  //打开场景列表
  const [showScene, setShowScene] = useState(false);
  const handleClose = () => setShowScene(false);
  const handleShow = () => setShowScene(true);

  const { dispatch } = useContext(MyContext);
  function saveScene() {
    const sceneJson = getScene().toJSON();
    const c = getCamera().toJSON();

    localStorage.setItem('scene', JSON.stringify(sceneJson));
    localStorage.setItem('camera', JSON.stringify(c));
    dispatch({
      type: 'toast',
      toast: {
        title: '场景',
        content: '场景已保存',
        type: APP_COLOR.Success,
        delay: DELAY.MIDDLE,
        show: true,
      },
    });
  }

  function saveAsNewScene() {
    dispatch({
      type: 'modal',
      modal: {
        title: '保存场景',
        show: true,
        body: (
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">名称</InputGroup.Text>
            <Form.Control
              placeholder="名称"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        ),
        action: {
          targetId: 0,
          type: ACTION_TYPE.ADD,
        },
      },
    });
  }

  return (
    <>
      <Row>
        <Col>
          <Button variant={tc116} size="sm" onClick={handleShow}>
            <i className={setClassName('bi me-1 bi-badge-3d')}></i>切换场景
          </Button>
        </Col>

        <Col className="d-flex justify-content-end">
          <ButtonGroup aria-label="Basic example">
            <Button
              variant={tc116}
              size="sm"
              onClick={() => {
                saveScene();
              }}
            >
              <i className={setClassName('floppy')}></i> 保存场景
            </Button>
            <Button
              variant={tc116}
              size="sm"
              onClick={() => {
                saveAsNewScene();
              }}
            >
              <i className={setClassName('floppy2')}></i> 场景另存
            </Button>

            <Button variant={tc116} size="sm">
              <i className={setClassName('dash-circle')}></i> 待续
            </Button>
          </ButtonGroup>
          <>
            <Dropdown className="d-inline mx-2 ">
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                variant={tc116}
                size="sm"
              >
                {appTheme === 'light' ? (
                  <i className={setClassName('sun')}></i>
                ) : (
                  <i className={setClassName('moon-stars')}></i>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setTheme('light');
                  }}
                >
                  <i className={setClassName('sun')}></i>白天
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setTheme('dark');
                  }}
                >
                  <i className={setClassName('moon-stars')}></i>黑夜
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        </Col>
      </Row>
      <Row>
        <Col
          xl={10}
          ref={canvas}
          style={{ height: '70vh', width: '86vw' }}
        ></Col>
        <Col>导航</Col>
      </Row>

      <Row>
        <Col xl={2} style={{ height: '70vh', width: '10vw' }} className="ms-1">
          <Card>
            <Card.Header>
              <Badge bg="secondary">
                <i className={setClassName('archive')}></i>
                {SPACE}大纲视图
              </Badge>
            </Card.Header>
            <Card.Body className="my-card-body">
              <OutlineView />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastExample />
      <ModalBase />
      <Offcanvas show={showScene} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <i className={setClassName('badge-3d')}></i> 所有场景
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListCard
            name={'场景'}
            data={data}
            action={'删除'}
            isLoading={isLoading}
            error={error}
          ></ListCard>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
