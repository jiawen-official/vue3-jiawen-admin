/* 图表自适应 */
import { ref } from 'vue';
// import { throttle } from '@/utils';
export default function () {
  const chart = ref<any>();

  //节流处理，100ms执行一次，如果影响体验可以放开
  // const chartResizeHandler = throttle(
  //   () => {
  //     if (chart.value) {
  //       chart.value.resize();
  //     }
  //   },
  //   100,
  //   2
  // );
  const chartResizeHandler = () => {
    if (chart.value) {
      chart.value.resize();
    }
  };

  const initResizeEvent = () => {
    window.addEventListener('resize', chartResizeHandler, { passive: true });
  };

  const destroyResizeEvent = () => {
    window.removeEventListener('resize', chartResizeHandler);
  };

  const mounted = () => {
    initResizeEvent();
  };

  const beforeDestroy = () => {
    destroyResizeEvent();
  };

  const activated = () => {
    initResizeEvent();
  };

  const deactivated = () => {
    destroyResizeEvent();
  };

  return {
    chart,
    mounted,
    beforeDestroy,
    activated,
    deactivated
  };
}
