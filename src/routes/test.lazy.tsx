import { createLazyFileRoute } from '@tanstack/react-router';
import { Button } from 'react-bootstrap';
import scene from '../three/threeInit';
import { getThemeColor } from '../app/config';

export const Route = createLazyFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  const handleTest = () => {
    const sceneJson = scene.toJSON();

    localStorage.setItem('scene', JSON.stringify(sceneJson));
  };

  return (
    <Button onClick={handleTest} variant={getThemeColor()}>
      测试
    </Button>
  );
}
