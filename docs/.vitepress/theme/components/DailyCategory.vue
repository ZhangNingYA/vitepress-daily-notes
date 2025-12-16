<script setup lang="ts">
import { computed } from 'vue'
import { data as entries, type DailyEntry, type DailyType } from '../daily.data'

const props = defineProps<{
  type: DailyType
  title: string
}>()

const list = computed(() => entries.filter(e => e.type === props.type))

function toDayUrl(e: DailyEntry) {
  // 统一展示为 /daily/<type>/<YYYY-MM-DD>
  return `/daily/${props.type}/${e.date}`
}
</script>

<template>
  <div class="daily-page">
    <div class="daily-page__head">
      <h1>{{ title }}</h1>
      <div class="daily-page__hint">按日期倒序。建议每篇只写一个重点，方便手机端快速回看。</div>
    </div>

    <section class="home-card">
      <div class="home-card__title">
        <h2>最近条目</h2>
        <span class="home-card__badge">{{ list.length }} 篇</span>
      </div>
      <ul class="home-list">
        <li v-for="e in list.slice(0, 60)" :key="e.url">
          <a :href="toDayUrl(e)">{{ e.title }}</a>
          <span class="home-date">{{ e.date }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
