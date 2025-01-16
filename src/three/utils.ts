import { Object3D } from 'three';

export function getObjectNameByName(object3D: Object3D): string {
  return object3D.name.trim() === '' ? object3D.type : object3D.name;
}

// {
//   currentDiv.getAttribute('style')?.includes('display:block')
//     ? currentDiv.setAttribute('style', 'display:none')
//     : currentDiv.setAttribute('style', 'display:block');
// }
export function hasClass(obj: any, className: string) {
  return obj.classList.contains(className);
}

export function toggleClass(currentSelectDiv: any, className: string) {
  currentSelectDiv.classList.contains(className)
    ? currentSelectDiv.classList.add(className)
    : currentSelectDiv.classList.remove(className);
}

export function toggleAttribute(
  currentSelectDiv: any,
  attribute: string,
  value: string,
) {
  currentSelectDiv.getAttribute(attribute)?.includes(value)
    ? currentSelectDiv.removeAttribute(attribute)
    : currentSelectDiv.setAttribute(attribute, value);
}

export function hasAttribute(obj: any, attribute: string, includes: string) {
  return obj.getAttribute(attribute)?.includes(includes);
}

export function loaderGlb() {}
