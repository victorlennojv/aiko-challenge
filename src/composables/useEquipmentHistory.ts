import { computed } from 'vue'
import type { IEquipmentPositionHistory, IEquipmentStateHistory } from '@/types/equipment.types'

export function useEquipmentHistory(
  positionHistory: IEquipmentPositionHistory[],
  stateHistory: IEquipmentStateHistory[]
) {

  const lastPosition = computed(() => {
    if (!positionHistory.length || !positionHistory[0]?.positions?.length) {
      return null
    }

    const positions = positionHistory[0].positions
    return positions[positions.length - 1]
  })

  const lastState = computed(() => {
    if (!stateHistory.length || !stateHistory[0]?.states?.length) {
      return null
    }

    const states = stateHistory[0].states
    return states[states.length - 1]
  })

  const sortedStates = computed(() => {
    if (!stateHistory.length || !stateHistory[0]?.states?.length) {
      return []
    }

    return [...stateHistory[0].states].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  })

  return {
    lastPosition,
    lastState,
    sortedStates
  }
} 