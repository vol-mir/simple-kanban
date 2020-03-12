<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="close()">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ openTask.name }}</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="panel panel-default">
              <div class="panel-heading text-secondary">
                <p>In column {{ statusesName[openTask.status] }}</p>
                <h3>Description:</h3>
                <button type="button" class="btn btn-secondary btn-sm" v-if="!editOffset" @click="editTask()">Edit</button>
                <button type="button" class="btn btn-warning btn-sm" v-else @click="cancelTask()">Cancel</button>
                <button type="button" class="btn btn-danger btn-sm" @click="deleteTask()">Delete</button>
              </div>
              <div class="panel-body space-top">
                <p v-if="!editOffset">{{ openTask.description }}</p>
                <div class="space-top" v-else>
                  <form>
                    <div class="form-group">
                      <input
                          class="form-control"
                          placeholder="Name task"
                          v-model="updateTask.name"
                      >
                    </div>
                    <div class="form-group">
                      <select v-model="updateTask.status" class="form-control">
                        <option v-for="(option, key) in statusesName" :key="key" :value="key">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        rows="3"
                        placeholder="Description task"
                        v-model="updateTask.description"
                      >
                      </textarea>
                    </div>
                    <button type="button" class="btn btn-primary" @click="saveTask()">Submit</button>
                  </form>
                </div>

                <h3 class="text-secondary">Comments:</h3>
                <div v-for="comment in openTask.comments" :key="comment.id">
                  <div class="panel panel-default">
                    <div class="panel-heading">{{ comment.name }}</div>
                    <div class="panel-body">{{ new Date(comment.created_at) | dateFormat('DD.MM.YYYY hh:mm:ss') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'TaskEditModal',

    props: {
        idTask: Number
    },

    data () {
        return {
            editOffset: false,
            updateTask: {}
        };
    },

    computed: {
        openTask () {
            return this.$store.getters.getOpenTask;
        },

        statusesName () {
            return this.$store.getters.getStatusesName;
        }
    },

    mounted () {
        this.setOpenTask();
    },

    methods: {
        close () {
            this.$emit('close');
        },

        setOpenTask () {
            this.$store.dispatch('showTask', {
                id: this.idTask
            });
        },

        deleteTask () {
            this.$store.dispatch('deleteTask', {
                id: this.idTask
            }).then(() => {
                this.close();
            }).catch(error => {
                console.error(error);
            });
        },

        editTask () {
            this.editOffset = true;
            this.updateTask.id = this.openTask.id;
            this.updateTask.name = this.openTask.name;
            this.updateTask.description = this.openTask.description;
            this.updateTask.status = this.openTask.status;
        },

        cancelTask () {
            this.editOffset = false;
            this.updateTask = {};
        },

        saveTask () {
            this.$store.dispatch('updateTask', this.updateTask).then(() => {
                this.editOffset = false;
                this.updateTask = {};
            }).catch(error => {
                console.error(error);
            });
        }
    }
};
</script>
