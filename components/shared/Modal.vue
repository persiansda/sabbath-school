<script lang="ts" setup>
defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    default: null,
    required: false,
  },
  large: {
    type: Boolean,
    default: false,
  },
  noPadding: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <HeadlessTransitionRoot as="template" :show="open">
    <HeadlessDialog as="div" class="relative z-10 " @close="close()">
      <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </HeadlessTransitionChild>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <HeadlessTransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <HeadlessDialogPanel :class="{ 'xl:max-w-3xl': large }" class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full" style="-webkit-mask-image: -webkit-radial-gradient(white, black);">
              <button ref="cancelButtonRef" type="button" class="fixed outline-none top-5 right-5" @click="close()">
                <Icon name="mdi:close" class="text-gray-600 hover:rotate-90 transition-all" aria-hidden="true" />
              </button>
              <div :class="noPadding ? '' : 'px-4 pt-5 pb-4 sm:p-6 sm:pb-4'">
                <div class="mt-3 text-left sm:mt-0">
                  <div class="mt-2">
                    <h3 v-if="name" class="text-3xl font-bold mb-6">
                      {{ name }}
                    </h3>
                    <slot />
                  </div>
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<style lang="scss">

</style>
