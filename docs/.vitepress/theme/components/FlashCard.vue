<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  word: String,       // 单词
  phonetic: String,   // 音标
  type: String,       // 词性 (n. adj. v.) - 新增，为了排版更专业
  meaning: String,    // 意思
  note: String        // 例句
})

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
}

// 处理意思换行
const meaningList = computed(() => {
  if (!props.meaning) return []
  return props.meaning.replace(/；/g, '|').replace(/;/g, '|').split('|').map(m => m.trim()).filter(m => m)
})
</script>

<template>
  <div 
    class="word-card" 
    :class="{ 'is-open': isOpen }" 
    @click="toggle"
  >
    <div class="card-header">
      <div class="word-main">
        <span class="text">{{ word }}</span>
        <span v-if="type" class="tag">{{ type }}</span>
      </div>
      <div class="word-sub">
        <span v-if="phonetic" class="phonetic">{{ phonetic }}</span>
        <span class="indicator"></span>
      </div>
    </div>

    <div class="card-body">
      <div class="body-content">
        <div class="divider"></div>
        
        <ul class="meaning-list">
          <li v-for="(m, i) in meaningList" :key="i">{{ m }}</li>
        </ul>

        <div v-if="note" class="note-box">
          <p>{{ note }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.word-card {
  position: relative;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* 移动端防粘滞 */
  -webkit-tap-highlight-color: transparent;
}

/* 激活状态样式 */
.is-open {
  background-color: var(--vp-c-bg); /* 展开时背景稍微亮一点 */
  border-color: var(--vp-c-brand-light);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

/* --- 头部布局 --- */
.card-header {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.word-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text {
  font-size: 1.15rem; /* 稍微紧凑一点，适应20+个单词 */
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.tag {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  font-weight: 600;
  font-family: monospace;
}

.word-sub {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phonetic {
  font-family: 'Georgia', serif;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  opacity: 0.8;
}

/* 状态指示点：默认空心或灰色，展开变色 */
.indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--vp-c-divider);
  transition: background-color 0.3s;
}
.is-open .indicator {
  background-color: var(--vp-c-brand);
}

/* --- 抽屉动画核心 --- */
.card-body {
  display: grid;
  grid-template-rows: 0fr; /* 默认高度为0 */
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.is-open .card-body {
  grid-template-rows: 1fr; /* 展开到自适应高度 */
}

.body-content {
  overflow: hidden; /* 必须隐藏溢出 */
  padding: 0 16px; /* 左右padding放这里，上下padding在展开时加 */
}

.is-open .body-content {
  padding-bottom: 16px; /* 展开后底部留空 */
}

/* --- 内容样式 --- */
.divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin: 4px 0 12px 0;
  opacity: 0.5;
  border-bottom: 1px dashed var(--vp-c-divider); /* 虚线分割更有质感 */
  background: none;
}

.meaning-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}

.meaning-list li {
  margin-bottom: 4px;
}
/* 中文意思前的装饰点 */
.meaning-list li::before {
  content: "• ";
  color: var(--vp-c-brand);
}

.note-box {
  margin-top: 8px;
  padding: 8px 10px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  line-height: 1.4;
}
</style>