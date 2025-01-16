import { createRootRoute } from '@tanstack/react-router';

import { Col, Container, Row } from 'react-bootstrap';

import { initToast, MyContext } from '../app/MyContext';

import OutlineView from '../component/Editor/OutlineView';
import Canvas3d from '../component/Editor/Canvas3d';
import EditorTop from '../component/Editor/EditorTop';
import BottomNav from '../component/Editor/BottomNav';
import ToastExample from '../component/ToastExample';

import React from 'react';
import reducerToast from '../app/reducer';
import { APP_COLOR } from '../type';
import AlertBase from '../component/AlertBase';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [toast, dispatchToast] = React.useReducer(reducerToast, initToast);
  document.title = '3D116';
  function getQueryParam(param: any) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  let viewType = getQueryParam('t');

  // if (viewType === 'editor') {
  //   viewType = 'editor';
  // } else {
  //   viewType = 'view';
  //   return <Canvas3d viewType={viewType} />;
  // }

  //开发环境
  if (import.meta.env.MODE === 'development') {
    viewType = 'editor';
  }

  if (viewType === 'view') {
    return <Canvas3d viewType={'view'} />;
  }
  if (viewType === 'editor') {
    return (
      <MyContext value={{ toast, dispatchToast }}>
        <Container fluid>
          <Row>
            <Col>
              <EditorTop />
            </Col>
          </Row>
          <Row>
            <Col xl={10} style={{ margin: 0, padding: 0 }}>
              <Row>
                <Col>
                  <Canvas3d viewType={viewType} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BottomNav />
                </Col>
              </Row>
            </Col>
            <Col xl={2} style={{ margin: 0, padding: 0 }}>
              <OutlineView></OutlineView>
            </Col>
          </Row>
        </Container>
        <ToastExample />
        {/* <ModalBase /> */}
      </MyContext>
    );
  }
  if (viewType === null) {
    return <AlertBase type={APP_COLOR.Warning} text={'参数为空'} />;
  }
  return <AlertBase type={APP_COLOR.Warning} text={'无啦'} />;
}
