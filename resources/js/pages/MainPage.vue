<template>
  <div class="content">
    <kanban-board></kanban-board>
  </div>
</template>

<script>
import KanbanBoard from '@components/KanbanBoard.vue';

export default {
    name: 'MainPage',

    components: {
        KanbanBoard
    }
};
</script>
