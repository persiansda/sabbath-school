<template>
  <div class="md:flex grow">
    <div id="quarterlyWeek" class="ml-6 mt-4 md:mr-6 ml-0 md:mt-0 mb-4 md:mb-0 grow md:w-3/12 lg:w-9/12 xl:w-10/12">
      <div class="rounded border border-1 border-gray-150 h-full">
        <div class="rounded-t h-ss-cover bg-center bg-cover flex flex-col">
          <div class="grow animate-pulse bg-gray-300" />
        </div>
        <SShimmerReader />
      </div>
    </div>
    <div class="shrink-0 flex justify-center md:justify-start md:flex-col md:items-end md:w-3/12 lg:w-3/12 xl:w-2/12">
      <div class="md:block grid grid-cols-3 md:text-right ss-sidebar-sticky">
        <div v-for="item in 24" :key="item" class="mb-1 flex items-center md:justify-end-200 px-2 py-2 rounded">
          <div class="animate-pulse bg-gray-300 rounded h-3 w-32" />
        </div>
      </div>
    </div>
  </div>
</template>
