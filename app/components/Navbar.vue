<template lang="pug">
b-navbar.p-3.border-bottom.shadow-sm(toggleable='lg')
  b-container.d-flex.justify-content-between
    b-navbar-brand(to='/') Demo Nuxt
    b-navbar-toggle(target='nav-collapse')
    b-collapse#nav-collapse(is-nav)
      b-navbar-nav.ml-auto
        b-nav-form
          app-search-input
        b-nav-item(to='/about') About
        b-nav-item(to='/blog') Blog
        b-nav-item(to='/contact') Contact
</template>
