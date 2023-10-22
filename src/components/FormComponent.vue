<template>
  <div>
    <span class="container">
      <input type="text" v-model="newOption" placeholder="Enter option" />
      <button class="button add" @click="addOption">Add Option</button>
    </span>
    <div v-for="(option, index) in options" :key="index">
      <span class="containe">
        <input
          type="text"
          v-model="options[index].option"
          placeholder="Enter an option"
        />
        <input
          type="checkbox"
          v-model="options[index].correct"
          :value="index"
        />
        <!-- <i class="fa-sharp fa-solid fa-xmark"></i>       -->
        <i
          class="far fa-trash-alt"
          style="color: red; cursor: pointer"
          @click="removeOption(index)"
          aria-hidden="true"
        ></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      newOption: "",
      options: [],
    }
  },
  methods: {
    ...mapMutations(["addOption", "removeOption"]),
    addOption() {
      if (this.newOption) {
        const option = { option: this.newOption, correct: false }
        this.options.push(option)
        this.$emit("new-option", this.options)
        this.newOption = ""
      } 
    },
    removeOption(index) {
      this.options.splice(index, 1)
    },
  },
}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: space-between;
}
input[type="text"] {
  width: 40%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
.add {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}
</style>
