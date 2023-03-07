<!-- TODO: make things more readable, depart sections -->
<script lang="ts" setup>
import { useReaderStore } from '~/store/reader'
import type { Day } from '~/types/day.type'

const props = defineProps({
  data: {
    type: Object as PropType<Day>,
    required: true,
  },
})
const { options } = useReaderStore()
const { locale } = useI18n()
const route = useRoute()

const colorMode = useColorMode()
const currentMode = computed(() => colorMode.value)

const readerContent = ref<HTMLElement>()

const openBible = ref(false)

const isLoggedIn = false
const y = ref(0)
const x = ref(0)
const showContextMenu = ref(false)
const selectedText = ref()

const selectedVersion = ref<string | null>()
const selectedVerse = ref<string | null>()

const verse = computed(() => {
  if (selectedVerse.value && selectedVersion.value)
    return (props.data.bible.find(bible => bible.name === selectedVersion.value)?.verses as any)[selectedVerse.value]
})

const endpoint = `${locale.value}-${route.params.quarterly}-${route.params.week}-${route.params.day}`

const loadScript = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', url)
    script.onload = () => { resolve() }
    script.onerror = () => { reject() }
    document.head.appendChild(script)
  })
}

const login = () => {}

const onMouseup = () => {
  const selection = window.getSelection()
  showContextMenu.value = false

  if (selection?.rangeCount) {
    const startNode = selection.getRangeAt(0).startContainer
    const endNode = selection.getRangeAt(0).endContainer

    if (!readerContent.value?.contains(startNode) || !readerContent.value?.contains(endNode)) {
      showContextMenu.value = false
      return
    }

    const { x: X, y: Y, width } = selection.getRangeAt(0).getBoundingClientRect()

    if (width < 1) {
      showContextMenu.value = false
      return false
    }

    x.value = X + (width / 2) - 60
    y.value = Y + window.scrollY - 40
    showContextMenu.value = true
    selectedText.value = selection.toString()
  }
}

const highLighColors = ['orange', 'yellow', 'green', 'blue']

const initHighlighter = () => {
  rangy.init()
  window.highlighter = rangy.createHighlighter()

  window.getHighlighterRangeOffset = function () {
    if (window.highlighter) {
      const converter = window.highlighter.converter
      const pageContainer = window.document.querySelector(
        '#reader-content',
      )
      if (pageContainer) {
        const containerRange = rangy.createRange(document)
        if (containerRange) {
          containerRange.setStart(pageContainer, 0)
          const containerCharRange = converter.rangeToCharacterRange(
            containerRange,
          )
          const rangeOffset = containerCharRange.start
          return parseInt(rangeOffset, 10) - 8
        }
      }
    }
    return 0
  }

  window.appliers = {
    orange: rangy.createClassApplier('highlight_orange', {
      ignoreWhiteSpace: true,
      tagNames: ['span', 'a'],
    }),

    yellow: rangy.createClassApplier('highlight_yellow', {
      ignoreWhiteSpace: true,
      tagNames: ['span', 'a'],
    }),

    green: rangy.createClassApplier('highlight_green', {
      ignoreWhiteSpace: true,
      tagNames: ['span', 'a'],
    }),

    blue: rangy.createClassApplier('highlight_blue', {
      ignoreWhiteSpace: true,
      tagNames: ['span', 'a'],
    }),

    underline: rangy.createClassApplier('highlight_underline', {
      ignoreWhiteSpace: true,
      tagNames: ['span', 'a'],
    }),
  }
  window.highlighter.addClassApplier(window.appliers.orange)
  window.highlighter.addClassApplier(window.appliers.yellow)
  window.highlighter.addClassApplier(window.appliers.green)
  window.highlighter.addClassApplier(window.appliers.blue)
  window.highlighter.addClassApplier(window.appliers.underline)

  setHighlights()
}

