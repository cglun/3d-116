import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Dropdown,
  InputGroup,
  Form,
  Offcanvas,
} from 'react-bootstrap';
import * as THREE from 'three';

import { setClassName } from '../../app/utils';
import { getThemeColor, initThemeColor, setThemeColor } from '../../app/config';
import { addCube, getCamera, getScene, setScene } from '../../three/threeInit';
import { ACTION_TYPE, APP_COLOR, DELAY, HTTP_TYPE } from '../../type';
import { MyContext } from '../../MyContext';
import ListCard from '../ListCard';
import useFetch from '../../app/hooks';

export default function EditorTop() {
  initThemeColor();
  const themeColor = getThemeColor();
  //打开场景列表
  const [showScene, setShowScene] = useState(false);
  const handleClose = () => setShowScene(false);
  const handleShow = () => setShowScene(true);

  const [appTheme, setAppTheme] = useState(themeColor);

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
  function setTheme(color: string) {
    document.body.setAttribute('data-bs-theme', color);
    localStorage.setItem('app_theme', color);
    setThemeColor(color);
    setAppTheme(color);
  }
  const { data, error, isLoading } = useFetch('type=Scene', HTTP_TYPE.GET);
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
          <Button variant={themeColor} size="sm" onClick={handleShow}>
            <i className={setClassName('bi me-1 bi-badge-3d')}></i>切换场景
          </Button>
        </Col>

        <Col className="d-flex justify-content-end">
          <ButtonGroup aria-label="Basic example">
            <Button
              variant={themeColor}
              size="sm"
              onClick={() => {
                localStorage.removeItem('camera');
                localStorage.removeItem('scene');
                setScene(new THREE.Scene());
              }}
            >
              <i className={setClassName('plus-square')}></i> 新场景
            </Button>
            <Button
              variant={themeColor}
              size="sm"
              onClick={() => {
                saveScene();
              }}
            >
              <i className={setClassName('floppy')}></i> 保存场景
            </Button>
            <Button
              variant={themeColor}
              size="sm"
              onClick={() => {
                saveAsNewScene();
              }}
            >
              <i className={setClassName('floppy2')}></i> 场景另存
            </Button>
            <Button variant={themeColor} size="sm">
              <i className={setClassName('dash-circle')}></i> 待续
            </Button>
          </ButtonGroup>
          <>
            <Dropdown className="d-inline mx-2 ">
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                variant={themeColor}
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
