import test from 'ava'
import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'

import PrevNext from '../../components/PrevNext'

test('PrevNext', (t) => {
  const wrapper = shallowMount(PrevNext, {
    propsData: {
      prev: { title: 'One', slug: 'slug-one' },
      next: { title: 'Two', slug: 'slug-two' },
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  })
  t.truthy(wrapper.vm)
  t.snapshot(wrapper.html())

  const nuxtLinks = wrapper.findAllComponents(RouterLinkStub)

  t.is(nuxtLinks.wrappers[0].element.textContent.trim(), 'One')
  t.is(nuxtLinks.wrappers[1].element.textContent.trim(), 'Two')

  t.deepEqual(nuxtLinks.wrappers[0].props().to, {
    name: 'blog-slug',
    params: { slug: 'slug-one' },
  })

  t.deepEqual(nuxtLinks.wrappers[1].props().to, {
    name: 'blog-slug',
    params: { slug: 'slug-two' },
  })
})

test('PrevNext with no prev and next posts', (t) => {
  const wrapper = mount(PrevNext)
  const spanWrappers = wrapper.findAll('span')
  t.is(spanWrappers.length, 2)
  t.is(spanWrappers.wrappers[0].element.textContent, String.fromCharCode(160))
  t.is(spanWrappers.wrappers[1].element.textContent, String.fromCharCode(160))
})
