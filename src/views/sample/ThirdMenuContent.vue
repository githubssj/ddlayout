<template>
	<div class="nsneo-inner-root">
    <div class="nsneo-inner-container">
      <div class="nsneo-inner-container-row">
        展示最后一级菜单，第一行
      </div>
      <div class="nsneo-inner-container-row">
        展示最后一级菜单，第二行
      </div>
    </div>
  </div>
</template>

<script>
	export default {
	  name: 'thirdmenucontent',
	  components: {
	  }
	}
</script>

<style scoped>
.nsneo-inner-root {
  background: #ffffff;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.nsneo-inner-container {
  margin: 15px;
}
.nsneo-inner-container-row {
  margin-bottom: 15px;
}
</style>
