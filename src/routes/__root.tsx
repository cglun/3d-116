import * as React from 'react';
import { createRootRoute } from '@tanstack/react-router';

import { Col, Container, Row } from 'react-bootstrap';

import { initState, MyContext } from '../MyContext';
import reducer from '../app/reducer';

import OutlineView from '../component/OutlineView';
import Canvas3d from '../component/Editor/Canvas3d';
import EditorTop from '../component/Editor/EditorTop';
import BottomNav from '../component/Editor/BottomNav';
import ToastExample from '../component/ToastExample';
import ModalBase from '../component/Modal/ModalBase';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [state, dispatch] = React.useReducer(reducer, initState);

  return (
    <MyContext value={{ state, dispatch }}>
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
                <Canvas3d></Canvas3d>
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
      <ModalBase />
    </MyContext>
  );
}
