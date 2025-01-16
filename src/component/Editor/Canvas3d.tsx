import React, { useEffect, useRef } from 'react';
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
import { ObjectLoader } from 'three/src/loaders/ObjectLoader.js';

import { runScript } from '../../three/scriptDev';

export default function Canvas3d({ viewType = 'editor' }) {
  const canvas: React.RefObject<HTMLDivElement> = useRef<any>({});
  useEffect(() => {
    const s = localStorage.getItem('scene');
    const c = localStorage.getItem('camera');

    if (canvas.current !== null) {
      if (s && c) {
        createScene(canvas.current);

        setScene(new ObjectLoader().parse(JSON.parse(s)));

        setCamera(new ObjectLoader().parse(JSON.parse(c)));
        const camera = getCamera();
        const scene = getScene();
        if (import.meta.env.MODE === 'development') {
          runScript({ camera: camera, scene: scene });
        }
        eval(`
  const cube = scene.getObjectByName('cube');
  if (cube !== undefined) { 
  cube.position.z+= 2;
    setInterval(() => {
      cube.rotation.y += 0.5;
     
    }, 50);
  }
`);
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
  if (viewType === 'editor') {
    return <div style={{ height: '70vh' }} ref={canvas}></div>;
  }
  return <div style={{ height: '100vh', width: '100vw' }} ref={canvas}></div>;
}
