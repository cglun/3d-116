import { Link, Outlet } from '@tanstack/react-router';

import { Nav } from 'react-bootstrap';
import { setClassName } from '../../app/utils';

export default function BottomNav() {
  return (
    <>
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
          <Link to="/" className="nav-link">
            <i className={setClassName('box')}></i> 模型列表
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/mark" className="nav-link">
            <i className={setClassName('pin-map')}></i> 点位标注
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/test" className="nav-link">
            <i className={setClassName('dash-circle')}></i> 待续
          </Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </>
  );
}
