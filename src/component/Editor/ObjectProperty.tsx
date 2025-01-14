import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, InputGroup } from 'react-bootstrap';
import { Object3D, Vector3 } from 'three';
import { setClassName } from '../../app/utils';
import { getCube } from '../../three/threeInit';
import { setObjectName } from '../../three/utils';
/**
 * 物体属性
 * @returns
 */
type currentlySelected = Object3D | any;

export default function ObjectProperty({
  currentlySelected,
  setCurrentlySelected,
}) {
  function inputItem(v: Vector3, t: string) {
    return (
      <InputGroup size="sm">
        <InputGroup.Text>x</InputGroup.Text>
        <Form.Control
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder={'3'}
          type="number"
          title={'3'}
        />
      </InputGroup>
    );
  }
  debugger;
  return (
    currentlySelected && (
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <i className={setClassName('menu-button')}></i>
          <span className="px-2 ellipsis-3d">
            属性-{setObjectName(currentlySelected)}
          </span>
        </Accordion.Header>
        <Accordion.Body>
          <Object3dInput
            position={currentlySelected.position}
            title={'位置'}
          ></Object3dInput>
          <Object3dInput
            position={currentlySelected.rotation}
            title={'旋转'}
          ></Object3dInput>
          <Object3dInput
            position={currentlySelected.scale}
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

function Object3dInput({ position = new Vector3(0, 0, 0), title = '位置' }) {
  const [checked, setChecked] = useState(true);
  const [lockValue, setLockValue] = useState(0);
  const _isScale = isScale(title);
  function setValue(xx) {
    if (checked && _isScale) {
      setLockValue(xx);
      position.x = xx;
      position.y = xx;
      position.z = xx;
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
            placeholder={position.x.toString()}
            type="number"
            title={position.x.toString()}
            onChange={(e) => {
              setValue(parseInt(e.target.value));
              position.x = parseInt(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup size="sm">
          <InputGroup.Text>Y</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder={position.y.toString()}
            type="number"
            disabled={_isScale && checked}
            title={
              _isScale && checked ? lockValue.toString() : position.y.toString()
            }
            onChange={(e) => {
              setValue(parseInt(e.target.value));
              position.y = parseInt(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup size="sm">
          <InputGroup.Text>Z</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder={position.z.toString()}
            type="number"
            disabled={_isScale && checked}
            title={
              _isScale && checked ? lockValue.toString() : position.z.toString()
            }
            onChange={(e) => {
              setValue(parseInt(e.target.value));
              position.z = parseInt(e.target.value);
            }}
          />
        </InputGroup>
      </Card.Body>
    </Card>
  );
}
