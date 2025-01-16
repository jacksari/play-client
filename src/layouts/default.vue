<script setup lang="ts">
</script>

<template>
  <div class="section">
    <main>
      <slot />
    </main>
  </div>
</template>

<style>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //overflow-x: auto;
}
main{
  //max-width: 800px;
}
</style>
