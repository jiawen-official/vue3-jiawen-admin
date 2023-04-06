<template>
  <div style="border: 1px solid #ccc">
    <!-- 工具栏 -->
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      style="border-bottom: 1px solid #ccc"
      :mode="mode"
    />
    <!-- 编辑器 -->
    <Editor
      :defaultConfig="editorConfig"
      v-model="defaultHtml"
      @onChange="handleChange"
      style="height: 500px"
      :mode="mode"
      @onCreated="handleCreated"
      @onBlur="handleBlur"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'JwWangEditor'
};
</script>

<script setup lang="ts">
import { onBeforeUnmount, shallowRef, reactive, toRefs, computed } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

// API 引用
import { uploadFile } from '@/api/system/file';

const props = defineProps({
  modelValue: {
    type: [String],
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容...'
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const html = computed<string | undefined>({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  }
});

const state = reactive({
  toolbarConfig: {},
  editorConfig: {
    placeholder: props.placeholder,
    MENU_CONF: {
      uploadImage: {
        // 自定义图片上传
        async customUpload(file: any, insertFn: any) {
          uploadFile(file).then(response => {
            const url = response.data.url;
            insertFn(url);
          });
        }
      }
    }
  },
  defaultHtml: html,
  mode: 'default'
});

const { toolbarConfig, editorConfig, defaultHtml, mode } = toRefs(state);

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleBlur = (editor: any) => {
  emit('change', editor.getHtml());
};

function handleChange(editor: any) {
  html.value = editor.getHtml();
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.w-e-full-screen-container {
  z-index: 100;
}
</style>
