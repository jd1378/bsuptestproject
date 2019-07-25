<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark shadow-sm">
    <div class="collapse navbar-collapse justify-content-between">
      <slot #default>
        <ul class="navbar-nav">
          <router-link tag="li" class="nav-item" to="/">
            <a class="nav-link">Home</a>
          </router-link>
        </ul>
      </slot>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
