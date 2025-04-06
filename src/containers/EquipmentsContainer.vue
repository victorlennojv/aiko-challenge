<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useEquipmentStore } from '@/stores/equipment.store'
import { storeToRefs } from 'pinia'
import EquipmentsList from '@/components/Equipments/EquipmentsList.vue'
import type { IEquipmentStateHistory, IEquipment, IEquipmentPositionHistory } from '@/types/equipment.types'

const EquipmentModal = defineAsyncComponent(() => import('@/components/Equipments/EquipmentModal.vue'))

const equipmentStore = useEquipmentStore()
const { 
  equipments, 
  equipmentStates, 
  equipmentsModels, 
  equipmentsPositionHistory, 
  equipmentsStateHistory,
  loading 
} = storeToRefs(equipmentStore)

const modalActive = ref(false)

const selectedEquipment = ref<IEquipment | null>(null)

const selectedEquipmentPositionHistory = computed<IEquipmentPositionHistory[]>(() => {
  if (!selectedEquipment.value) return []
  return equipmentsPositionHistory.value.filter((item) => item.equipmentId === selectedEquipment?.value?.id)
})

const selectedEquipmentStateHistory = computed<IEquipmentStateHistory[]>(() => {
  if (!selectedEquipment.value) return []
  const history = equipmentsStateHistory.value.filter((item) => item.equipmentId === selectedEquipment?.value?.id)
  return history
})

const openEquipmentModal = (equipment: IEquipment) => {
  selectedEquipment.value = equipment
  modalActive.value = true
}

const onCloseEquipmentModal = () => {
  selectedEquipment.value = null
  modalActive.value = false
}

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
      :equipments-models="equipmentsModels"
      :equipment-states="equipmentStates"
      :equipment-state-history="selectedEquipmentStateHistory"
      @equipment-click="openEquipmentModal"
    />
    <EquipmentModal 
      v-if="modalActive && selectedEquipment"
      :equipment="selectedEquipment"
      :equipments-models="equipmentsModels"
      :equipment-states="equipmentStates"
      :equipment-state-history="selectedEquipmentStateHistory"
      :equipment-position-history="selectedEquipmentPositionHistory"
      @on-close="onCloseEquipmentModal"
    />
  </v-card>
</template>


<style lang="scss" scoped>
  
</style>
