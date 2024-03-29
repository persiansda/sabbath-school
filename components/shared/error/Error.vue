<script lang="ts" setup>
withDefaults(defineProps<{
  code: string
  title: string
  message: string
  redirectPath?: string | null
  redirectText?: string
  centered?: boolean
  back?: boolean
}>(), {
  redirectPath: 'index',
  redirectText: 'home.index',
  centered: true,
  back: true,
})

const { t } = useI18n()

const localePath = useLocalePath()
</script>

<template>
  <div class="ss-error-message" :class="{ centered }">
    <main>
      <div class="ss-error">
        <h1 class="gradient-text">
          <span>
            {{ code }}
          </span>
        </h1>
      </div>
      <div class="ss-detail">
        <h2>
          {{ title }}
        </h2>
        <p>
          {{ message }}
        </p>
      </div>
    </main>
    <div class="flex justify-center mt-5">
      <NuxtLink
        v-if="redirectPath"
        :to="localePath({ name: redirectPath })"
        class="bg-ss-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      >
        {{ t(redirectText) }}
      </NuxtLink>
      <button
        v-if="back"
        class="bg-ss-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        @click="$router.back()"
      >
        {{ $t('app.back') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.ss-error-message {
  text-align: center;

  &.centered {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  main {
    .ss-error {
      padding-right: 20px;
      margin: auto;
      h1 {
        font-size: 10rem;
        font-weight: 900;
        line-height: 1;
        margin: 0;
        span {
          background: linear-gradient(to left, #2e5797 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    .ss-detail {
      border-top: 1px solid #000;
      text-align: center;
      h2 {
        font-size: 2rem;
        font-weight: 900;
        margin: 0;
        padding: 20px 0 0;
      }
    }
  }

  a {
    display: block;
    text-align: center;
  }
}
</style>
