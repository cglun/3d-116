import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene: THREE.Scene = new THREE.Scene();

let camera: THREE.PerspectiveCamera, controls: OrbitControls;

let renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;

function animate() {
  requestAnimationFrame(animate);
  if (controls !== undefined) {
    controls.update();
  }

  renderer.render(scene, camera);
}

let cube: THREE.Mesh;
let light: THREE.DirectionalLight;
function addCube() {
  // 创建立方体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshLambertMaterial();
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.name = 'cube';

  cube.castShadow = true; // 立方体投射阴影

  scene.add(cube);

  // 添加正交光源
  light = new THREE.DirectionalLight(0xffffff, 3.5);
  light.position.set(3, 3, -6);
  light.castShadow = true; // 开启投射阴影
  light.lookAt(cube.position);
  scene.add(light);

  scene.add(new THREE.DirectionalLightHelper(light));

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
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true; // 地面接收阴影
  plane.castShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;
  scene.add(plane);

  const p1 = new THREE.Group();
  p1.name = 'group1';
  const p2 = new THREE.Group();
  p2.name = 'group2';
  p1.add(p2);
  const p3 = new THREE.Group();
  p3.name = 'group3';
  p2.add(p3);
  scene.add(p1);
}

function createScene(node: HTMLDivElement) {
  camera = new THREE.PerspectiveCamera(
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
function setCamera(camera1: THREE.Object3D<THREE.Object3DEventMap>) {
  camera.position.x = camera1.position.x;
  camera.position.y = camera1.position.y;
  camera.position.z = camera1.position.z;
}
function getCamera(): THREE.Camera {
  return camera;
}
function getScene(): THREE.Scene {
  return scene;
}
export default scene;
export {
  createScene,
  renderer,
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
