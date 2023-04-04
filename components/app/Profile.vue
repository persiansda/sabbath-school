<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const openLogin = ref(false)
</script>

<template>
  <div v-if="authStore.isLoggedIn" class="ml-2">
    <!-- <UserProfileButton :display-name="authStore.displayName || $t('login.anonymous')" /> -->
  </div>

  <button v-else class="hover:bg-gray-200 p-2 rounded flex items-center" @click="openLogin = true">
    <Icon name="mdi:account-arrow-right" class="mr-2" /> {{ $t('login.index') }}
  </button>
  <SModal :open="openLogin" :name="$t('login.index')" @close="openLogin = false">
    <AppLogin />
  </SModal>
</template>
