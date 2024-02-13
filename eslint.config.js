import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    "dist",
    "node_modules",
    ".output",
    ".nuxt",
    "public/assets/js/*",
  ],
  rules: {
    'vue/multi-word-component-names': [0],
    'vue/no-multiple-template-root': [0],
    'no-console': [0],
    'vue/no-restricted-syntax': [
      'error',
      {
        'selector': 'VElement[name="a"]',
        'message': 'Use NuxtLink instead.'
      },
      {
        'selector': 'VElement[name="router-link"]',
        'message': 'Use NuxtLink instead.'
      }
    ]
  },
})
