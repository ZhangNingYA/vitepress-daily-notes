<script setup lang="ts">
import { computed } from 'vue'
import { data as entries, type DailyEntry, type DailyType } from '../daily.data'

const latestAll = computed(() => entries.slice(0, 15))

const titleMap: Record<DailyType, string> = {
  words: '单词句型',
  grammar: '语法学习',
  reflection: '每日心得'
}
</script>

<template>
  <div class="daily-page">
    <div class="daily-page__head">
      <h1>今日入口</h1>
      <div class="daily-page__hint">你可以从这里快速进入三个栏目，也可以直接回看最近更新。</div>
    </div>

    <div class="home-panels" style="margin-top: 10px">
      <section class="home-card">
        <div class="home-card__title"><h2>快速入口</h2></div>
        <div class="home-card__cta">
          <a class="home-btn" href="/daily/words/">单词句型</a>
          <a class="home-btn" href="/daily/grammar/">语法学习</a>
          <a class="home-btn" href="/daily/reflection/">每日心得</a>
          <a class="home-btn" href="/daily/archive">归档</a>
        </div>
        <p class="home-card__desc" style="margin-top: 6px">建议把这页加入手机书签，作为每天进入站点的起点。</p>
      </section>

      <section class="home-card" style="grid-column: 1 / -1">
        <div class="home-card__title">
          <h2>最近更新</h2>
          <span class="home-card__badge">TOP 15</span>
        </div>
        <ul class="home-list">
          <li v-for="e in latestAll" :key="e.url">
            <a :href="e.url">[{{ titleMap[e.type] }}] {{ e.title }}</a>
            <span class="home-date">{{ e.date }}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
