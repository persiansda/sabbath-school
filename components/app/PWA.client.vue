<template>
  <div v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh" class="max-w-screen-lg mx-auto fixed bg-white inset-x-3 p-3 bottom-5 rounded-lg drop-shadow-2xl flex gap-4 flex-wrap md:flex-nowrap text-center md:text-left items-center justify-center md:justify-between z-10">
    <div class="w-full flex items-center">
      <img width="50" class="mt-1" src="/assets/images/logo.png">
      <span class=" text-ss-primary whitespace-nowrap">
        By installing this app, you'll be able to use it offline.
      </span>
    </div>
    <div class="flex gap-4 items-center flex-shrink-0">
      <button class="bg-gray-200 px-5 py-2 text-gray-500 rounded-md hover:text-white hover:bg-gray-400 focus:outline-none" @click="$pwa.cancelInstall()">
        Close
      </button>
      <button class="bg-ss-primary px-5 py-2 text-white rounded-md hover:bg-green-500 focus:outline-none" @click="$pwa.install()">
        Install
      </button>
    </div>
    <!-- <div
      v-if="$pwa?.offlineReady || $pwa?.needRefresh"
      class="pwa-toast"
      role="alert"
    >
      <div class="message">
        <span v-if="$pwa.offlineReady">
          App ready to work offline
        </span>
        <span v-else>
          New content available, click on reload button to update.
        </span>
      </div>
      <button
        v-if="$pwa.needRefresh"
        @click="$pwa.updateServiceWorker()"
      >
        Reload
      </button>
      <button @click="$pwa.cancelPrompt()">
        Close
      </button>
    </div> -->
  </div>
</template>

<style lang="scss">
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
