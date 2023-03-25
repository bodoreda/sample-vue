<template>
  <div class="header">
    <router-link to="/NicePay">NicePay</router-link> |
    <router-link to="/VueQuillEditor">VueQuillEditor</router-link> |
    <router-link to="/VueAvatarEditor">VueAvatarEditor</router-link> |
    <router-link to="/WebFax">WebFax</router-link> |
  </div>
</template>

<style scoped>
.header {
  color: white;
  background-color: #42b883;
  display: flex;
  padding: 8px;
}
.header .router-link-exact-active {
  color: #354953;
}
.header a {
  color: white;
  margin: 5px;
}
</style>