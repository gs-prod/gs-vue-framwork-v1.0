<template>
  <div class="default">
    <CommonHeader />
    <div class="content">
      <CommonLeftNav />
      <div>
        <CommonTopTab />
        <client-only>
          <div class="content—body">
            <slot />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Header from "~/components/common/Header";
// import LeftNav from "~/components/common/LeftNav";
// import TopTab from "~/components/common/TopTab";
// import Footer from "~/components/common/Footer";
// import TagsView from "~/components/common/TagsView";
</script>

<style scoped>
html {
  font-family:
    "Source Sans Pro",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #f2f4f7;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.default .content {
  display: flex;
}

@media (max-width: 1440px) {
  .content—body {
    width: calc(100vw - 255px);
  }
}

@media (min-width: 1441px) {
  .content—body {
    width: calc(100vw - 210px);
  }
}

.content {
  height: calc(100vh - 65px);
}
</style>