const saveHighlights = async (highlights: string) => {
  // TODO: fix auth store, havn't been able work with gogole api in local
  if (isLoggedIn)
    return
  try {
    // await $fetch<any>('/highlights', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     readIndex: endpoint,
    //     highlights,
    //   }),
    // })
  }
  catch (e) {}
}

const onHighlightComplete = () => {
  const highlights = window.highlighter.serialize()
  const highLighParts = highlights.split('|')
  const module = highLighParts[0]

  if (module && module === 'type:textContent') {
    const highlightContainerOffset = window.getHighlighterRangeOffset()
    let ranges = highLighParts.filter((part, index) => index > 0)
    if (ranges && ranges.filter(x => x).length > 0) {
      ranges = ranges.map((range) => {
        const rangeParts = range.split('$')
        rangeParts[0] = (parseInt(rangeParts[0], 10) - highlightContainerOffset).toString()
        rangeParts[1] = (parseInt(rangeParts[1], 10) - highlightContainerOffset).toString()
        return rangeParts.join('$')
      })
      saveHighlights(`type:textContent|${ranges.join('|')}`)
      // this.$emit('saveHighlights', `type:textContent|${ranges.join('|')}`)
    }
  }
}

const clearSelection = () => {
  if (window.getSelection) {
    if (window.getSelection().empty) { // Chrome
      window.getSelection().empty()
    }
    else if (window.getSelection().removeAllRanges) { // Firefox
      window.getSelection().removeAllRanges()
    }
  }
  else if (document.selection) { // IE?
    document.selection.empty()
  }
}

const unHighlightSelection = () => {
  window.highlighter.unhighlightSelection()
  clearSelection()
  showContextMenu.value = false
  onHighlightComplete()
}

const highlightSelection = (color: string) => {
  window.highlighter.highlightSelection(`highlight_${color}`)
  clearSelection()
  showContextMenu.value = false
  onHighlightComplete()
}

const setHighlights = () => {
  let highlights = ''

  if (!highlights.length)
    return
  try {
    window.highlighter.removeAllHighlights()

    const highLighParts = highlights.split('|')
    const module = highLighParts[0]

    if (module && module === 'type:textContent') {
      const highlightContainerOffset = window.getHighlighterRangeOffset()
      let ranges = highLighParts.filter((part, index) => index > 0)
      if (ranges && ranges.filter(x => x).length > 0) {
        ranges = ranges.map((range) => {
          const rangeParts = range.split('$')
          rangeParts[0] = (
            parseInt(rangeParts[0], 10) + highlightContainerOffset
          ).toString()
          rangeParts[1] = (
            parseInt(rangeParts[1], 10) + highlightContainerOffset
          ).toString()
          return rangeParts.join('$')
        })

        highlights = `type:textContent|${ranges.join('|')}`
      }
    }

    window.highlighter.deserialize(highlights)
  }
  catch (err) {
    console.error(err)
  }
}

const loadComments = async () => {
  // TODO: fix auth store, havn't been able work with gogole api in local
  try {
    // const { data } = await $fetch<any>('/highlights/en-2023-01-01-01', {
    //   baseURL: 'https://sabbath-school-stage.adventech.io/api/v2/en',
    //   headers: {
    //     'x-ss-auth-access-token': token,
    //   },
    // })
    // comments.forEach((comment) => {
    //   const textarea = document.getElementById(comment.elementId) as HTMLTextAreaElement
    //   if (textarea) {
    //     textarea.value = comment.comment
    //     textarea.style.overflowY = 'hidden'
    //     textarea.style.height = 'auto'
    //     textarea.style.height = `${textarea.scrollHeight}px`
    //   }
    // })
  }
  catch (error) {
    console.log(error)
  }
}

