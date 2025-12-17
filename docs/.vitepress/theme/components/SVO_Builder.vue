<script setup lang="ts">
import { ref, computed } from 'vue'

// 定义数据结构
const subjects = ['Tony', 'Spider-Man', 'The Hulk', 'Batman']
const verbs = ['painted', 'smashed', 'kissed', 'built']
const objects = ['the armor', 'the car', 'the screen', 'the city']

// 状态管理
const idx = ref({ s: 0, v: 0, o: 0 })

// 计算属性
const currentS = computed(() => subjects[idx.value.s])
const currentV = computed(() => verbs[idx.value.v])
const currentO = computed(() => objects[idx.value.o])

// 交互逻辑
const cycle = (type: 's' | 'v' | 'o') => {
  const max = type === 's' ? subjects.length : type === 'v' ? verbs.length : objects.length
  idx.value[type] = (idx.value[type] + 1) % max
}
</script>

<template>
  <section class="home-card interactive-card">
    <div class="home-card__title">
      <h2>Scene 1: 核心骨架 (SVO)</h2>
      <span class="home-card__badge">交互演示</span>
    </div>
    
    <p class="home-card__desc">
      没有这三位，电影没法拍。点击下方色块，体验“谁、做了什么、对谁做”的固定逻辑。
    </p>

    <div class="slot-container">
      <div class="slot-item subject" @click="cycle('s')">
        <span class="slot-label">主语 (Who)</span>
        <div class="slot-card">{{ currentS }}</div>
      </div>
      
      <div class="slot-item predicate" @click="cycle('v')">
        <span class="slot-label">谓语 (Action)</span>
        <div class="slot-card">{{ currentV }}</div>
      </div>
      
      <div class="slot-item object" @click="cycle('o')">
        <span class="slot-label">宾语 (Target)</span>
        <div class="slot-card">{{ currentO }}</div>
      </div>
    </div>

    <div class="result-display">
      <span class="highlight">"</span>
      {{ currentS }} {{ currentV }} {{ currentO }}.
      <span class="highlight">"</span>
    </div>

    <div class="home-card__cta">
      <button class="home-btn secondary" @click="cycle('s');cycle('v');cycle('o')">🎲 随机生成</button>
    </div>
  </section>
</template>

<style scoped>
/* 复用参考风格的基础布局 */
.home-card {
  background-color: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-bg-alt, #e2e2e3);
  border-radius: 12px;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: border-color 0.25s;
}

.home-card:hover {
  border-color: var(--vp-c-brand, #3eaf7c);
}

.home-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.home-card__title h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  border: none;
}

.home-card__badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  background-color: var(--vp-c-brand-dimm, rgba(62, 175, 124, 0.1));
  color: var(--vp-c-brand, #3eaf7c);
  font-weight: 500;
}

.home-card__desc {
  color: var(--vp-c-text-2, #666);
  font-size: 0.95rem;
  margin: 0 0 20px 0;
  line-height: 1.6;
}

/* 交互特定样式 */
.slot-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.slot-item {
  flex: 1;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slot-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3, #999);
  margin-bottom: 6px;
  text-transform: uppercase;
  font-weight: 700;
}

.slot-card {
  width: 100%;
  padding: 12px 4px;
  background: var(--vp-c-bg, #fff);
  border: 2px solid transparent;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  user-select: none;
}

.slot-item:hover .slot-card { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.slot-item:active .slot-card { transform: scale(0.96); }

/* 颜色编码 */
.subject .slot-card { border-color: #ef5350; color: #c62828; }
.predicate .slot-card { border-color: #42a5f5; color: #1565c0; }
.object .slot-card { border-color: #66bb6a; color: #2e7d32; }

.result-display {
  text-align: center;
  font-family: monospace;
  font-size: 1.1rem;
  background: var(--vp-c-bg-alt, #eee);
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-weight: 500;
}
.highlight { color: var(--vp-c-brand); }

.home-card__cta { margin-top: auto; display: flex; gap: 10px; }
.home-btn {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid var(--vp-c-brand);
  background: var(--vp-c-brand);
  color: white;
}
.home-btn.secondary {
  background: transparent;
  color: var(--vp-c-brand);
}
.home-btn:hover { opacity: 0.85; }
</style>