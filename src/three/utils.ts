import { Object3D } from 'three';

export function setObjectName(object3D: Object3D): string {
  return object3D.name.trim() === '' ? object3D.type : object3D.name;
}
