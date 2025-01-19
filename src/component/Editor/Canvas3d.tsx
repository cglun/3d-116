import React, { useEffect, useRef } from 'react';

import { init3d } from '../../three/utils';

export default function Canvas3d() {
  const canvas3d: React.RefObject<HTMLDivElement> = useRef<any>({});

  useEffect(() => {
    init3d(canvas3d);
  }, []);

  return <div style={{ height: '70vh' }} ref={canvas3d}></div>;
}
