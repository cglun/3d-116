import React from 'react';
import { createRootRoute } from '@tanstack/react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { initToast, MyContext } from '../app/MyContext';
import OutlineView from '../component/Editor/OutlineView';
import Canvas3d from '../component/Editor/Canvas3d';
import EditorTop from '../component/Editor/EditorTop';
import BottomNav from '../component/Editor/BottomNav';
import ToastExample from '../component/ToastExample';
import reducerToast from '../app/reducer';
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [toast, dispatchToast] = React.useReducer(reducerToast, initToast);
  document.title = '3D116';
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
                <Canvas3d />
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
    </MyContext>
  );
}
