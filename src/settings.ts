/**
 * @param tagsView 是否显示顶部导航标签
 * @param fixedHeader 是否固定header
 * @param sidebarLogo 是否显示侧边栏logo
 */
interface DefaultSettings {
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
}

const defaultSettings: DefaultSettings = {
  tagsView: false,
  fixedHeader: true,
  sidebarLogo: true
};

export default defaultSettings;
