/**
 * @method 函数防抖
 * @desc 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。
 * @param {Function} func 目标函数
 * @param {number} wait 延迟执行毫秒数
 * @param {boolean} immediate true - 立即执行， false - 延迟执行
 */
export function debounce(func: any, wait = 1000, immediate = true) {
  let timer: any;
  return function (this: any, ...args: any) {
    // const args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(this, args);
    } else {
      timer = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  };
}
/**
 * @method 函数节流
 * @desc 指连续触发事件，但是在 n 秒内只执行一次函数。即 2n 秒内执行 2 次... 。会稀释函数的执行频率。
 * @param {Function} func 函数
 * @param {number} wait 延迟执行毫秒数
 * @param {number} type 1 在时间段开始的时候触发 2 在时间段结束的时候触发
 */
export function throttle(func: any, wait = 1000, type = 1) {
  let previous = 0;
  let timeout: any;
  return function (this: any, ...args: any) {
    // const args = arguments;
    if (type === 1) {
      const now = Date.now();
      if (now - previous > wait) {
        func.apply(this, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(this, args);
        }, wait);
      }
    }
  };
}
