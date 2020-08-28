<template>
  <div class="body__wrapper">
    <div class="body__header">
    </div>
    <div class="body__container">
      <nuxt/>
    </div>
    <div class="body__footer">
    </div>
  </div>

</template>

<script>
    export default {
        head: {
            bodyAttrs: {
                class: 'body'
            }
        }
    }
</script>
