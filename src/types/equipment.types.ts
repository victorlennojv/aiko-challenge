export interface IEquipment {
  id: string
  equipmentModelId: string
  name: string
}

export interface IEquipmentPosition {
  date: string
  lat: number
  lon: number
}

export interface IEquipmentPositionHistory {
  equipmentId: string
  positions: IEquipmentPosition[]
}

export interface IHourlyEarning {
  equipmentStateId: string
  value: number
}

export interface IEquipmentModel {
  id: string
  name: string
  hourlyEarnings: IHourlyEarning[]
}

export interface IEquipmentStateDefinition {
  id: string
  name: string
  color: string
}

export interface IEquipmentStates {
  date: string
  equipmentStateId: string
}

export interface IEquipmentStateHistory {
  equipmentId: string
  states: IEquipmentStates[]
}

