import type { IEquipment, IEquipmentModel, IEquipmentPositionHistory, IEquipmentStateDefinition, IEquipmentStateHistory, IEquipmentSummary } from '@/types/equipment.types'

export function normalizeIsoDate(isoDate: string): string {
  const date = new Date(isoDate)

  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}


function findItemById<T>(id: string, list: T[], idField: keyof T, returnField: keyof T): string {
  const item = list.find(item => item[idField] === id)
  return item ? String(item[returnField]) : '-'
}


export function normalizeModelName(modelId: string, equipmentList: IEquipmentModel[]): string {
  return findItemById(modelId, equipmentList, 'id', 'name')
}


export function normalizeStateName(stateId: string, stateList: IEquipmentStateDefinition[]): string {
  return findItemById(stateId, stateList, 'id', 'name')
}


export function getStateColor(stateId: string, stateList: IEquipmentStateDefinition[]): string {
  return findItemById(stateId, stateList, 'id', 'color')
}

function getLastItemByDate<T>(items: T[], dateField: keyof T): T | null {
  if (!items.length) return null

  return [...items].sort((a, b) =>
    new Date(String(b[dateField])).getTime() - new Date(String(a[dateField])).getTime()
  )[0]
}


export function getEquipmentSummary(
  equipments: IEquipment[],
  models: IEquipmentModel[],
  states: IEquipmentStateDefinition[],
  positionsHistory: IEquipmentPositionHistory[],
  stateHistory: IEquipmentStateHistory[]
): IEquipmentSummary[] {
  return equipments.map(equipment => {
    const model = models.find(m => m.id === equipment.equipmentModelId);

    const positionData = positionsHistory.find(p => p.equipmentId === equipment.id);
    const stateData = stateHistory.find(s => s.equipmentId === equipment.id);

    const lastPosition = positionData?.positions?.length
      ? getLastItemByDate(positionData.positions, 'date')
      : null;

    const sortedStates = stateData?.states?.length
      ? [...stateData.states].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      : []

    const lastState = sortedStates[0] ?? null

    const stateInfo = lastState
      ? states.find(state => state.id === lastState.equipmentStateId)
      : null;

    const recentStates = sortedStates.slice(0, 4).map(state => {
      const stateDef = states.find(s => s.id === state.equipmentStateId)
      return {
        name: stateDef?.name ?? null,
        color: stateDef?.color ?? null,
        date: state.date
      }
    })

    return {
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      modelName: model?.name ?? null,
      lastStateName: stateInfo?.name ?? null,
      lastStateColor: stateInfo?.color ?? null,
      lastStateDate: lastState?.date ?? null,
      lastPosition: lastPosition ? { lat: lastPosition.lat, lon: lastPosition.lon } : null,
      lastPositionDate: lastPosition?.date ?? null,
      recentStates
    };
  });
}