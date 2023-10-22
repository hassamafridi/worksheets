<template>
  <div class="worksheet-list">
    <h1 class="worksheet-list-title">Worksheet List</h1>
    <table class="worksheet-table">
      <thead>
        <tr>
          <th>Question</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="worksheet in worksheets" :key="worksheet._id">
          <td>{{ worksheet.question }}</td>
          <td>
            <ul class="options-list">
              <li v-for="(option, index) in worksheet.options" :key="index">
                <div class="option">
                  <span>{{ option.option }}</span>
                  <span
                    class="answer-label"
                    :class="{ correct: option.correct }"
                  >
                    {{ option.correct ? "Correct" : "Incorrect" }}
                  </span>
                </div>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//   import axios from 'axios';
import { mapState, mapActions } from "vuex"
export default {
  props: ["newquestion"],
  data() {},
  watch: {
    newquestion(newVal) {
      if (newVal) {
        const newWorksheet = {
          _id: "your_unique_id", 
          question: newVal.question,
          options: newVal.options,
        };
        this.worksheets.push(newWorksheet);
      }
    },
  },
  computed: {
    ...mapState(["worksheets"]),
    //   getdata(){
    //     return this.$store.state.worksheets
    //   }
  },
  created() {
    this.fetchWorksheetsAction()
  },
  methods: {
    ...mapActions(["fetchWorksheets"]),
    async fetchWorksheetsAction() {
      this.fetchWorksheets()
    },
  },
}
</script>

<style scoped>
.worksheet-list {
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  width: 50%;
}

.worksheet-list-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.worksheet-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.worksheet-table th,
.worksheet-table td {
  border: 1px solid #e0e0e0;
  padding: 12px;
  text-align: left;
}

.worksheet-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.options-list {
  list-style: none;
  padding: 0;
}

.option {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
}

.answer-label {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.correct {
  background-color: #4caf50;
  color: white;
}

.incorrect {
  background-color: #f44336;
  color: white;
}
</style>
