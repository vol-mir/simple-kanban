<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="close()">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">New task</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="panel panel-default">
              <div class="panel-body space-top">
                <div class="space-top">
                  <form>
                    <div class="form-group">
                      <input
                          class="form-control"
                          placeholder="Name task"
                          v-model="newTask.name"
                      >
                    </div>
                    <div class="form-group">
                      <select v-model="newTask.status" class="form-control">
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
                          v-model="newTask.description"
                      >
                      </textarea>
                    </div>
                    <button type="button" class="btn btn-primary" @click="addTask()">Submit</button>
                  </form>
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
    name: 'TaskAddModal',

    data () {
        return {
            newTask: {
                status: 1
            }
        };
    },

    computed: {
        statusesName () {
            return this.$store.getters.getStatusesName;
        }
    },

    methods: {
        close () {
            this.$emit('close');
        },

        addTask () {
            this.$store.dispatch('addTask', this.newTask).then(() => {
                this.close();
            }).catch(error => {
                console.error(error);
            });
        }
    }
};
</script>
