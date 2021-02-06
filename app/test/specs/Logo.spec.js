import test from 'ava'
import { mount } from '@vue/test-utils'

import Logo from '../../components/Logo.vue'

test('Logo', (t) => {
  const wrapper = mount(Logo)
  t.truthy(wrapper.vm)
  t.snapshot(wrapper.html())
  t.true(wrapper.classes().includes('NuxtLogo'))
})
