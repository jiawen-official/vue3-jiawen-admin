// 全局组件类型声明
import jwPagination from '@/components/views/jw-pagination/jw-pagination.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    jwPagination: typeof jwPagination;
  }
}
export {};
