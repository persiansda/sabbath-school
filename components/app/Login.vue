<script lang="ts" setup>
const id = '96814818762-q2av26f1s4rqj9ueqlp8b7ee8gep5en1.apps.googleusercontent.com'
const googleLoginBtn = ref()

const handleCredentialResponse = async function (response: any) {
  try {
    const r = await fetch('/api/auth/signin/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_token: response.credential }),
    })
    const data = await r.json()
    console.log(data)
  }
  catch (err) {}
}

onMounted(() => {

})

useHead({
  script: [
    {
      src: 'https://accounts.google.com/gsi/client',
      defer: true,
      async: true,
      onload: () => {
        window.google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        window.google.accounts.id.renderButton(
          googleLoginBtn.value, { theme: 'outline', size: 'large' },
        )
      },
    },
  ],
})
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <button ref="googleLoginBtn" class="w-52 max-w-52 mb-3" />
    <!-- <div id="appleid-signin" class="z-10 w-52 h-10 signin-button" data-color="black" data-border="true" data-type="sign-in" /> -->
  </div>
</template>

<style lang="scss">

</style>
