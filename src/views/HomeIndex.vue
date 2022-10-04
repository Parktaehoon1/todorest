<template>
  <div class="d-flex">
    <Datepicker
      v-model="date"
      placeholder="Start Typing ..."
      textInput
      :textInputOptions="textInputOptions"
    />
  </div>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  components: { Datepicker },
  setup() {
    const date = ref();
    const textInputOptions = ref({
      format: "MM.dd.yyyy",
    });
    return {
      date,
      textInputOptions,
    };
  },
};
</script>
