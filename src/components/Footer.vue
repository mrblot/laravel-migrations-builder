<template>
  <footer>
    <div class="container">
      <p>
        Made by
        <a href="https://github.com/mrblot" target="_blank"
          ><v-icon name="github"></v-icon>mrblot</a
        >
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
footer {
  background: #2b2b2b;
  padding: 15px;
  flex-shrink: 0;
  text-align: center;
  color: #757575;
  border-top: 1px solid #7957d5;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: inline-flex;
      margin: 0 10px;
      transition: color 0.3s ease-in-out;
      .icon {
        background: #7957d5;
        padding: 2px;
        border-radius: 50%;
        color: #2b2b2b;
        margin-right: 5px;
        transition: background 0.3s ease-in-out;
      }
      &:hover {
        color: white;
        .icon {
          background: white;
        }
      }
    }
  }
}
</style>
