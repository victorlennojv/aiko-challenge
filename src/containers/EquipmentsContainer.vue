<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useEquipmentStore } from '@/stores/equipment.store'
import { storeToRefs } from 'pinia'
import EquipmentsList from '@/components/Equipments/EquipmentsList.vue'

const EquipmentModal = defineAsyncComponent(() => import('@/components/Equipments/EquipmentModal.vue'))

const equipmentStore = useEquipmentStore()
const { 
  equipments, 
  // equipmentStates, 
  // equipmentsModels, 
  // equipmentsPositionHistory, 
  // equipmentsStateHistory,
  loading 
} = storeToRefs(equipmentStore)

const modalActive = ref(true)

onMounted(async () => {
  await equipmentStore.getEquipments()
  await equipmentStore.getEquipmentModels()
  await equipmentStore.getEquipmentStates()
  await equipmentStore.getEquipmentsStateHistory()
  await equipmentStore.getEquipmentsPositionHistory()
})

</script>

<template>
  <BaseCardTitle
    title="Gestão de equipamentos"
    icon="mdi-tractor"
  />
  <v-card
    flat
    class="mt-4"
  >
    <BaseLoadingSpinner
      v-if="loading"
      size="48px"
      border-width="6px"
    />
    <EquipmentsList
      v-else
      :equipments="equipments"
    />
    <EquipmentModal v-if="modalActive" />
  </v-card>
</template>


<style lang="scss" scoped>
  
</style>
