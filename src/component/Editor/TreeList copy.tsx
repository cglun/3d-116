import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { Object3D, Object3DEventMap, Scene } from 'three/src/Three.js';
import { setClassName } from '../../app/utils';
import { getObjectNameByName } from '../../three/utils';
import { SPACE } from '../../app/config';
import { setD1 } from './OutlineView';

export function TreeList({
  children,
  setChildren = new Scene().children,
  setCurObj3d,
  lastSelectDiv,
}: {
  children: Object3D[];
  setChildren: Object3D[] | any;
  setCurObj3d: Object3D | any;
  lastSelectDiv: any;
}) {
  function getLogo(item: any) {
    let logo = 'hexagon';
    if (item.isMesh) logo = 'box';

    if (item.isGroup) logo = 'collection';

    if (item.isLight) logo = 'lightbulb';

    return <i className={setClassName(logo)}></i>;
  }

  return children.map((item, index) => {
    return (
      item.userData.show && (
        <ul key={index}>
          <li
            className={item.userData.show ? 'show' : 'hide'}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log(item);

              //setChildren();
            }}
          >
            {getObjectNameByName(item)}
            {item.children.length > 0 && (
              <TreeList
                children={item.children}
                setChildren={setChildren}
                setCurObj3d={setCurObj3d}
                lastSelectDiv={lastSelectDiv}
              />
            )}
          </li>
        </ul>
      )
    );
  });
}
