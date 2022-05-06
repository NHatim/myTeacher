<template>
<div class="bg-image">
<div class="slide-right">
<h2>Bienvenue sur my Teacher, le teacher qu'il vous faut</h2>
</div>


</div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style scoped>
.bg-image {
  background-image: url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  height: 80vh;
}
div.slide-right {
  position: absolute;
  top: 20%;
  margin-left: 5%;
  color : dimgrey;
  width:100%;
  overflow:hidden;
}
div.slide-right h2 {
  animation: 2s slide-right;
}

@keyframes slide-right {
  from {
    margin-left: -100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
</style>
