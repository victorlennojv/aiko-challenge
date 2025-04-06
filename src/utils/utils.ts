import type { IEquipmentModel, IEquipmentStateDefinition } from '@/types/equipment.types'

function normalizeIsoDate(isoDate: string): string {
  const date = new Date(isoDate)

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}


function normalizeModelName(modelId: string, equipmentList: IEquipmentModel[]): string {
  const model = equipmentList.find(item => item.id === modelId)
  return model ? model.name : '-'
}

function normalizeStateName(stateId: string, stateList: IEquipmentStateDefinition[]): string {
  const state = stateList.find(item => item.id === stateId)
  return state ? state.name : '-'
}

function getStateColor(stateId: string, stateList: IEquipmentStateDefinition[]): string {
  const state = stateList.find(item => item.id === stateId)
  return state ? state.color : '-'
}

export {
  normalizeIsoDate,
  normalizeModelName,
  normalizeStateName,
  getStateColor,
}