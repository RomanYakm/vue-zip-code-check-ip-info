<template>
  <div class="home">
    <h1>Vue Front End Dev Task</h1>
    <form @submit.prevent="handleSubmit">
      <label>
        Enter your ZIP Code
        <input type="text" v-model="zipCode" />
      </label>
      <button>Render</button>
    </form>

    <div v-if="Object.keys(data).length > 0">
      <p>Info for {{ validCode }}</p>
      <p>{{ data.city }}</p>
      <p>{{ data.state }}</p>
      <p>{{ data.state_code }}</p>
    </div>
    <p v-if="error">{{ invalidCode }} its not valid USA ZIP Code</p>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      zipCode: "",
      data: {},
      error: false,
      invalidCode: "",
      validCode: "",
    };
  },
  methods: {
    handleSubmit() {
      let searchIndex = -1;
      const clientKey = "259c6470-c96c-11ed-8f46-8fb115a035ad";
      let url =
        "https://app.zipcodebase.com/api/v1/search?apikey=" +
        clientKey +
        "&codes=" +
        this.zipCode;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (Object.keys(data.results).length > 0) {
            searchIndex = data.results[this.zipCode].findIndex(
              (result) => result.country_code === "US"
            );
          }
          console.log(data, searchIndex);
          if (searchIndex > 0) {
            this.error = false;
            this.validCode = this.zipCode;
            this.data = data.results[this.zipCode][searchIndex];
          } else if (searchIndex === -1) {
            this.invalidCode = this.zipCode;
            this.error = true;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
