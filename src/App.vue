<template>
    <router-view />
</template>

<script>
    export default {
        name: 'App',
       
    }
</script>

<style lang="scss">
body, html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    height: 100%;
    background-color: rgb(250, 218, 157);
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-width: 100%;
    margin: 0 auto;
}

button:hover {
    background-color: #2c3e50;
    color: #fff;
}

a {
    text-decoration: none;
}
</style>