const saveComments = async (comment: string, id: string) => {
  // TODO: fix auth store, havn't been able work with gogole api in local
  if (!isLoggedIn)
    return

  try {
    // await $fetch<any>('comments', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     readIndex: endpoint,
    //     comments: [{
    //       comment,
    //       id,
    //     }],
    //   }),
    // })
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  if (props.data.bible.length > 0)
    selectedVersion.value = props.data.bible[0].name

  try {
    await loadScript('/assets/js/rangy/rangy-core.js')
    await loadScript('/assets/js/rangy/rangy-classapplier.js')
    await loadScript('/assets/js/rangy/rangy-highlighter.js')
    await loadScript('/assets/js/rangy/rangy-serializer.js')
  }
  catch (error) {
    console.error(error)
  }

  if (readerContent.value) {
    window.addEventListener('mouseup', onMouseup)

    const elements = readerContent.value.getElementsByClassName('ss-donation-appeal')
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      element.firstElementChild?.addEventListener('click', () => {
        element.classList.toggle('ss-donation-appeal-expanded')
      })
    }

    const verses = readerContent.value.getElementsByClassName('verse')
    for (let i = 0; i < verses.length; i++) {
      const verse = verses[i]
      verse.addEventListener('click', () => {
        selectedVerse.value = verse.getAttribute('verse')
        openBible.value = true
      })
    }

    let timeout: any

    const notes = readerContent.value.querySelectorAll('code')
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i]

      const textarea = document.createElement('textarea')
      textarea.classList.add('textarea')
      textarea.setAttribute('id', `input-${i}`)

      textarea.oninput = () => {
        textarea.style.overflowY = 'hidden'
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`

        clearTimeout(timeout)
        timeout = setTimeout(() => {
          saveComments(textarea.value, textarea.getAttribute('id')!)
        }, 1000)
      }

      const border = document.createElement('div')
      border.classList.add('textarea-border')

      const container = document.createElement('div')
      container.classList.add('textarea-container')

      container.appendChild(textarea)
      container.appendChild(border)

      // add the container to the document
      note.parentNode?.insertBefore(container, note.nextSibling)
    }
  }

  loadComments()
  initHighlighter()
})

onUnmounted(() => {
  window.removeEventListener('mouseup', onMouseup)
})
</script>

<template>
  <div class="reader">
    <div v-if="showContextMenu" class="z-10 absolute bg-white shadow drop-shadow-lg rounded p-2 items-center flex" :style="`top: ${y}px; left: ${x}px`">
      <template v-if="isLoggedIn">
        <button v-for="color in highLighColors" :key="color" class="cursor-pointer hover:bg-gray-200 rounded p-1 w-6 h-6 mr-2" @click="highlightSelection(color)">
          <div :class="[`bg-${color}-500`]" class="w-4 h-4 rounded-full" />
        </button>
        <button class="cursor-pointer hover:bg-gray-200 rounded w-6 h-6" @click="unHighlightSelection">
          <Icon name="mdi:close-circle-outline" />
        </button>
      </template>
      <template v-else>
        <span class="italic text-gray-500">
          <button class="text-ss-primary underline" @click="login">
            Log in
          </button>
          to save highlights <Icon name="tabler:highlight" />
        </span>
      </template>
    </div>
    <div class="ss-wrapper">
      <div class="ss-wrapper-theme p-4 md:p-6 lg:p-8 xl:p-10" :class="[`ss-wrapper-${currentMode}`, `ss-wrapper-${options.font.family}`]">
        <div id="reader-content" ref="readerContent" class="ss-wrapper-tiny" :style="{ fontSize: `${options.font.size}px` }" v-html="data.content" />
      </div>
    </div>
    <SModal :open="openBible" :no-padding="true" @close="openBible = false">
      <div class="m-5">
        <button v-for="bible in data.bible" :key="bible.name" :class="{ 'bg-gray-200': bible.name === selectedVersion }" class="py-2 px-3 hover:bg-gray-100 first:rounded-l-md last:rounded-r-md border-l border-t border-b last:border-r border-gray-200 shadow-sm" @click="selectedVersion = bible.name">
          {{ bible.name }}
        </button>
      </div>
      <div class="reader">
        <div class="ss-wrapper">
          <div class="ss-wrapper-theme  p-5" :class="[`ss-wrapper-${currentMode}`]">
            <div v-html="verse" />
          </div>
        </div>
      </div>
    </SModal>
  </div>
</template>

<style lang="scss">
.reader {
  h1, h2, h3, h4, h5 {
    @apply my-5 first:mt-0 font-bold;
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  p {
    @apply mb-3;
  }

  blockquote {
    @apply mb-4;
  }

  ol {
    @apply list-decimal list-inside mb-3;
  }

  ul {
    @apply list-disc list-inside mb-3;
  }

  #ss-wrapper, #ss-wrapper-font, #ss-wrapper-size, #ss-wrapper-theme {

  }

  #ss-wrapper-theme {
    padding: 20px;
    transition: all 0.6s ease;
  }

  .ss-wrapper-andada {
    font-family: 'lora', 'Lora', serif;
  }

  .ss-wrapper-lato {
    font-family: 'lato', 'Lato', sans-serif;
  }

  .ss-wrapper-pt-serif {
    font-family: 'pt serif', 'PTSerif', serif;
  }

  .ss-wrapper-pt-sans {
    font-family: 'pt sans', 'PTSans', sans-serif;
  }

  .ss-wrapper-tiny {
    font-size: .8em;
    line-height: 1.2em;
  }

  .ss-wrapper-tiny .textarea {
    line-height: 1.5em;
    background-size: 100% 1.5em;
  }

  .ss-wrapper-small {
    font-size: 1em;
    line-height: 1.4em;
  }

  .ss-wrapper-small .textarea {
    line-height: 1.7em;
    background-size: 100% 1.7em;
  }

  .ss-wrapper-medium {
    font-size: 1.2em;
    line-height: 1.5em;
  }

  .ss-wrapper-medium .textarea {
    line-height: 1.8em;
    background-size: 100% 1.8em;
  }

  .ss-wrapper-large {
    font-size: 1.4em;
    line-height: 1.6em;
  }

  .ss-wrapper-large .textarea {
    line-height: 1.9em;
    background-size: 100% 1.9em;
  }

  .ss-wrapper-huge {
    font-size: 1.6em;
    line-height: 1.7em;
  }

  .ss-wrapper-huge .textarea {
    line-height: 2em;
    background-size: 100% 2em;
  }

  .ss-wrapper-light {
    background-color: #fdfdfd;
    color: #222;
  }

  .ss-wrapper-sepia {
    background-color: #fbf0d9;
    color: #5b4636;
  }

  .ss-wrapper-sepia code, .ss-wrapper-sepia blockquote {
    background-color: #efebe4;
  }

  .ss-wrapper-dark {
    background-color: #000000;
    color: #adadad;
  }

  .ss-wrapper-dark code, .ss-wrapper-dark blockquote {
    background-color: #000000;
  }

  .ss-wrapper-sepia a {
    color: #5b4636;
  }

  .ss-wrapper-dark a {
    border-bottom: 1px solid #ccc !important;
    color: #adadad;
  }

  .ss-wrapper-dark .textarea, .ss-wrapper-dark code {
    box-shadow: none;
  }

  .ss-wrapper-dark .textarea {
    background-color: #121212;
    color: #adadad;
    background-image: -webkit-linear-gradient(#434343 1px, rgba(0, 0, 0, 0) 1px);
  }

  .ss-wrapper-dark .textarea-border {
    background: #434343;
  }

  .ss-wrapper p {
    padding: 0 0 10px 0;
  }

  .highlight_orange {
    background-color: #F59569;
    color: #222 !important;
    border-radius: 5px;
    margin: 0 -3px;
    padding: 0 3px;
  }

  .highlight_yellow {
    background-color: #FFF3A0;
    color: #222 !important;
    border-radius: 5px;
    margin: 0 -3px;
    padding: 0 3px;
  }

  .highlight_green {
    background-color: #63D724;
    color: #222 !important;
    border-radius: 5px;
    margin: 0 -3px;
    padding: 0 3px;
  }

  .highlight_blue {
    background-color: #69D2F5;
    color: #222 !important;
    border-radius: 5px;
    margin: 0 -3px;
    padding: 0 3px;
  }

  .highlight_underline {
    border-bottom: 1px solid #DF381D;
    padding-bottom: 0.2em;
  }

  a.highlight_underline {
    border-bottom: 2px solid #005EC7;
  }

  a {
    border-bottom: 1px solid #005EC7;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;
    padding-bottom: 0.2em;
    color: #222;
  }

  a:not(.verse) {
    word-break: break-all;
  }

  blockquote {
    background: #f9f9f9;
    border-left: 5px solid #ccc;
    padding: 0.5em 10px;
  }

  blockquote > p {
    margin: 0 0 10px 0;
    font-variant: small-caps;
    font-weight: bold;
  }

  code {
    font-family: inherit;
    background: #f9f9f9;
    padding: 20px;
    display: block;
    font-weight: bold;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    position: relative;
    box-shadow: 0 3px 5px 0 rgba(202, 202, 202, 0.75);
  }

  .textarea-container {
    position: relative;
  }

  .textarea {
    font-weight: normal;
    color: #222;
    resize: none;
    width: 100%;
    display: block;
    line-height: inherit;
    border: 0;
    outline: 0;
    padding: 5px 20px 5px 60px;
    border-radius: 0 !important;
    background-color: #faf8fa;
    background-attachment: local;
    background-image: -webkit-linear-gradient(#dedede 1px, rgba(0, 0, 0, 0) 1px);
    min-height: 70px;
    box-shadow: 0 3px 5px 0 rgba(202, 202, 202, 0.75);
  }

  .textarea-border {
    position: absolute;
    height: 100%;
    width: 1px;
    background: #ffcacb;
    top: 0;
    left: 40px;
  }

  h3 {
    font-variant: small-caps;
  }

  sup {
    font-style: italic;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    padding: 0;
    display: block;
    overflow: auto;
    width: 100% !important;
    margin: 15px 0;
  }
  table tr {
    border-top: 1px solid #cccccc;
    background-color: white;
    margin: 0;
    padding: 0;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }

  table tr th {
    font-weight: bold;
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
  }

  table tr td {
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
  }

  table tr th :first-child, table tr td :first-child {
    margin-top: 0;
  }

  table tr th :last-child, table tr td :last-child {
    margin-bottom: 0;
  }

  .ss-donation-appeal {
    display: block !important;
    @apply mb-3;

    .ss-donation-appeal-title {
      background-image: linear-gradient(90deg, #8F8F8F 0%, #C8C8C8 100%);
      padding: 2px 6px;
      border-radius: 3px;
      position: relative;
      cursor: pointer;
      p {
        color: #ffffff;
        margin: 0;
        padding: 0;
      }
      .ss-donation-appeal-icon {
        transition: all 0.3s ease;
      }
    }

    .ss-donation-appeal-text {
      display: none;
      padding: 6px;
      background-color: #F8F8F8;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
    }

    &.ss-donation-appeal-expanded {
      @apply mb-0;

      .ss-donation-appeal-title {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        .ss-donation-appeal-icon {
          transform: translate(-50%,-50%) rotate(180deg);
        }
      }

      // TODO: add smooth transition
      .ss-donation-appeal-text {
        display: block;
      }
    }
  }

  .ss-wrapper-dark .ss-donation-appeal-title {
    background: #505050;
  }

  .ss-wrapper-dark .ss-donation-appeal-title p {
    background: #505050;
    color: #c0c2c2;
  }

  .ss-donation-appeal-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%,-50%);
    height: 20px;
    width: 20px;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='white' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/%3E%3C/svg%3E%0A");
  }

  .ss-wrapper-dark .ss-donation-appeal-text {
    background-color: #38383a;
  }

  .ss-wrapper-sepia .ss-donation-appeal-text {
    background-color: #ffe0a7;
  }
}
</style>
