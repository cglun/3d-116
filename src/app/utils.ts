import { iconIsFill } from './config';

function setClassName(className: string): string {
  if (iconIsFill) {
    return `bi bi-${className}-fill`;
  }
  return `bi bi-${className}`;
}
export { setClassName };
