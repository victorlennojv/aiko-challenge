export interface IEquipment {
  id: string
  equipmentModelId: string
  name: string
}

interface IEquipmentPosition {
  date: string
  lat: number
  lon: number
}

export interface IEquipmentPositionHistory {
  equipmentId: string
  positions: IEquipmentPosition[]
}

interface IHourlyEarning {
  equipmentStateId: string
  value: number
}

export interface IEquipmentModel {
  id: string
  name: string
  hourlyEarnings: IHourlyEarning[]
}

export interface IEquipmentState {
  id: string
  name: string
  color: string
}

interface IEquipmentStateEntry {
  date: string
  equipmentStateId: string
}

export interface IEquipmentStateHistory {
  equipmentId: string
  states: IEquipmentStateEntry[]
}

