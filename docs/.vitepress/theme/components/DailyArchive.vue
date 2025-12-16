<script setup lang="ts">
import { computed } from 'vue'
import { data as entries, type DailyEntry, type DailyType } from '../daily.data'

type Row = DailyEntry & { label: string }

const labelMap: Record<DailyType, string> = {
  words: '单词句型',
  grammar: '语法学习',
  reflection: '每日心得'
}

const grouped = computed(() => {
  const map = new Map<string, Row[]>()
  for (const e of entries) {
    const date = e.date
    if (!map.has(date)) map.set(date, [])
    map.get(date)!.push({ ...e, label: labelMap[e.type] })
  }
  // 每天内部按固定顺序
  for (const [k, arr] of map.entries()) {
    const order: Record<DailyType, number> = { words: 1, grammar: 2, reflection: 3 }
    arr.sort((a, b) => order[a.type] - order[b.type])
    map.set(k, arr)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0])) // 日期倒序
})

function dayUrl(e: DailyEntry) {
  return `/daily/${e.type}/${e.date}`
}
</script>

<template>
  <div class="daily-page">
    <div class="daily-page__head">
      <h1>归档</h1>
      <div class="daily-page__hint">按日期聚合三大栏目，适合“按天回看”。</div>
    </div>

    <section class="home-card" v-for="[date, rows] in grouped" :key="date" style="margin-bottom: 12px">
      <div class="home-card__title">
        <h2>{{ date }}</h2>
        <span class="home-card__badge">{{ rows.length }} 条</span>
      </div>

      <ul class="home-list">
        <li v-for="e in rows" :key="e.url">
          <a :href="dayUrl(e)">[{{ e.label }}] {{ e.title }}</a>
          <span class="home-date">{{ e.date }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
