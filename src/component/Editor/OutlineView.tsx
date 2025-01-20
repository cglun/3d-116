import { getCamera, getScene, setScene } from '../../three/init3d116';
import { setClassName } from '../../app/utils';

import { SPACE } from '../../app/config';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Camera, Object3D } from 'three';
import ObjectProperty from './ObjectProperty';
import { getObjectNameByName } from '../../three/utils';
import TreeList from './TreeList';
import { MyContext } from '../../app/MyContext';
let _setChildren: any;
export function updateScene(scene: Object3D) {
  // const _children = getScene().children;
  // console.log(scene.children);
  // debugger;
  // _setChildren(scene.children);
}
export default function OutlineView() {
  let [curObj3d, setCurObj3d] = useState<Object3D>();
  const [camera, setCamera] = useState<Camera | any>();
  const { scene, dispatchScene } = useContext(MyContext);
  useEffect(() => {
    const _camera = getCamera();
    _camera.userData.isSelected = false;
    setCamera(_camera);

    const _scene = getScene();
    _scene.children = setD2(_scene.children);

    dispatchScene({
      type: 'setScene',
      payload: getScene(),
    });
  }, []);

  function cameraDiv() {
    if (camera && camera.isCamera) {
      return (
        <ListGroup.Item
          as={'button'}
          className={`d-flex justify-content-between ${camera.userData.isSelected ? 'text-warning' : ''} `}
          onClick={() => {
            const _camera = { ...camera };
            resetTextWarning(camera);
            setCamera(_camera);
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

  function resetTextWarning(
    targetItem: Object3D | any,
    _children = scene.payload.children,
  ) {
    if (targetItem.isCamera) {
      targetItem.userData.isSelected = !targetItem.userData.isSelected;
      setCamera(targetItem);
    } else {
      const _camera = { ...camera };
      _camera.userData.isSelected = false;
      setCamera(_camera);
    }
    if (_children === undefined) {
      return;
    }

    return _children.map((item) => {
      if (item.uuid === targetItem.uuid) {
        item.userData.isSelected = true;
      } else {
        item.userData.isSelected = false;
      }

      if (item.children.length > 0) {
        if (item.uuid === targetItem.uuid) {
          item.userData.isSelected = true;
        } else {
          item.userData.isSelected = false;
        }
        resetTextWarning(targetItem, item.children);
      }
      return item;
    });
  }

  function setD2(children: Object3D[], show = true) {
    return children.map((item) => {
      item.userData.show = show;

      if (item.children.length > 0) {
        setD2(item.children, false);
      }
      return item;
    });
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
                {scene.payload.children && (
                  <TreeList
                    setCurObj3d={setCurObj3d}
                    resetTextWarning={resetTextWarning}
                    data={scene.payload.children}
                  />
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
