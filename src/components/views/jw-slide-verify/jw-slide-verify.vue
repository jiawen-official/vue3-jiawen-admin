<template>
  <div
    class="fui-slideverify__wrap"
    :style="{
      width: width + 'px',
      height: height + 'px',
      background: background
    }"
  >
    <span
      class="fui-sv__text-tip"
      :style="{
        fontSize: size + 'px',
        background: getBackground,
        color: color
      }"
      :class="{ 'fui-sv__opacity': isPass }"
      >{{
        lang === 'zh-cn'
          ? '拖动滑块至虚线框内'
          : 'Drag the slider to the dotted box'
      }}</span
    >
    <div
      class="fui-sv__foreground"
      :class="{ 'fui-sv__reset-ani': resetAni }"
      :style="{ background: activeBgColor, width: fwidth + 'px' }"
    >
      <span
        :class="{ 'fui-sv__opacity': !isPass }"
        class="fui-sv__text-res"
        :style="{ fontSize: size + 'px', color: activeColor }"
        >{{ lang === 'zh-cn' ? '验证通过' : 'Verification passed' }}</span
      >

      <span
        :class="{ 'fui-sv__opacity': isPass }"
        class="fui-sv__text-cover"
        :style="{
          width: width + 'px',
          fontSize: size + 'px',
          height: height + 'px',
          lineHeight: height + 'px',
          color: activeColor
        }"
        >{{
          lang === 'zh-cn'
            ? '拖动滑块至虚线框内'
            : 'Drag the slider to the dotted box'
        }}</span
      >
    </div>
    <div
      class="fui-sv__slider"
      :class="{
        'fui-sv__reset-ani': resetAni
      }"
      :style="{
        width: sliderWidth + 'px',
        borderColor: isPass ? passColor : borderColor,
        transform: transform,
        boxShadow: isPass ? 'none' : '0 1px 6px 0 rgba(32, 33, 36, .28)'
      }"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      @mousedown="mousedown"
    >
      <el-icon :color="arrowColor" :size="iconSize" v-if="!isPass"
        ><DArrowRight
      /></el-icon>
      <el-icon :color="passColor" :size="iconSize" v-else
        ><CircleCheckFilled
      /></el-icon>
    </div>
    <div
      class="fui-sv__dotted-box"
      :style="{
        'border-color': lineColor,
        'border-width': isPass ? 0 : '1px',
        width: sliderWidth + 'px',
        left: targetWidth - Number(sliderWidth) + 'px'
      }"
    ></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'JwSlideVerify'
};
</script>
<script setup lang="ts">
import { reactive, toRefs, onMounted, watch, computed } from 'vue';
import { DArrowRight, CircleCheckFilled } from '@element-plus/icons-vue';
const emit = defineEmits(['success', 'fail']);
const state = reactive({
  transform: '',
  fwidth: 0,
  startX: 0,
  lastLeft: 0,
  resetAni: false,
  targetWidth: 0,
  isPass: false,
  resetNum: 0,
  times: 0,
  isH5: false,
  movable: false
});
const { transform, resetAni, targetWidth, isPass, fwidth } = toRefs(state);
const props = defineProps({
  range: {
    type: [Number, String],
    default: 3
  },
  error: {
    type: [Number, String],
    default: 3
  },
  width: {
    type: [Number, String],
    default: 448
  },
  height: {
    type: [Number, String],
    default: 42
  },
  background: {
    type: String,
    default: '#EEEEEE'
  },
  activeBgColor: {
    type: String,
    default: '#67c23a'
  },
  sliderWidth: {
    type: [Number, String],
    default: 42
  },
  sliderBgColor: {
    type: String,
    default: '#FFFFFF'
  },
  borderColor: {
    type: String,
    default: '#FFFFFF'
  },
  passColor: {
    type: String,
    default: '#67c23a'
  },
  size: {
    type: [Number, String],
    default: 14
  },
  color: {
    type: String,
    default: '#333333'
  },
  activeColor: {
    type: String,
    default: '#FFFFFF'
  },
  iconSize: {
    type: [Number, String],
    default: 18
  },
  arrowColor: {
    type: String,
    default: '#B2B2B2'
  },
  lineColor: {
    type: String,
    default: '#B2B2B2'
  },
  lang: {
    type: String,
    default: 'zh-cn'
  }
});

