<!-- Index.vue -->
<script setup>
import { nextTick, watch } from 'vue'
import VPTheme from 'doc-theme-323'
import { useData } from 'vitepress'

const { Layout } = VPTheme
const { page } = useData()

function alignHash(attempt = 0) {
  const raw = location.hash
  if (!raw) return
  let id = ''
  try {
    id = decodeURIComponent(raw.slice(1))
  } catch {
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const nav = document.querySelector('.VPNav')
  const offset = nav ? Math.round(nav.getBoundingClientRect().height) : 64
  const desired = offset + 24
  const top = window.scrollY + el.getBoundingClientRect().top - desired
  window.scrollTo(0, Math.max(0, top))
  if (attempt >= 8) return
  requestAnimationFrame(() => {
    const now = document.getElementById(id)
    if (!now) return
    if (Math.abs(now.getBoundingClientRect().top - desired) > 48) alignHash(attempt + 1)
  })
}

watch(() => page.value.relativePath, async () => {
  await nextTick()
  alignHash()
})
</script>
<template>
  <Layout>
    <template #doc-copyright>
      <div style="margin-top: 20px">
        Copyright © 2023 ark.online All Rights Reserved |
        <a href="https://beian.miit.gov.cn/#/">京ICP备18003564号-14</a>
      </div>
    </template>
  </Layout>
</template>
