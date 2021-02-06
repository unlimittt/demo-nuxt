import test from 'ava'
import { shallowMount, RouterLinkStub } from '@vue/test-utils'

import Author from '../../components/Author'

test('Author', (t) => {
  const wrapper = shallowMount(Author, {
    propsData: {
      author: {
        slug: 'john',
        name: 'John',
        bio: 'Evangelist PhD programmer',
        image: 'https://images.unsplash.com/',
      },
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  })
  t.truthy(wrapper.vm)
  t.snapshot(wrapper.html())
  t.deepEqual(wrapper.findComponent(RouterLinkStub).props().to, {
    name: 'blog-authors-slug',
    params: { slug: 'john' },
  })
})
