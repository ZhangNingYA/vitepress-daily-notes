<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const container = ref(null);
let scene, camera, renderer, cube, animationId;

// 状态控制
const isMoving = ref(true); // 动词状态
const currentColor = ref('#646cff'); // 形容词状态
const currentShape = ref('cube'); // 名词状态

const init = () => {
  // 1. 场景与相机
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#f6f6f7'); // 适配 VitePress 浅色背景
  
  // 适配暗色模式检测（可选优化）
  if (document.documentElement.classList.contains('dark')) {
      scene.background = new THREE.Color('#1b1b1f');
  }

  const aspect = container.value.clientWidth / container.value.clientHeight;
  camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
  camera.position.z = 5;

  // 2. 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 优化移动端性能
  container.value.appendChild(renderer.domElement);

  // 3. 物体 (名词 - Noun)
  createShape('cube');

  // 4. 灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(2, 2, 5);
  scene.add(directionalLight);

  animate();
};

const createShape = (type) => {
    if (cube) scene.remove(cube);
    
    let geometry;
    if (type === 'cube') geometry = new THREE.BoxGeometry(2, 2, 2);
    else if (type === 'sphere') geometry = new THREE.SphereGeometry(1.4, 32, 32);
    else if (type === 'cone') geometry = new THREE.ConeGeometry(1.2, 2.5, 32);

    const material = new THREE.MeshStandardMaterial({ 
        color: currentColor.value,
        roughness: 0.3,
        metalness: 0.1
    });
    
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    currentShape.value = type;
};

// 动画循环 (动词 - Verb)
const animate = () => {
  animationId = requestAnimationFrame(animate);

  if (cube && isMoving.value) {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  
  renderer.render(scene, camera);
};

// 交互函数
const toggleVerb = () => { isMoving.value = !isMoving.value; };
const changeAdjective = (color) => {
    currentColor.value = color;
    if(cube) cube.material.color.set(color);
};
const changeNoun = (shape) => { createShape(shape); };

// 生命周期
onMounted(() => {
    init();
    window.addEventListener('resize', onWindowResize);
});
onUnmounted(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onWindowResize);
    renderer.dispose();
});

const onWindowResize = () => {
    if (!container.value) return;
    camera.aspect = container.value.clientWidth / container.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
};
</script>

<template>
  <div class="grammar-lab">
    <div ref="container" class="canvas-container"></div>
    
    <div class="controls">
      <div class="control-group">
        <span class="label">🔵 名词 (Noun)</span>
        <div class="btn-group">
            <button @click="changeNoun('cube')" :class="{active: currentShape==='cube'}">盒子</button>
            <button @click="changeNoun('sphere')" :class="{active: currentShape==='sphere'}">球体</button>
        </div>
      </div>

      <div class="control-group">
        <span class="label">🎨 形容词 (Adj)</span>
        <div class="color-dots">
            <div @click="changeAdjective('#646cff')" class="dot blue"></div>
            <div @click="changeAdjective('#ff4757')" class="dot red"></div>
            <div @click="changeAdjective('#2ed573')" class="dot green"></div>
        </div>
      </div>

      <div class="control-group">
        <span class="label">⚡ 动词 (Verb)</span>
        <button class="action-btn" @click="toggleVerb">
            {{ isMoving ? 'Stop (停止)' : 'Move (运动)' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grammar-lab {
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  margin: 20px 0;
}
.canvas-container {
  width: 100%;
  height: 300px;
  cursor: grab;
}
.controls {
  padding: 15px;
  background: var(--vp-c-bg-alt);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.control-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.label {
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--vp-c-text-2);
}
.btn-group button {
  padding: 4px 10px;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  margin-left: 5px;
  border-radius: 4px;
}
.btn-group button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}
.color-dots { display: flex; gap: 8px; }
.dot { width: 20px; height: 20px; border-radius: 50%; cursor: pointer; border: 2px solid #fff; box-shadow: 0 0 2px rgba(0,0,0,0.3);}
.dot.blue { background: #646cff; }
.dot.red { background: #ff4757; }
.dot.green { background: #2ed573; }

.action-btn {
  width: 100px;
  padding: 6px;
  background: var(--vp-c-brand-light);
  color: var(--vp-c-brand-dark);
  font-weight: bold;
  border-radius: 6px;
}
</style>