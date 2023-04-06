import request from '@/utils/request';
export const uploadUrl = `${import.meta.env.VITE_APP_BASE_API}/api/oss/upload`;
import { localStorage } from '@/utils/storage';
import { FileFormData } from '@/types/api/system/file';
/**
 * 上传文件
 * @param file
 */
export function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/files',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.get('token')
    }
  });
}

/**
 * 删除文件
 *
 * @param data FileFormData
 */
export function deleteFile(data: FileFormData) {
  return request({
    url: '/files',
    method: 'delete',
    data: data
  });
}
