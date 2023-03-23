<template>
  <div>
    <p>{{ userAgent }}</p>
    <p v-if="loading">IP Loading..</p>
    <p>{{ userIP }}</p>
    <p>{{ userCity }}</p>
    <p>{{ userRegion }}</p>
    <p>{{ userCountry }}</p>
  </div>
</template>

<script>
export default {
  name: "IPLookup",
  components: {},
  data() {
    return {
      loading: true,
      userAgent: window.navigator.userAgent,
      userIP: "",
      userCity: "",
      userRegion: "",
      userCountry: "",
    };
  },
  mounted() {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(({ ip }) => {
        this.loading = false;
        this.userIP = ip;
      })
      .then(() => {
        let accessKey = "a9645c57c76a03f5a3e4d546e23789f9";
        let url =
          "http://api.ipstack.com/" + this.userIP + "?access_key=" + accessKey;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.userCity = data.city;
            this.userRegion = data.region_name;
            this.userCountry = data.country_name;
          })
          .catch((err) => console.log(err));
      });
  },
};
</script>

<style lang="scss" scoped></style>
