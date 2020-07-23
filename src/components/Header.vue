<template>
  <header>
    <a href="/" class="pagetitle effect-shine"
      ><h1>Laravel Migrations Builder</h1></a
    >
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
header {
  background-color: #282c34;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  flex-direction: column;
  padding: 10px 0;
  border-bottom: 1px solid #7957d5;
  .pagetitle {
    font-family: "Galada", cursive;
    color: white;
  }
  .effect-shine:hover {
    -webkit-mask-image: linear-gradient(
      -75deg,
      rgba(0, 0, 0, 0.6) 30%,
      #000 50%,
      rgba(0, 0, 0, 0.6) 70%
    );
    -webkit-mask-size: 200%;
    animation: shine 2s infinite;
  }

  @-webkit-keyframes shine {
    from {
      -webkit-mask-position: 150%;
    }

    to {
      -webkit-mask-position: -50%;
    }
  }
}
</style>
