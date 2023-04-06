import { defineStore } from 'pinia';
import { SettingState } from '@/types/store/setting';
import defaultSettings from '../../settings';
import { localStorage } from '@/utils/storage';

const { tagsView, fixedHeader, sidebarLogo } = defaultSettings;

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): SettingState => ({
    tagsView:
      localStorage.get('tagsView') != null
        ? localStorage.get('tagsView')
        : tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  }),
  actions: {
    async changeSetting(payload: { key: string; value: any }) {
      const { key, value } = payload;
      switch (key) {
        case 'fixedHeader':
          this.fixedHeader = value;
          break;
        case 'tagsView':
          this.tagsView = value;
          localStorage.set('tagsView', value);
          break;
        case 'sidebarLogo':
          this.sidebarLogo = value;
          break;
        default:
          break;
      }
    }
  }
});

export default useSettingStore;
