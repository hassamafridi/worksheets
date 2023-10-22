<template>
  <div class="dashboard">
    <QuestionWidget @new-question="handlenewquestion" />
    <WorksheetList  :newquestion="newquestion" />
  </div>
</template>

<script>
import QuestionWidget from '../components/QuestionWidget.vue'
import WorksheetList from '../components/WorksheetList.vue';
export default {
  name: "index",
  components: {
    QuestionWidget,
    WorksheetList
  },
  data(){
    return{
      newquestion:[]
    }
  },
  methods:{
    handlenewquestion(newquestion) {
      this.newquestion = newquestion
    },
  },

};
</script>
<style scoped>
.dashboard{
  display: flex;
  justify-content: space-between;
}
</style>
