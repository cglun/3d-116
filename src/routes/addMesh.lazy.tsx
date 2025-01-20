import { createLazyFileRoute } from '@tanstack/react-router';
import Button from 'react-bootstrap/esm/Button';
import THEME, { getThemeColor } from '../app/config';
import { APP_COLOR } from '../type';
import { getScene } from '../three/init3d116';
import {
  AmbientLight,
  BoxGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
} from 'three/src/Three.Core.js';
import { updateScene } from '../component/Editor/OutlineView';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '../app/MyContext';

export const Route = createLazyFileRoute('/addMesh')({
  component: RouteComponent,
});

function RouteComponent() {
  const color = APP_COLOR.Dark;
  const { dispatchScene } = useContext(MyContext);
  function addBox() {
    // 创建立方体
    const cubeGeometry = new BoxGeometry(1, 1, 1);
    const cubeMaterial = new MeshLambertMaterial();
    const cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.name = 'cube1';
    cube.castShadow = true; // 立方体投射阴影

    const scene = getScene();
    scene.add(cube);
    dispatchScene({
      type: 'setScene',
      payload: scene,
    });
  }
  function addLight() {
    const scene = getScene();
    const light = new AmbientLight(0xffffff, 0.5);
    scene.add(light);
    dispatchScene({
      type: 'setScene',
      payload: scene,
    });
  }
  return (
    <div>
      <Button
        className="ms-2"
        variant={color}
        onClick={() => {
          const scene = getScene();
          const group = new Group();
          scene.add(group);
          dispatchScene({
            type: 'setScene',
            payload: scene,
          });
        }}
      >
        组
      </Button>
      <Button
        className="ms-2"
        variant={color}
        onClick={() => {
          addBox();
        }}
      >
        立方体
      </Button>
      <Button
        className="ms-2"
        variant={color}
        onClick={() => {
          addLight();
        }}
      >
        环境光
      </Button>
    </div>
  );
}
