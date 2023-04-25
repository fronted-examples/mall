<template>
    <div id="app">
        <ul>
            <li>
                <router-link to='/vue-ssr/'>Home</router-link>
            </li>
            <li>
                <router-link to='/vue-ssr/about'>About</router-link>
            </li>
            <li>
                <!-- <span @click="toPost">Posts</span> -->
                <router-link to="/vue-ssr/posts">Posts</router-link>
            </li>
        </ul>
        <!-- 路由出口 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
      name: "App",
      methods: {
        toPost () {
          location.href = '/posts'
        }
      }
    };
</script>

