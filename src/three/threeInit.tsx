import {
  BoxGeometry,
  Camera,
  DirectionalLight,
  DirectionalLightHelper,
  Group,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene: Scene = new Scene();

let camera: PerspectiveCamera, controls: OrbitControls;

let renderer = new WebGLRenderer();
renderer.shadowMap.enabled = true;

function animate() {
  requestAnimationFrame(animate);
  if (controls !== undefined) {
    controls.update();
  }

  renderer.render(scene, camera);
}

let cube: Mesh;
let light: DirectionalLight;
function addCube() {
  // 创建立方体
  const cubeGeometry = new BoxGeometry(1, 1, 1);
  const cubeMaterial = new MeshLambertMaterial();
  cube = new Mesh(cubeGeometry, cubeMaterial);
  cube.name = 'cube';

  cube.castShadow = true; // 立方体投射阴影

  scene.add(cube);

  // 添加正交光源
  light = new DirectionalLight(0xffffff, 3.5);
  light.position.set(3, 3, -6);
  light.castShadow = true; // 开启投射阴影
  light.lookAt(cube.position);
  scene.add(light);

  scene.add(new DirectionalLightHelper(light));

  // 设置阴影参数
  light.shadow.mapSize.width = 2048; // 阴影图的宽度
  light.shadow.mapSize.height = 2048; // 阴影图的高度
  light.shadow.camera.near = 0.5; // 阴影摄像机的近剪裁面
  light.shadow.camera.far = 5000; // 阴影摄像机的远剪裁面
  light.shadow.camera.left = -10;
  light.shadow.camera.right = 10;
  light.shadow.camera.top = 10;
  light.shadow.camera.bottom = -10;

  // 创建地面
  const planeGeometry = new PlaneGeometry(10, 10);
  const planeMaterial = new MeshLambertMaterial({ color: 0xdddddd });
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true; // 地面接收阴影
  plane.castShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;
  scene.add(plane);

  const p1 = new Group();
  p1.name = 'group1';
  const p2 = new Group();
  p2.name = 'group2';
  p1.add(p2);
  const p3 = new Group();
  p3.name = 'group3';
  p2.add(p3);
  scene.add(p1);
}

function createScene(node: HTMLDivElement) {
  camera = new PerspectiveCamera(
    75,
    node.offsetWidth / node.offsetHeight,
    0.1,
    1000,
  );

  renderer.setSize(node.offsetWidth, node.offsetHeight);
  camera.position.set(3, 4, 5);

  node.appendChild(renderer.domElement);
  addOrbitControls();
  animate();
}
function addOrbitControls(): void {
  controls = new OrbitControls(camera, renderer.domElement);
}
function setScene(newScene: any) {
  scene = newScene;
}
function setCamera(camera1: Object3D<Object3DEventMap>) {
  camera.position.x = camera1.position.x;
  camera.position.y = camera1.position.y;
  camera.position.z = camera1.position.z;
}
function getCamera(): Camera {
  return camera;
}
function getScene(): Scene {
  return scene;
}
function getCube() {
  console.log(cube);

  return cube;
}
export default scene;
export {
  createScene,
  renderer,
  getCube,
  camera,
  addOrbitControls,
  cube,
  light,
  setScene,
  getScene,
  addCube,
  setCamera,
  getCamera,
};
