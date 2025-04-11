import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import {
  type IEquipmentSummary,
  type IEquipment,
  type IEquipmentModel,
  type IEquipmentStateDefinition,
  type IEquipmentPositionHistory,
  type IEquipmentStateHistory
} from '@/types/equipment.types'
import { getEquipmentSummary } from '@/utils/utils'


interface EquipmentSummaryParams {
  equipments: Ref<IEquipment[]>
  equipmentsModels: Ref<IEquipmentModel[]>
  equipmentStates: Ref<IEquipmentStateDefinition[]>
  equipmentsPositionHistory: Ref<IEquipmentPositionHistory[]>
  equipmentsStateHistory: Ref<IEquipmentStateHistory[]>
}

export function useEquipmentSummary(params: EquipmentSummaryParams) {
  const mappedEquipmentList = ref<IEquipmentSummary[]>([])

  const areAllDataLoaded = () => {
    return (
      params.equipments.value.length > 0 &&
      params.equipmentsModels.value.length > 0 &&
      params.equipmentStates.value.length > 0 &&
      params.equipmentsPositionHistory.value.length > 0 &&
      params.equipmentsStateHistory.value.length > 0
    )
  }

  watch(
    () => [
      params.equipments.value,
      params.equipmentsModels.value,
      params.equipmentStates.value,
      params.equipmentsPositionHistory.value,
      params.equipmentsStateHistory.value
    ],
    () => {
      if (areAllDataLoaded()) {
        mappedEquipmentList.value = getEquipmentSummary(
          params.equipments.value,
          params.equipmentsModels.value,
          params.equipmentStates.value,
          params.equipmentsPositionHistory.value,
          params.equipmentsStateHistory.value
        )
      }
    },
    { immediate: true }
  )

  return {
    mappedEquipmentList,
  }
}