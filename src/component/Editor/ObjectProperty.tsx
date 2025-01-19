import { useState } from 'react';
import { Accordion, Card, Form, InputGroup } from 'react-bootstrap';
import { Euler, Object3D, Vector3 } from 'three';
import { setClassName } from '../../app/utils';

import { getObjectNameByName } from '../../three/utils';
/**
 * 物体属性
 * @returns
 */

export default function ObjectProperty({
  curObj3d,
}: {
  curObj3d: Object3D | any;
}) {
  return (
    curObj3d && (
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <i className={setClassName('menu-button')}></i>
          <span className="px-2 ellipsis-3d">
            属性-{getObjectNameByName(curObj3d)}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          <Object3dInput
            transform={curObj3d.position}
            title={'位置'}
          ></Object3dInput>
          <Object3dInput
            transform={curObj3d.rotation}
            title={'旋转'}
          ></Object3dInput>
          <Object3dInput
            transform={curObj3d.scale}
            title={'缩放'}
          ></Object3dInput>
        </Accordion.Body>
      </Accordion.Item>
    )
  );
}

function isScale(title: string) {
  return '缩放' === title ? true : false;
}

function Object3dInput({
  transform,
  title = '位置',
}: {
  transform: Vector3 | Euler;
  title?: string;
}) {
  const [checked, setChecked] = useState(true);
  const [lockValue, setLockValue] = useState(0);
  const _isScale = isScale(title);
  function setValue(value: number) {
    if (checked && _isScale) {
      setLockValue(value);
      transform.x = value;
      transform.y = value;
      transform.z = value;
      return;
    }
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between">
        <span>{title}</span>
        {_isScale && (
          <Form>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            />
          </Form>
        )}
      </Card.Header>
      <Card.Body className="d-flex">
        <InputGroup size="sm">
          <InputGroup.Text>X</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder={transform.x.toString()}
            type="number"
            title={transform.x.toString()}
            onChange={(e) => {
              setValue(parseInt(e.target.value));
              transform.x = parseInt(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup size="sm">
          <InputGroup.Text>Y</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder={transform.y.toString()}
            type="number"
            disabled={_isScale && checked}
            title={
              _isScale && checked
                ? lockValue.toString()
                : transform.y.toString()
            }
            onChange={(e) => {
              setValue(parseInt(e.target.value));
              transform.y = parseInt(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup size="sm">
          <InputGroup.Text>Z</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder={transform.z.toString()}
            type="number"
            disabled={_isScale && checked}
            title={
              _isScale && checked
                ? lockValue.toString()
                : transform.z.toString()
            }
            onChange={(e) => {
              setValue(parseInt(e.target.value));
              transform.z = parseInt(e.target.value);
            }}
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
}
