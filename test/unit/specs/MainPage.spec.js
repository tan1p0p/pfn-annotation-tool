import { mount, shallowMount } from '@vue/test-utils';
import MainPage from '@/components/MainPage';

describe('MainPage.vue', () => {
  it('render two inputs.', () => {
    const wrapper = mount(MainPage);
    expect(wrapper.html()).contain('<input type="file" webkitdirectory="">');
    expect(wrapper.html()).contain('<input type="file">');
  });

  // it('Magic character "n" sets imageIdx to 2', () => {
  //   const wrapper = shallowMount(MainPage);
  //   wrapper.setData({ imageIdx: 1 });
  //   // wrapper.trigger('keydown', {
  //   //   key: 'n',
  //   // });
  //   wrapper.trigger('keydown.78');
  //   expect(wrapper.vm.imageIdx).to.equal(2);
  // });
});
