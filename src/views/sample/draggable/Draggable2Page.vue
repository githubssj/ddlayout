<template>
  <draggable class="nsneodraggable-page" :list="page.layouts" :group="{ name: 'row' }">
    <nsneodraggable-row v-for="(el,index) in page.layouts" :key="index" :row="el" :page="page"></nsneodraggable-row>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import nsneodraggableRow from "./Draggable2Row.vue";
export default {
  props: ["page"],
  components: {
    draggable,
    nsneodraggableRow
  },
  name: "nsneodraggable-page"
};
</script>
<style>

</style>