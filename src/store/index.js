import { createApp } from "vue"
import { createStore } from "vuex"
import axios from "axios"

const store = createStore({
  state() {
    return {
      error: null,
      successMessage: null,
      worksheets: [],
    }
  },
  mutations: {
    setWorksheets(state, worksheets) {
      state.worksheets = worksheets
    },
    setError(state, error) {
      state.error = error
    },
    setSuccess(state, successMessage) { 
      state.successMessage = successMessage; 
    },
  },
  actions: {
    async saveWorksheet({ commit, rootState }, { question, options }) {
      try {
        const apiUrl = "http://localhost:3000/worksheets"
        const response = await axios.post(apiUrl, { question, options })

        if (response.status === 201) {
          rootState.componentData.question = ""
          rootState.componentData.options = []
          // commit("saveWorksheets", response.data)
          commit("setSuccess", "Successfully added question")
        } else {
          commit("setError", "Failed to add question. Please try again.")
        }
      } catch (error) {
        console.error("Failed to add question:", error)
        commit("setError", "Failed to add question. Please try again.")
      }
    },
    async fetchWorksheets({ commit }) {
      try {
        const apiUrl = "http://localhost:3000/worksheets"
        const response = await axios.get(apiUrl)

        if (response.status === 200) {
          commit("setWorksheets", response.data)

          commit("setError", null)
        } else {
          commit("setError", "Failed to fetch worksheets. Please try again.")
        }
      } catch (error) {
        console.error("Failed to fetch worksheets:", error)
        commit("setError", "Failed to fetch worksheets. Please try again.")
      }
    },
  },
})

const app = createApp({})

// Use the store in the Vue 3 app
app.use(store)

export default store
