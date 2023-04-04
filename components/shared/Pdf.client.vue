<!-- TODO: rewrite with composion api -->
<script>
import PSPDFKit from 'pspdfkit'

const TOOLBAR_ITEMS_ALLOWED = ['zoom-in', 'zoom-out', 'zoom-mode', 'spacer', 'ink', 'note', 'annotate', 'text-highlighter', 'layout-mode', 'search']

export default {
  name: 'PSPDFKit',
  props: {
    lesson: {
      type: String,
      required: true,
    },
    pdfs: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      auth: false,
      instances: {},
      annotations: {},
      eventListeners: {},
    }
  },
  async mounted() {
    try {
      for (const [index, pdf] of this.pdfs.entries()) {
        await this.loadAnnotations(pdf)
        await this.loadPSPDFKit(`.pdf-container-${index}`, pdf)
      }
    }
    catch (e) {}
  },
  async beforeUnmount() {
    for (const pdf of this.pdfs) {
      const instance = this.instances[pdf.id]
      if (instance) {
        await this.instances[pdf.id].removeEventListener('annotations.willSave', this.eventListeners[pdf.id])
        PSPDFKit.unload(this.instances[pdf.id])
      }
    }
  },
  methods: {
    async onAnnotationsChange(pdfId) {
      if (this.auth)
        return
      const data = await this.instances[pdfId].exportInstantJSON()
      const annotations = []
      if (data && data.annotations) {
        data.annotations.forEach((a) => {
          annotations.push(JSON.stringify(a))
        })
      }
      try {
        await this.$apiAuth.post(`/annotations/${this.lesson}/${pdfId}`, {
          data: [{ annotations, pageIndex: 0 }],
        })
      }
      catch (e) {}
    },
    async loadAnnotations(pdf) {
      this.annotations[pdf.id] = []
      if (this.auth)
        return
      try {
        const r = await this.$apiAuth.get(`/annotations/${this.lesson}/${pdf.id}`)

        for (const annotation of r.data) {
          // eslint-disable-next-line array-callback-return
          annotation.annotations.map((a) => {
            const innerAnnotation = JSON.parse(a)
            if (!innerAnnotation.id)
              innerAnnotation.id = ''
            this.annotations[pdf.id].push(innerAnnotation)
          })
        }
      }
      catch (e) {}
    },
    async loadPSPDFKit(container, pdf) {
      PSPDFKit.unload(container)
      const toolbarItems = PSPDFKit.defaultToolbarItems.filter(item => TOOLBAR_ITEMS_ALLOWED.includes(item.type))
      const pagerIndex = toolbarItems.findIndex(item => item.type === 'spacer')
      toolbarItems.splice(pagerIndex + 1, 0, { type: 'layout-config' })

      const baseUrl = `${window.location.protocol}//${window.location.host}/assets/js/`
      this.instances[pdf.id] = await PSPDFKit.load({
        baseUrl,
        toolbarItems,
        initialViewState: new PSPDFKit.ViewState({
          zoom: PSPDFKit.ZoomMode.FIT_TO_WIDTH,
        }),
        licenseKey: import.meta.env.VITE_APP_PSPDF_KEY,
        styleSheets: ['/assets/css/pspdfkit.css'],
        document: pdf.src,
        container,
        instantJSON: {
          annotations: JSON.parse(JSON.stringify(this.annotations[pdf.id])),
          format: 'https://pspdfkit.com/instant-json/v1',
        },
      })

      this.eventListeners[pdf.id] = () => {
        this.onAnnotationsChange(pdf.id)
      }

      await this.instances[pdf.id].addEventListener('annotations.willSave', this.eventListeners[pdf.id])
    },
  },
}
</script>

<template>
  <div class="min-h-ss-pdf md:h-full xl:min-h-ss-pdf-xl md:min-h-ss-pdf-md lg:min-h-ss-pdf-lg">
    <HeadlessTabGroup>
      <HeadlessTabList class="border-b border-gray-200" :class="{ 'p-4': pdfs.length > 1 }">
        <HeadlessTab v-for="pdf in pdfs" v-slot="{ selected }" :key="pdf.id" as="template">
          <button v-show="pdfs.length > 1" :class="{ 'bg-black text-white': selected, 'hover:bg-blue-200': !selected }" class="rounded px-4 py-2 mr-2 last:mr-0">
            {{ pdf.title }}
          </button>
        </HeadlessTab>
      </HeadlessTabList>
      <HeadlessTabPanels class="grid min-h-ss-pdf md:h-full xl:min-h-ss-pdf-xl md:min-h-ss-pdf-md lg:min-h-ss-pdf-lg">
        <HeadlessTabPanel v-for="(pdf, i) in pdfs" :key="pdf.id" class="min-h-ss-pdf md:h-full xl:min-h-ss-pdf-xl md:min-h-ss-pdf-md lg:min-h-ss-pdf-lg" :unmount="false" :class="`pdf-container-${i}`" />
      </HeadlessTabPanels>
    </HeadlessTabGroup>
  </div>
</template>

<style lang="scss">

</style>
