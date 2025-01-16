import React, { useState } from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import { setClassName } from '../../app/utils';
import { getObjectNameByName } from '../../three/utils';
import { SPACE } from '../../app/config';
import ModalConfirm3d, {
  ModalConfirm,
  ModalConfirmDefault,
} from '../Modal/ModalConfirm3d';
import { APP_COLOR } from '../../type';
import AlertBase from '../AlertBase';

const TreeNode = ({ node, setCurObj3d, onToggle }) => {
  const hasChildren = node.children && node.children.length > 0;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [delBtn, setDelBtn] = React.useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);

    setCurObj3d(node);
    onToggle(node.uuid, !isExpanded);
  };
  const [modalConfirm, setModalConfirm] = useState<ModalConfirm>({
    ...ModalConfirmDefault,
  });
  const [modalBody, setModalBody] = useState(
    <AlertBase type={APP_COLOR.Warning} text={'删除'} />,
  );

  const delMesh = (e, item) => {
    e.stopPropagation();
    e.preventDefault();
    setModalBody(
      <AlertBase type={APP_COLOR.Warning} text={getObjectNameByName(item)} />,
    );
    setModalConfirm({
      ...ModalConfirmDefault,
      title: `删除`,
      content: getObjectNameByName(item),
      show: true,
      onOk: () => {
        setModalConfirm({
          ...ModalConfirmDefault,
          show: false,
        });
      },
    });
  };
  function getLogo(item: any) {
    let logo = 'hexagon';
    if (item.isMesh) logo = 'box';

    if (item.isGroup) logo = 'collection';

    if (item.isLight) logo = 'lightbulb';

    return <i className={setClassName(logo)}></i>;
  }

  const light = `d-flex justify-content-between ${isExpanded ? 'text-warning' : ''}`;
  return (
    <>
      <ListGroupItem>
        <div
          className={light}
          onClick={handleToggle}
          onMouseEnter={() => setDelBtn(true)}
          onMouseLeave={() => setDelBtn(false)}
        >
          <div>
            {getLogo(node)} {SPACE}
            {getObjectNameByName(node)}
          </div>
          <div>
            {delBtn ? (
              <Button
                size="sm"
                variant={APP_COLOR.Dark}
                className="me-1"
                onClick={(e) => delMesh(e, node)}
              >
                <i className={setClassName('trash')}></i>
              </Button>
            ) : (
              ''
            )}
            {hasChildren ? (
              isExpanded ? (
                <i className={setClassName('dash-square')}></i>
              ) : (
                <i className={setClassName('plus-square')}></i>
              )
            ) : (
              ''
            )}
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div>
            {node.children.map((child) => (
              <TreeNode
                key={child.uuid}
                node={child}
                setCurObj3d={setCurObj3d}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}
      </ListGroupItem>
      <ModalConfirm3d
        modalConfirm={modalConfirm}
        setModalConfirm={setModalConfirm}
      >
        {modalBody}
      </ModalConfirm3d>
    </>
  );
};

const TreeList = ({ data, setCurObj3d }) => {
  return (
    <>
      {data.map((node) => (
        <TreeNode
          key={node.uuid}
          node={node}
          onToggle={() => {}}
          setCurObj3d={setCurObj3d}
        />
      ))}
    </>
  );
};

export default TreeList;
