import { defineStore } from 'pinia'
import { ref } from 'vue'
import equipmentData from '@/mockDB/equipment.json'
import equipmentModel from '@/mockDB/equipmentModel.json'
import equipmentPositionHistory from '@/mockDB/equipmentPositionHistory.json'
import equipmentStateHistory from '@/mockDB/equipmentStateHistory.json'
import equipmentState from '@/mockDB/equipmentState.json'
import {
  type IEquipmentModel,
  type IEquipmentPositionHistory,
  type IEquipment,
  type IEquipmentStateDefinition,
  type IEquipmentStateHistory,
} from '@/types'


export const useEquipmentStore = defineStore('equipment', () => {
  const equipments = ref<IEquipment[]>([])
  const equipmentsPositionHistory = ref<IEquipmentPositionHistory[]>([])
  const equipmentsModels = ref<IEquipmentModel[]>([])
  const equipmentStates = ref<IEquipmentStateDefinition[]>([])
  const equipmentsStateHistory = ref<IEquipmentStateHistory[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchData(
    action: () => Promise<void>,
    errorMessage: string
  ): Promise<void> {
    try {
      error.value = null
      await action()
    } catch (err) {
      error.value = `${errorMessage}: ${err}`
      console.error(error.value)
    }
  }

  async function getEquipments() {
    try {
      loading.value = true
      error.value = null

      await new Promise(resolve => setTimeout(resolve, 500))

      equipments.value = equipmentData
    } catch (err) {
      error.value = `Failed to fetch equipments: ${err}`
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  async function getEquipmentsPositionHistory() {
    await fetchData(
      async () => {
        equipmentsPositionHistory.value = equipmentPositionHistory
      },
      'Failed to fetch equipments position history'
    )
  }

  async function getEquipmentModels() {
    await fetchData(
      async () => {
        equipmentsModels.value = equipmentModel
      },
      'Failed to fetch equipments model'
    )
  }

  async function getEquipmentStates() {
    await fetchData(
      async () => {
        equipmentStates.value = equipmentState
      },
      'Failed to fetch equipment states'
    )
  }

  async function getEquipmentsStateHistory() {
    await fetchData(
      async () => {
        equipmentsStateHistory.value = equipmentStateHistory
      },
      'Failed to fetch equipments state History'
    )
  }

  return {
    equipments,
    equipmentsPositionHistory,
    equipmentsModels,
    equipmentStates,
    equipmentsStateHistory,
    loading,
    error,

    getEquipments,
    getEquipmentsPositionHistory,
    getEquipmentModels,
    getEquipmentStates,
    getEquipmentsStateHistory,
  }
})