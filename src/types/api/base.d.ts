/**
 * 列表查询页码参数类型声明
 * @param page 当前页
 * @param pageSize 页大小
 */
export interface PageQueryParam {
  page: number;
  pageSize: number;
}
/**
 * 列表查询页码参数类型声明
 * @param pageNo 当前页码
 * @param pageSize 页大小
 */
export interface QueryParam {
  pageNo: number;
  pageSize: number;
}

export interface PageResult<T> {
  list: T;
  total: number;
}
