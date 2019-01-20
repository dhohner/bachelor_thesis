<template>
  <div class="header">
    <ul>
      <li><router-link :to="{ name: 'home' }" id="link">Home</router-link></li>
      <li>
        <router-link :to="{ name: 'about' }" id="link">
          Bounties
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'about' }" id="link">About</router-link>
      </li>
      <li style="float:right" v-if="authenticated === true" @click="logOut">
        <router-link :to="{ name: 'about' }" id="link">LogOut</router-link>
      </li>
      <li style="float:right" v-if="authenticated !== true" @click="logIn">
        <router-link :to="{ name: 'about' }" id="link">LogIn</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authenticated: false
    }
  },
  methods: {
    logIn() {
      console.log('login')
      this.authenticated = true
    },
    logOut() {
      console.log('logout')
      this.authenticated = false
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #e7e7e7;
  background-color: #f3f3f3;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

li {
  float: left;
}

/* Change the link color to #111 (black) on hover */
li:hover {
  background-color: #111;
}

#link {
  display: block;
  color: #666;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}
</style>
