<script lang="ts" setup>
interface Equipment {
  id: string
  equipmentModelId: string
  name: string
}

interface Props {
  equipments: Equipment[];
}

const props = defineProps<Props>()

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Modelo', key: 'equipmentModelId' },
  { title: 'Ver posição', align: 'end'}
]

</script>

<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="props.equipments"
      class="text-caption"
      density="compact"
      item-value="name"
      hide-default-footer
      hover
    >
      <template #item="{ item }">
        <tr class="text-no-wrap">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.equipmentModelId }}</td>
          <td class="text-end">
            <v-icon
              class="mr-4"
              size="large"
              @click="() => {}"
            >
              mdi-map
            </v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<style lang="scss" scoped>
  
</style>
