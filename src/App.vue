<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
body {
  margin: 0;
  padding: 0;
  background: #373737;
  color: white !important;
}
main {
  flex: 1 0 auto;
  padding: 40px;
}

label {
  color: white !important;
}
.snackbar {
  background: white !important;
  color: #2d2d2d !important;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

@Component({
  components: {
    Header,
    Footer
  },
  metaInfo() {
    return {
      meta: [
        // Twitter Card
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: "Laravel Migrations Builder" },
        { name: "twitter:site", content: "@mrblot4" },
        {
          name: "twitter:description",
          content: "Build your laravel migration files with convenient builder"
        },
        {
          name: "twitter:image",
          content:
            "https://laravel-migrations-builder.netlify.app/images/social_thumb.jpg"
        },
        // Facebook OpenGraph
        { property: "og:title", content: "Laravel Migrations Builder" },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content:
            "https://laravel-migrations-builder.netlify.app/images/social_thumb.jpg"
        },
        {
          property: "og:description",
          content: "Build your laravel migration files with convenient builder"
        }
      ]
    };
  }
})
export default class App extends Vue {}
</script>
