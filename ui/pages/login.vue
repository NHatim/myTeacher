<template>
<div class="login-form">

bla
</div>
</template>

<script>
export default {
   props: {
      // eslint-disable-next-line vue/require-default-prop
      source: String,
   },
   data: () => ({
      drawer: false,
   }),
}
</script>

<style>
.login-form {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   min-height: 100vh;
   background-color: #eee;
}
</style>
