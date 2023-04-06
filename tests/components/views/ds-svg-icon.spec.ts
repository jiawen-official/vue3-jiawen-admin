import { mount } from '@vue/test-utils';
import jwSvgIcon from '@/components/views/jw-svg-icon/jw-svg-icon.vue';

describe('jw-svg-icon.vue', () => {
  it('renders props.iconClass when passed', async () => {
    const iconClass = 'system';
    const wrapper = await mount(jwSvgIcon as any, {
      props: { iconClass }
    });
    expect(wrapper.html()).toContain(iconClass);
    expect(wrapper.find('use').html()).toContain('icon')
  });
});
