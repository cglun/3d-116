import React, { useEffect, useState } from 'react';
import { Accordion, Card, Form, InputGroup } from 'react-bootstrap';
import { Object3D, Vector3 } from 'three';
import { setClassName } from '../../app/utils';
/**
 * 物体属性
 * @returns
 */
type SelectedObj = Object3D | any;

export default function ObjectProperty(selectedObj1: SelectedObj) {
  return <div>{selectedObj1}</div>;
  function inputItem(v: Vector3, t: string) {
    return (
      <InputGroup size="sm">
        <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
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

  const [selectedObj, setSelectedObj] = useState<SelectedObj>();
  useEffect(() => {
    if (selectedObj1 !== undefined) {
      setSelectedObj(selectedObj1);
    }
  }, []);

  return (
    selectedObj && (
      <Accordion.Item eventKey="1">
        <Accordion.Header>
          <i className={setClassName('menu-button')}></i>
          <span className="px-2">属性</span>
        </Accordion.Header>
        <Accordion.Body>
          <Card>
            <Card.Header>位置</Card.Header>
            <Card.Body className="d-flex">
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj && selectedObj.position.x.toString()}
                  type="number"
                  title={selectedObj.position.x.toString()}
                  value={selectedObj.position.x.toString()}
                  onChange={(e) => {
                    // setX(parseInt(e.target.value));
                    selectedObj1.position.x = parseInt(e.target.value);
                  }}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  {selectedObj.name}3
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj.name}
                  type="number"
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  {selectedObj.name}3
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj.name}
                  type="number"
                />
              </InputGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>旋转</Card.Header>
            <Card.Body className="d-flex">
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj && selectedObj.position.x.toString()}
                  type="number"
                  title={selectedObj.position.x.toString()}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  {selectedObj.name}3
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj.name}
                  type="number"
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  {selectedObj.name}3
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj.name}
                  type="number"
                />
              </InputGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>缩放</Card.Header>
            <Card.Body className="d-flex">
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">x</InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj && selectedObj.position.x.toString()}
                  type="number"
                  title={selectedObj.position.x.toString()}
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  {selectedObj.name}3
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj.name}
                  type="number"
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  {selectedObj.name}3
                </InputGroup.Text>
                <Form.Control
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder={selectedObj.name}
                  type="number"
                />
              </InputGroup>
            </Card.Body>
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    )
  );
}
