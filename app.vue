<script lang="ts" setup>
import { appAuthor, appGooglePlayId, appGooglePlayName, appGooglePlayUrl, appThemeColor } from '~/constants/app'

const gradient = 'linear-gradient(to right, #2e5797, #3b82f6)'
const { t } = useI18n()

useSeoMeta({
  titleTemplate: `${t('app.title')}`,
  title: `${t('app.title')}`,
  ogSiteName: `${t('app.title')}`,
  // description: 'Welcome to my website',
  // ogImage: appImage,
  // ogImageAlt: `${t('app.title')}`,
  // twitterImage: appImage,
  // twitterImageAlt: `${t('app.title')}`,

  twitterAppIdGoogleplay: appGooglePlayId,
  twitterAppUrlGoogleplay: appGooglePlayUrl,
  twitterAppNameGoogleplay: appGooglePlayName,

  themeColor: appThemeColor,
  author: appAuthor,
  creator: appAuthor,
})
</script>

<template>
  <Html>
    <Head>
      <SeoKit :language="$i18n.locale" />
    </Head>
    <Body>
      <NuxtScrollIndicator :color="gradient" shadow="0px 0px 3px #2e5797" />
      <NuxtLoadingIndicator :color="gradient" />
      <!-- pointer-events-none -->
      <!-- <DebugHead class="overflow-auto z-10 absolute opacity-90" /> -->
      <!-- <VitePwaManifest /> -->
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(7px); */
}
</style>
