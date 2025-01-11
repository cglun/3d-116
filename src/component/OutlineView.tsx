import { getCamera, getScene } from '../three/threeInit';
import { setClassName } from '../app/utils';
import * as THREE from 'three';
import { SPACE } from '../app/config';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function OutlineView() {
  type sceneType = THREE.Object3D<THREE.Object3DEventMap>[];
  const [sceneList, setSceneList] = useState<sceneType>();

  useEffect(() => {
    const children = getScene().children;

    setSceneList(children);
  }, []);

  function getLogo(item: any) {
    let logo = 'hexagon';
    if (item.isMesh) {
      logo = 'box';
    }

    if (item.isGroup) {
      logo = 'collection';
    }

    if (item.isLight) {
      logo = 'lightbulb';
    }
    return <i className={setClassName(logo)}></i>;
  }

  function Menu(sceneList: sceneType, show: string) {
    return sceneList.map((item, index) => {
      return (
        <ListGroupItem
          key={index}
          style={{ display: show, cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();

            //展开
            if (item.children.length > 0) {
              const current = e.currentTarget.children[1];

              const expandButton =
                e.currentTarget.children[0].children[1].children[0];

              {
                current.getAttribute('style')?.includes('display:block')
                  ? current.setAttribute('style', 'display:none')
                  : current.setAttribute('style', 'display:block');
              }
              {
                expandButton
                  .getAttribute('class')
                  ?.includes('bi bi-plus-square')
                  ? expandButton.setAttribute(
                      'class',
                      setClassName('dash-square'),
                    )
                  : expandButton.setAttribute(
                      'class',
                      setClassName('plus-square'),
                    );
              }

              // current.setAttribute('style', 'display:block');
            }
          }}
        >
          <div className="d-flex justify-content-between">
            <div>
              {getLogo(item)} {SPACE}
              {item.name.trim().length === 0 ? item.type : item.name}
            </div>
            <div>
              {item.children.length > 0 && (
                <i className={setClassName('plus-square')}></i>
              )}
            </div>
          </div>
          {item.children.length > 0 && Menu(item.children, 'none')}
        </ListGroupItem>
      );
    });
  }
  function cameraDiv() {
    const camera = getCamera();
    if (camera && camera.isCamera) {
      return (
        <ListGroup.Item
          as={'button'}
          className=" d-flex justify-content-between "
        >
          <div>
            <i className={setClassName('camera-reels')}></i>
            {SPACE}相机
          </div>
        </ListGroup.Item>
      );
    }
  }

  return (
    <Card className="mx-auto my-card-body">
      <Card.Header>
        <h5>
          <i className={setClassName('archive')}></i>
          {SPACE}大纲视图
        </h5>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {cameraDiv()}
          {sceneList && Menu(sceneList, 'block')}
        </ListGroup>
        <Card className="mt-3">
          <Card.Header>
            <h5>
              <i className={setClassName('menu-button')}></i>
              {SPACE}属性
            </h5>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroupItem>ff</ListGroupItem>
              <ListGroupItem>ff</ListGroupItem>
              <ListGroupItem>ff</ListGroupItem>
              <ListGroupItem>ff</ListGroupItem>
              <ListGroupItem>ff</ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
}
