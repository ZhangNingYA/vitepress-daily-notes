<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,      // 语法点标题
  tag: String,        // 标签（如：易错 / 高频 / 虚拟语气）
  rule: String,       // 核心规则简述
  done: String,       // ✅ 正确例句 (Right)
  error: String,      // ❌ 错误例句 (Wrong)
  tip: String         // 💡 解析或避坑指南
})

const isOpen = ref(false)
const toggle = () => { isOpen.value = !isOpen.value }
</script>

<template>
  <div 
    class="grammar-card" 
    :class="{ 'is-open': isOpen }"
    @click="toggle"
  >
    <div class="card-header">
      <div class="header-main">
        <span class="title-icon">🏷️</span>
        <span class="title-text">{{ title }}</span>
      </div>
      <div class="header-side">
        <span v-if="tag" class="grammar-tag">{{ tag }}</span>
        <span class="arrow-icon"></span>
      </div>
    </div>

    <div class="card-body">
      <div class="body-inner">
        
        <div class="rule-box">
          <span class="rule-label">RULE</span>
          <p class="rule-text">{{ rule }}</p>
        </div>

        <div class="examples-box">
          <div v-if="error" class="example-row wrong">
            <span class="icon">✕</span>
            <span class="text">{{ error }}</span>
          </div>
          
          <div class="example-row right">
            <span class="icon">✓</span>
            <span class="text">{{ done }}</span>
          </div>
        </div>

        <div v-if="tip" class="tip-box">
          <span class="tip-icon">💡</span>
          <span class="tip-text">{{ tip }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.grammar-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
  cursor: pointer;
  border-left: 4px solid var(--vp-c-brand); /* 左侧强调色条 */
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}

/* 悬停微互动 */
.grammar-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.card-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--vp-c-bg-soft);
}

.header-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.title-icon {
  font-size: 1.2rem;
  opacity: 0.8;
}

.header-side {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 小标签样式 */
.grammar-tag {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 10px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-dark);
  font-weight: 600;
}

/* 箭头动画 */
.arrow-icon {
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--vp-c-text-3);
  border-bottom: 2px solid var(--vp-c-text-3);
  transform: rotate(45deg);
  transition: transform 0.3s;
  margin-right: 4px;
}
.is-open .arrow-icon {
  transform: rotate(-135deg) translate(-2px, -2px); /* 旋转并微调位置 */
}

/* --- 折叠动画 --- */
.card-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: var(--vp-c-bg-alt); /* 展开区域背景稍微不同 */
}

.is-open .card-body {
  grid-template-rows: 1fr;
}

.body-inner {
  overflow: hidden;
  padding: 0 16px; /* 默认无上下padding */
}
.is-open .body-inner {
  padding: 0 16px 20px 16px; /* 展开后增加底部留白 */
}

/* --- 内容样式 --- */
.rule-box {
  margin-top: 12px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rule-label {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: var(--vp-c-text-3);
  opacity: 0.6;
}

.rule-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

/* 例句对比 */
.examples-box {
  background-color: var(--vp-c-bg); /* 例句框背景回退到纯色，突出内容 */
  border-radius: 8px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
}

.example-row {
  display: flex;
  gap: 10px;
  font-size: 0.95rem;
  line-height: 1.5;
  padding: 4px 0;
}

.example-row.wrong {
  color: var(--vp-c-danger-1, #f56c6c); /* 红色系 */
  border-bottom: 1px dashed var(--vp-c-divider);
  padding-bottom: 8px;
  margin-bottom: 8px;
  opacity: 0.9;
}

.example-row.right {
  color: var(--vp-c-success-1, #10b981); /* 绿色系 */
  font-weight: 500;
}

.icon {
  font-weight: bold;
  flex-shrink: 0; /* 防止图标被压缩 */
}

/* 底部解析 */
.tip-box {
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 6px;
  line-height: 1.5;
  padding-left: 4px;
}
</style>