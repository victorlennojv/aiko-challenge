<script lang="ts" setup>
import { ref } from 'vue'

const dialog = ref(true)

</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    transition="dialog-top-transition"
    width="auto"
  >
    <template #default="{ isActive }">
      <v-card>
        <v-toolbar title="Opening from the Top" />

        <v-card-text class="text-h2 pa-12">
          Hello world!
        </v-card-text>

        <v-card-actions class="justify-end">
          <v-btn
            text="Close"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped>
  
</style>
