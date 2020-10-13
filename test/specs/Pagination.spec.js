import test from 'ava'
import { shallowMount, RouterLinkStub, mount } from '@vue/test-utils'

import Pagination from '../../components/Pagination'

test('Pagination', (t) => {
  const wrapper = mount(Pagination)
  t.truthy(wrapper.vm)
  t.snapshot(wrapper.html())
  const spanWrappers = wrapper.findAll('span')
  t.is(spanWrappers.length, 2)
  t.is(spanWrappers.wrappers[0].element.textContent, String.fromCharCode(160))
  t.is(spanWrappers.wrappers[1].element.textContent, String.fromCharCode(160))
})

test('Pagination with older posts', (t) => {
  const wrapper = shallowMount(Pagination, {
    propsData: {
      routeName: 'blog-slug',
      routeParams: { slug: 'john' },
      totalPages: 2,
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  })
  t.is(wrapper.findAll('span').length, 1)
  const nuxtLink = wrapper.findComponent(RouterLinkStub)
  t.is(nuxtLink.element.textContent.trim(), 'Older Posts')
  t.deepEqual(nuxtLink.props().to, {
    name: 'blog-slug',
    params: { slug: 'john' },
    query: { page: 2 },
  })
})
