import React, { useEffect, useRef } from 'react';
import {
  addCube,
  camera,
  createScene,
  renderer,
  setCamera,
  setScene,
} from '../../three/threeInit';
import { ObjectLoader } from 'three/src/loaders/ObjectLoader.js';

export default function Canvas3d() {
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

  return <div style={{ height: '70vh' }} ref={canvas}></div>;
}
