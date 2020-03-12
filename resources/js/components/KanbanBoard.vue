<template>
  <div class="container-fluid pt-3">
    <h3 class="font-weight-light">Simple Kanban Board</h3>
    <button type="button" class="btn btn-success" @click="openAddModal()">Add Task</button>
    <div class="row flex-row flex-sm-nowrap py-3">
      <div v-for="groupTasks in allTasks" :key="groupTasks.id" class="col"
           style="width: 350px; min-width: 350px; max-width: 350px;">
        <div class="card bg-light">
          <div class="card-body">
            <h6 class="card-title text-uppercase text-truncate py-2">{{ groupTasks.status }}</h6>
            <div class="items border border-light">
              <div v-for="task in groupTasks.tasks" :key="task.id">
                <div class="card draggable shadow-sm">
                  <div class="card-body p-2">
                    <div class="card-title">
                      <a href="#" class="lead font-weight-light" @click="openEditModal(task.id)">{{ task.name }}</a>
                      <div>
                        <small>
                          {{ new Date(task.updated_at) | dateFormat('DD.MM.YYYY hh:mm:ss') }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dropzone rounded">
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <task-edit-modal v-if="showEditModal" @close="closeEditModal()" :idTask="idOpenTask"></task-edit-modal>
      <task-add-modal v-if="showAddModal" @close="closeAddModal()"></task-add-modal>

    </div>
  </div>
</template>

<script>
import TaskEditModal from '@components/TaskEditModal.vue';
import TaskAddModal from '@components/TaskAddModal.vue';

export default {
    name: 'KanbanBoard',

    components: {
        TaskEditModal,
        TaskAddModal
    },

    data () {
        return {
            showAddModal: false,
            showEditModal: false,
            idOpenTask: 0
        };
    },

    computed: {
        allTasks () {
            return this.$store.getters.getAllTasks;
        }
    },

    mounted () {
        this.fetchTasks();
    },

    methods: {
        fetchTasks () {
            this.$store.dispatch('setTasks');
        },

        openAddModal () {
            this.showAddModal = true;
        },

        closeAddModal () {
            this.showAddModal = false;
        },

        openEditModal (idTask) {
            this.idOpenTask = idTask;
            this.showEditModal = true;
        },

        closeEditModal () {
            this.showEditModal = false;
            this.$store.commit('clearOpenTask');
        }
    }
};
</script>
