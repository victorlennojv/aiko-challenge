import { defineStore } from 'pinia'
import { ref } from 'vue'
import equipmentData from '@/mockDB/equipment.json'

interface Equipment {
  id: string
  equipmentModelId: string
  name: string
}

export const useEquipmentStore = defineStore('equipment', () => {

  const equipments = ref<Equipment[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchEquipments() {
    try {
      loading.value = true
      error.value = null

      await new Promise(resolve => setTimeout(resolve, 1000))

      equipments.value = equipmentData
    } catch (err) {
      error.value = `Failed to fetch equipments: ${err}`
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  async function getEquipmentById(id: string) {
    try {
      loading.value = true
      error.value = null

      await new Promise(resolve => setTimeout(resolve, 500))

      const equipment = equipmentData.find(eq => eq.id === id)
      if (!equipment) {
        throw new Error('Equipment not found')
      }
      return equipment
    } catch (err) {
      error.value = `Failed to fetch equipment: ${err}`
      console.error(error.value)
      return null
    } finally {
      loading.value = false
    }
  }

  async function getEquipmentsByModelId(modelId: string) {
    try {
      loading.value = true
      error.value = null

      await new Promise(resolve => setTimeout(resolve, 500))

      return equipmentData.filter(eq => eq.equipmentModelId === modelId)
    } catch (err) {
      error.value = 'Failed to fetch equipments by model'
      console.error('Error fetching equipments by model:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    equipments,
    loading,
    error,

    fetchEquipments,
    getEquipmentById,
    getEquipmentsByModelId,
  }
})