const getBackground = computed(
  () =>
    `-webkit-gradient(linear, left top, right top, color-stop(0, ${props.color}), color-stop(.4, ${props.color}), color-stop(.5, white), color-stop(.6, ${props.color}), color-stop(1, ${props.color}))`
);

function changeTargetPosi() {
  let range = Array.from(new Array(100 + 1).keys()).slice(50);
  let index = Math.floor(Math.random() * range.length);
  let width = parseInt(
    String((Number(props.width) * (range[index] || 100)) / 100)
  );
  width = width <= props.sliderWidth ? Number(props.sliderWidth) + 20 : width;
  state.targetWidth = parseInt(String(width));
}
function reset() {
  state.resetNum += 1;
  state.isPass = false;
  state.times = 0;
  changeTargetPosi();
}
function success() {
  state.isPass = true;
  emit('success', {});
}
function fail() {
  state.times++;
  if (state.times >= Number(props.error)) {
    changeTargetPosi();
    state.times = 0;
  }
  emit('fail', {});
}

/**
 * 交互操作
 */
watch(
  () => state.resetNum,
  val => {
    state.startX = 0;
    state.lastLeft = 0;
    styleChange(0);
  }
);
function isPC() {
  if (typeof navigator !== 'object') return false;
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod'
  ];
  var flag = true;
  for (var v = 0; v < Agents.length - 1; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

if (typeof window === 'object') state.isH5 = true;

function styleChange(left: number) {
  if (left === 0) {
    state.resetAni = true;
  } else {
    state.resetAni = false;
  }
  state.fwidth = left;
  state.transform = 'translate3d(' + left + 'px,0,0)';
}
function touchstart(e: any) {
  let touch = e.changedTouches && e.changedTouches[0];
  if (state.isH5 && isPC()) {
    touch = e;
  }
  state.startX = touch.pageX;
}
function touchmove(e: any) {
  if (state.isPass) return;
  let touch = e.changedTouches && e.changedTouches[0];
  if (state.isH5 && isPC()) {
    touch = e;
  }
  let pageX = touch.pageX;
  let left = pageX - state.startX + state.lastLeft;
  left = left < 0 ? 0 : left;
  let width = Number(props.width) - Number(props.sliderWidth);
  left = left >= width ? width : left;
  state.startX = pageX;
  state.lastLeft = left;
  styleChange(left);
}
function touchend() {
  if (state.isPass) return;
  let left = state.targetWidth - Number(props.sliderWidth);
  if (Math.abs(left - state.lastLeft) <= Number(props.range)) {
    success();
  } else {
    state.startX = 0;
    state.lastLeft = 0;
    styleChange(0);
    fail();
  }
}

function mousedown(e: any) {
  if (!state.isH5 || !isPC()) return;
  touchstart(e);
  state.movable = true;
  window.onmousemove = function (event: any) {
    if (!state.isH5 || !isPC() || !state.movable) return;
    touchmove(event);
  };
  window.onmouseup = function () {
    if (!state.isH5 || !isPC() || !state.movable) return;
    touchend();
    state.movable = false;
  };
}

onMounted(() => {
  changeTargetPosi();
});
defineExpose({
  reset
});
</script>

<style lang="scss" scoped>
.fui-slideverify__wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.fui-sv__text-tip {
  font-weight: normal;
  width: 174px;
  text-align: center;
  opacity: 1;
  white-space: nowrap;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  -webkit-animation: ani_sv 2s infinite;
  animation: ani_sv 2s infinite;
}

@-webkit-keyframes ani_sv {
  from {
    background-position: -85px;
  }

  to {
    background-position: 85px;
  }
}

@keyframes ani_sv {
  from {
    background-position: -85px;
  }

  to {
    background-position: 85px;
  }
}

.fui-sv__foreground {
  width: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.fui-sv__text-res {
  opacity: 1;
  white-space: nowrap;
  text-align: center;
  font-weight: normal;
}

.fui-sv__slider {
  display: flex;
  z-index: 3;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-style: solid;
  background: #ffffff;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition-property: border-color;
  transition-duration: 0.08s;
  cursor: pointer;
}

.fui-sv__dotted-box {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 5;
  border-style: dashed;
  box-sizing: border-box;
  transition-property: left;
  transition-duration: 0.15s;
}

.fui-sv__opacity {
  opacity: 0 !important;
}

.fui-sv__text-cover {
  display: flex;
  white-space: nowrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  font-weight: normal;
  opacity: 1;
}

.fui-sv__reset-ani {
  transition: transform 0.1s;
}
</style>
