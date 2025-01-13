import { createLazyFileRoute } from '@tanstack/react-router';

import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { setClassName } from '../app/utils';
import { getThemeColor } from '../app/config';

export const Route = createLazyFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  // const handleTest = () => {
  //   const sceneJson = scene.toJSON();

  //   localStorage.setItem('scene', JSON.stringify(sceneJson));
  // };

  return (
    // <Button onClick={handleTest} variant={getThemeColor()}>
    //   测试
    // </Button>
    <ListGroup>
      <ListGroupItem>
        <a href="https://github.com/cglun/3d-116" target="_blank">
          <Button variant={getThemeColor()}>
            <i className="bi bi-github"></i> 源代码
          </Button>
        </a>
        <a href="https://3d.oklun.com" className="ms-2" target="_blank">
          <Button variant={getThemeColor()}>
            <i className={setClassName('eye')}></i> 预览APP
          </Button>
        </a>
      </ListGroupItem>
      <ListGroupItem></ListGroupItem>
    </ListGroup>
  );
}
