import { getCamera, getCube, getScene } from '../../three/threeInit';
import { setClassName } from '../../app/utils';

import { getThemeColor, SPACE } from '../../app/config';
import {
  Accordion,
  Button,
  Card,
  Form,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Object3D } from 'three';
import ObjectProperty from './ObjectProperty';
import { getObjectNameByName } from '../../three/utils';
import TreeList from './TreeList';

let lastSelectDiv: (EventTarget & Element) | null = null;
export default function OutlineView() {
  let [children, setChildren] = useState<Object3D[]>();
  let [curObj3d, setCurObj3d] = useState<Object3D>();
  //  let curObj3d: Object3D | null = null;

  const treeData = [
    {
      id: 1,
      name: 'Node 1',
      children: [
        {
          id: 2,
          name: 'Node 1.1',
          children: [
            {
              id: 3,
              name: 'Node 1.1.1',
            },
          ],
        },
        {
          id: 4,
          name: 'Node 1.2',
        },
      ],
    },
    {
      id: 5,
      name: 'Node 2',
      children: [
        {
          id: 6,
          name: 'Node 2.1',
        },
      ],
    },
  ];

  useEffect(() => {
    const _children = getScene().children;

    setChildren(setD2(_children));
  }, []);

  function cameraDiv() {
    const camera = getCamera();

    if (camera && camera.isCamera) {
      return (
        <ListGroup.Item
          as={'button'}
          className=" d-flex justify-content-between"
          onClick={(e) => {
            if (lastSelectDiv !== null) {
              lastSelectDiv.classList.remove('text-warning');
            }
            const curSel = e.currentTarget;
            curSel.classList.add('text-warning');
            lastSelectDiv = curSel;
            setCurObj3d(camera);
          }}
        >
          <div>
            <i className={setClassName('camera-reels')}></i>
            {SPACE}
            {getObjectNameByName(camera)}
          </div>
        </ListGroup.Item>
      );
    }
  }

  return (
    <Accordion defaultActiveKey={['0', '1']} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <i className={setClassName('archive')}></i>
          <span className="px-2">大纲视图</span>
        </Accordion.Header>
        <Accordion.Body className="outline-view">
          <Card>
            <Card.Header className="text-center">相机</Card.Header>
            <Card.Body>
              <ListGroup>{cameraDiv()}</ListGroup>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header className="text-center">网格</Card.Header>
            <Card.Body>
              <ListGroup className="da-gang">
                {children && (
                  <TreeList data={children} setCurObj3d={setCurObj3d} />
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Accordion.Body>
      </Accordion.Item>

      <ObjectProperty curObj3d={curObj3d} />
    </Accordion>
  );
}
export function setD2(children, show = true, isOpen = true) {
  return children.map((item) => {
    item.userData.show = show;
    item.userData.isOpen = isOpen;
    if (item.children.length > 0) {
      item.userData.isOpen = false;
      setD2(item.children, false);
    }
    return item;
  });
}
