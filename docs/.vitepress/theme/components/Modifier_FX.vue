<script setup lang="ts">
import { reactive } from 'vue'

// 状态接口
interface ToggleState {
  attr: boolean
  appos: boolean
  adv: boolean
  comp: boolean
}

const toggles = reactive<ToggleState>({
  attr: false,
  appos: false,
  adv: false,
  comp: false
})

const toggle = (key: keyof ToggleState) => {
  toggles[key] = !toggles[key]
}
</script>

<template>
  <section class="home-card interactive-card">
    <div class="home-card__title">
      <h2>Scene 2: 气氛组 (定状补)</h2>
      <span class="home-card__badge">交互演示</span>
    </div>
    
    <p class="home-card__desc">
      骨架太干巴？尝试开启下方开关，观察修饰成分（定语、状语、补语）如何插入到句子中。
    </p>

    <div class="screen-container">
      <transition-group name="list" tag="div" class="sentence-wrapper">
        <span v-if="toggles.attr" key="attr" class="mod attr">The rich</span>
        <span key="subj" class="core">Tony</span>
        <span v-if="toggles.appos" key="appos" class="mod appos">, the genius,</span>
        <span v-if="toggles.adv" key="adv" class="mod adv">quickly</span>
        <span key="verb" class="core">painted</span>
        <span key="obj" class="core">the armor</span>
        <span v-if="toggles.comp" key="comp" class="mod comp">red</span>
        <span key="dot" class="core">.</span>
      </transition-group>
    </div>

    <div class="home-card__cta grid-cta">
      <button 
        class="home-btn toggle-btn" 
        :class="{ active: toggles.attr }" 
        @click="toggle('attr')"
      >
        🎨 定语
      </button>
      <button 
        class="home-btn toggle-btn" 
        :class="{ active: toggles.appos }" 
        @click="toggle('appos')"
      >
        🏷️ 同位语
      </button>
      <button 
        class="home-btn toggle-btn" 
        :class="{ active: toggles.adv }" 
        @click="toggle('adv')"
      >
        ⚡ 状语
      </button>
      <button 
        class="home-btn toggle-btn" 
        :class="{ active: toggles.comp }" 
        @click="toggle('comp')"
      >
        🏁 补语
      </button>
    </div>
  </section>
</template>

<style scoped>
/* 继承基础样式 (与上面相同，实际项目中可提取为全局类) */
.home-card {
  background-color: var(--vp-c-bg-soft, #f6f6f7);
  border: 1px solid var(--vp-c-bg-alt, #e2e2e3);
  border-radius: 12px;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.home-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.home-card__title h2 { margin: 0; font-size: 1.25rem; font-weight: 600; border:none; }
.home-card__badge {
  font-size: 12px; padding: 2px 8px; border-radius: 10px;
  background-color: var(--vp-c-brand-dimm, rgba(62, 175, 124, 0.1));
  color: var(--vp-c-brand, #3eaf7c); font-weight: 500;
}
.home-card__desc {
  color: var(--vp-c-text-2, #666); font-size: 0.95rem; margin: 0 0 20px 0; line-height: 1.6;
}

/* 屏幕显示区域 */
.screen-container {
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-divider, #ddd);
  border-radius: 8px;
  padding: 20px 10px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
}

.sentence-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: baseline;
  justify-content: center;
  font-size: 1.05rem;
}

.core { font-weight: 700; color: var(--vp-c-text-1); }
.mod {
  font-size: 0.85em;
  padding: 2px 8px;
  border-radius: 4px;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 颜色定义 */
.attr { background-color: #ab47bc; }
.appos { background-color: #78909c; }
.adv { background-color: #ff7043; }
.comp { background-color: #26a69a; }

/* 按钮样式覆写 */
.grid-cta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
}

.home-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.home-btn:hover {
  background-color: var(--vp-c-bg-alt);
}

/* 激活状态 */
.home-btn.active { border-color: transparent; color: white; transform: translateY(-1px); }
.home-btn.active:nth-child(1) { background-color: #ab47bc; box-shadow: 0 4px 10px rgba(171, 71, 188, 0.3); }
.home-btn.active:nth-child(2) { background-color: #78909c; box-shadow: 0 4px 10px rgba(120, 144, 156, 0.3); }
.home-btn.active:nth-child(3) { background-color: #ff7043; box-shadow: 0 4px 10px rgba(255, 112, 67, 0.3); }
.home-btn.active:nth-child(4) { background-color: #26a69a; box-shadow: 0 4px 10px rgba(38, 166, 154, 0.3); }

/* 动画效果 */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(15px);
  width: 0; /* 挤开效果的关键 */
  padding: 0;
  margin: 0;
}
.list-leave-active {
  position: absolute; /* 让删除元素脱离流，实现平滑移动 */
}
</style>