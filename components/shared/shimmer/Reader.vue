<template>
  <div v-for="item in 2" :key="item" class="flex flex-col md:flex-row flex-wrap my-10 mx-10">
    <div class="m-auto w-64 md:w-auto md:flex-grow mt-8 md:mt-0">
      <div class="animate-pulse bg-gray-200 rounded h-2 mt-3 w-1/2" />
      <div class="animate-pulse bg-gray-200 rounded h-2 mt-2 w-1/2" />
      <div class="animate-pulse bg-gray-200 rounded h-2 mt-2 w-2/5" />
      <div class="animate-pulse bg-gray-200 rounded h-2 mt-2 w-2/3" />
      <div class="animate-pulse bg-gray-200 rounded h-2 mt-2 w-2/5" />
      <div class="animate-pulse bg-gray-200 rounded h-2 mt-2 w-1/2" />

      <div class="animate-pulse bg-gray-200 rounded h-3 mt-10 w-1/3" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/5" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/4" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/6" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/5" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/3" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/5" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/4" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/6" />
      <div class="animate-pulse bg-gray-200 rounded h-3 mt-3 w-1/5" />
    </div>
  </div>
</template>
