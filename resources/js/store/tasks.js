import Axios from 'axios';

const ModuleTask = {

    state: {
        allTasks: {},
        statusesName: {},
        openTask: {}
    },

    getters: {
        getAllTasks: state => {
            return state.allTasks;
        },

        getStatusesName: state => {
            return state.statusesName;
        },

        getOpenTask: state => {
            return state.openTask;
        }
    },

    mutations: {
        setTasks: (state, payload) => {
            const tasks = payload.tasks;
            const statusesName = payload.statuses_name;
            state.statusesName = statusesName;
            for (const statusName in statusesName) {
                const element = {};
                element.id = statusName;
                element.status = statusesName[statusName];
                element.tasks = [];
                state.allTasks[statusName] = element;
            }

            tasks.forEach(function (task) {
                state.allTasks[task.status].tasks.push(task);
            });
        },

        clearTasks: (state) => {
            state.allTasks = {};
            state.statusesName = {};
        },

        setOpenTask: (state, payload) => {
            state.openTask = payload.task;
        },

        clearOpenTask: (state) => {
            state.openTask = {};
        },

        addTask: (state, payload) => {
            const task = payload.task;
            state.allTasks[task.status].tasks.unshift(task);
        },

        deleteTask: (state, payload) => {
            const task = payload.task;
            const index = state.allTasks[task.status].tasks.findIndex(elem => elem.id === task.id);
            if (index !== -1) {
                state.allTasks[task.status].tasks.splice(index, 1);
            }
        },

        updateTask: (state, payload) => {
            const task = payload.task;
            const index = state.allTasks[state.openTask.status].tasks.findIndex(elem => elem.id === state.openTask.id);
            if (index !== -1) {
                state.allTasks[state.openTask.status].tasks.splice(index, 1);
            }
            state.allTasks[task.status].tasks.unshift(task);
            state.openTask = task;
        }
    },

    actions: {
        async setTasks (context) {
            return new Promise((resolve, reject) => {
                Axios.get('/api/v1/tasks').then(response => {
                    context.commit('clearTasks');
                    context.commit('setTasks', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        async showTask (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.get(`/api/v1/tasks/${payload.id}`).then(response => {
                    context.commit('setOpenTask', response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        async addTask (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.post('/api/v1/tasks', payload).then(response => {
                    context.commit('addTask', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        async deleteTask (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.delete(`/api/v1/tasks/${payload.id}`).then(response => {
                    context.commit('deleteTask', response.data);
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        },

        async updateTask (context, payload) {
            return new Promise((resolve, reject) => {
                Axios.patch(`/api/v1/tasks/${payload.id}`, payload).then(response => {
                    context.commit('updateTask', response.data);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }

};

export default ModuleTask;
