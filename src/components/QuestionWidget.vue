<template>
  <div class="worksheet-form">
    <h3>Worksheet Form</h3>
    <textarea v-model="question" placeholder="Enter your question"></textarea>
    <Form @new-option="handleNewOption"></Form>
    <div class="button-container">
      <button @click="saveWorksheetAction" class="button primary">Save Worksheet</button>
    </div>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="successMessage" class="notification success">{{ successMessage }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import Form from "../components/FormComponent.vue"

export default {
  name: "worksheet-form",
  components: {
    Form,
  },
  data() {
    return {
      question: "",
      options: [],
      error: null,
    }
  },
  computed: {
    ...mapState(["successMessage", "errorMessage"]),
    atLeastOneCorrect() {
      return this.options.some((option) => option.correct)
    },
  },
  methods: {
    ...mapActions(["saveWorksheet"]),

    async saveWorksheetAction() {
      if (this.question && this.options.length > 0 && this.atLeastOneCorrect) {
        const questionData = {
          question: this.question,
          options: this.options,
        };
        this.$emit("new-question", questionData)
        await this.saveWorksheet(questionData);
        this.question = ''
        this.options = []
        alert("Successfully added question")
      } else if (!this.question) {
        this.error = "Please enter your question.";
      } else if (this.options.length === 0) {
        this.error = "Please add at least one option.";
      } else {
        this.error = "Please mark at least one option as correct.";
      }
    },
    handleNewOption(newOptions) {
      this.options = newOptions
    },
  },
}
</script>

<style scoped>
.worksheet-form {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 40%;
  padding: 20px;
  border-radius: 5px;
  background-color: #f8f8f8;
}

textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  margin-bottom: 10px;
}

.button-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.notification {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}

.success {
  background-color: green;
  color: white;
}

.error {
  background-color: red;
  color: white;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.button.primary {
  background-color: #4caf50;
  color: white;
  margin-left: 10px;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
}
</style>