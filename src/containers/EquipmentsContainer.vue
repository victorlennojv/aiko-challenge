<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEquipmentStore } from '@/stores/equipment'
import { storeToRefs } from 'pinia'

const equipmentStore = useEquipmentStore()
const { equipments, loading, error } = storeToRefs(equipmentStore)

onMounted(async () => {
  await equipmentStore.fetchEquipments()
})
</script>

<template>
  <v-card
    flat
    color="primary"
  >
    <v-card-title>
      Gestão de Equipamentos
    </v-card-title>
  </v-card>
</template>


<style lang="scss" scoped>
  
</style>
