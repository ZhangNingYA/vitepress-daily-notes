<script setup lang="ts">
import { computed } from 'vue'
import { data as entries, type DailyEntry, type DailyType } from '../daily.data'

const byType = computed(() => {
  const map: Record<DailyType, DailyEntry[]> = { words: [], grammar: [], reflection: [] }
  for (const e of entries) map[e.type].push(e)
  return map
})

function topN(type: DailyType, n = 5) {
  return (byType.value[type] || []).slice(0, n)
}

const today = computed(() => {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
})

function hrefFor(type: DailyType, dateStr: string) {
  return `/daily/${type}/${dateStr}`
}

function count(type: DailyType) {
  return byType.value[type]?.length ?? 0
}
</script>

<template>
  <div class="home-panels">
    <section class="home-card">
      <div class="home-card__title">
        <h2>每日单词句型</h2>
        <span class="home-card__badge">{{ count('words') }} 篇</span>
      </div>
      <p class="home-card__desc">积累高频词、固定搭配与可复用句型。以“短、清晰、可回看”为标准。</p>
      <div class="home-card__cta">
        <a class="home-btn" href="/daily/words/">进入栏目</a>
        <a class="home-btn" :href="hrefFor('words', today)">写今天</a>
      </div>
      <ul class="home-list">
        <li v-for="e in topN('words')" :key="e.url">
          <a :href="e.url">{{ e.title }}</a>
          <span class="home-date">{{ e.date }}</span>
        </li>
      </ul>
    </section>

    <section class="home-card">
      <div class="home-card__title">
        <h2>每日语法学习</h2>
        <span class="home-card__badge">{{ count('grammar') }} 篇</span>
      </div>
      <p class="home-card__desc">一天一个语法点：定义、例句、易错点、对比与一句话记忆法。</p>
      <div class="home-card__cta">
        <a class="home-btn" href="/daily/grammar/">进入栏目</a>
        <a class="home-btn" :href="hrefFor('grammar', today)">写今天</a>
      </div>
      <ul class="home-list">
        <li v-for="e in topN('grammar')" :key="e.url">
          <a :href="e.url">{{ e.title }}</a>
          <span class="home-date">{{ e.date }}</span>
        </li>
      </ul>
    </section>

    <section class="home-card">
      <div class="home-card__title">
        <h2>每日心得</h2>
        <span class="home-card__badge">{{ count('reflection') }} 篇</span>
      </div>
      <p class="home-card__desc">记录学习策略、方法迭代与复盘结论，形成长期改进的轨迹。</p>
      <div class="home-card__cta">
        <a class="home-btn" href="/daily/reflection/">进入栏目</a>
        <a class="home-btn" :href="hrefFor('reflection', today)">写今天</a>
      </div>
      <ul class="home-list">
        <li v-for="e in topN('reflection')" :key="e.url">
          <a :href="e.url">{{ e.title }}</a>
          <span class="home-date">{{ e.date }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
