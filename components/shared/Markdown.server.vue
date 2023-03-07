<script lang="ts" setup>
import MarkdownIt from 'markdown-it'

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
})

const md = new MarkdownIt({ html: true })
const renderedMarkdown = md.render(props.markdown)
</script>

<template>
  <div class="markdown" v-html="renderedMarkdown" />
</template>

<style lang="scss">
.markdown {
  h1 {
    @apply text-4xl;
    @apply mb-3;
  }
  h2 {
    @apply text-3xl;
    @apply mb-3;
  }
  h3 {
    @apply text-2xl;
    @apply mb-3;
  }
  h4 {
    @apply text-xl;
    @apply mb-3;
  }
  h5 {
    @apply text-lg;
    @apply mb-3;
  }
  p {
    @apply mb-3;
  }
}
</style>
