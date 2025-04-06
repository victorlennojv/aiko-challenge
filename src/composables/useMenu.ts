import { ref } from 'vue';

type Menu = {
  name: string;
  icon: string;
  redirect?: string;
};

export function useMenu() {
  const menu = ref<Menu[]>([
    {
      name: 'Início',
      icon: 'mdi-home-outline',
      redirect: '/',
    },
    {
      name: 'Equipamentos',
      icon: 'mdi-state-machine',
      redirect: '/equipments',
    },
    {
      name: 'Visão Geral',
      icon: 'mdi-map',
      redirect: '/general',
    },
    {
      name: 'Sair',
      icon: 'mdi-logout',
      redirect: '',
    },

  ]);

  return menu;
}
