import L from 'leaflet'
import { ref } from 'vue'
import garra from '@/assets/img/garra.png'
import carga from '@/assets/img/caminhao-de-carga.png'
import harvester from '@/assets/img/combine-harvester.png'
import { normalizeIsoDate } from '@/utils/utils'
import type { IEquipmentSummary } from '@/types/equipment.types'


const EQUIPMENT_ICONS: Record<string, string> = {
  'Garra traçadora': garra,
  'Caminhão de carga': carga,
  'Harvester': harvester,
}

const MAP_CONFIG = {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}

const ICON_SIZE: L.PointTuple = [41, 41]
const ICON_ANCHOR: L.PointTuple = [30, 20]

export const useGeneralMap = () => {
  const map = ref<L.Map>()

  const createMap = (containerId: string, equipments: IEquipmentSummary[]) => {
    if (!equipments.length) return

    const center = equipments[equipments.length - 1].lastPosition
    map.value = L.map(containerId).setView([center?.lat ?? 0, center?.lon ?? 0], 10)

    setTimeout(() => {
      map.value!.invalidateSize()
    }, 500)

    L.tileLayer(MAP_CONFIG.tileUrl, {
      maxZoom: MAP_CONFIG.maxZoom,
      attribution: MAP_CONFIG.attribution
    }).addTo(map.value!)

    equipments.forEach(equipment => addEquipmentMarker(equipment))
  }

  const addEquipmentMarker = (equipment: IEquipmentSummary) => {
    const icon = L.icon({
      iconUrl: EQUIPMENT_ICONS[equipment.modelName ?? ''] || '',
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR
    })

    const popupContent = createPopupContent(equipment)

    L.marker(
      [equipment?.lastPosition?.lat ?? 0, equipment?.lastPosition?.lon ?? 0],
      { icon }
    )
      .addTo(map.value!)
      .bindPopup(popupContent)
  }

  const createPopupContent = (equipment: IEquipmentSummary): string => {
    return `
      <strong>${equipment.equipmentName}</strong><br/>
      Modelo: ${equipment.modelName}<br/>
      Estado: <span style="color:${equipment.lastStateColor}">${equipment.lastStateName}</span><br/>
      Última atualização: ${normalizeIsoDate(equipment?.lastPositionDate || '')} <br/><br/>
      Últimos estados:<br/>
      ${formatRecentStates(equipment.recentStates)}
    `
  }

  const formatRecentStates = (states: IEquipmentSummary['recentStates']): string => {
    if (!states?.length) return ''

    return states.map(state => `
      <span style="color:${state.color}">
        ${state.name}
      </span> - ${normalizeIsoDate(state?.date ?? '')}`
    ).join('<br/>')
  }


  const destroyMap = () => {
    if (map.value) {
      map.value.remove()
    }
  }

  return {
    createMap,
    destroyMap,
    map
  }
}