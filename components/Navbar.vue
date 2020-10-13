<template>
  <b-navbar toggleable="lg" class="p-3 border-bottom shadow-sm">
    <b-navbar-brand to="/">Demo Nuxt</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <app-search-input />
        </b-nav-form>
        <b-nav-item exact to="/">Home</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/blog">Blog</b-nav-item>
        <b-nav-item to="/contact">Contact</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
