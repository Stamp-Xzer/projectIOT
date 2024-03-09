<template>
  <div class="bg max-h-max max-w-max">
    <div class="flex justify-center text-7xl items-center">
      <div v-if="this.buzzer == 0" class="inline-flex m-10">
        <ion-icon
          class="volume-red mx-4"
          name="alert-circle-outline"
        ></ion-icon>
        <h1 class="text-5xl text-red-400">ระบบยังไม่มีการเปิดน้ำ</h1>
      </div>
      <div v-if="this.buzzer == 1" class="inline-flex m-10">
        <ion-icon
          class="volume-green mx-4"
          name="alert-circle-outline"
        ></ion-icon>
        <h1 class="text-5xl text-green-400">ระบบกำลังเปิดน้ำอยู่</h1>
      </div>
    </div>
    <div class="flex justify-center text-7xl items-center">
      <Dashboard_test1 :temp="temp" :hum="hum" :buzzer="buzzer" />
    </div>
    <div class="flex justify-center text-7xl items-center"><log_message /></div>
  </div>
</template>

<script>
import "./assets/tailwind.css";
import axios from "axios";
import Dashboard_test1 from "./components/dashboard.vue";
import log_message from "./components/log.vue";

export default {
  name: "App",
  components: {
    Dashboard_test1,
    log_message,
  },
  data() {
    return {
      temp: 0,
      hum: 0,
      buzzer: 0,
      picture: [],
    };
  },
  mounted() {
    this.fetchDataFromNetpie(); // Fetch data when the component is mounted

    // Use setInterval to fetch data every 2 seconds
    setInterval(() => {
      this.fetchDataFromNetpie();
    }, 1000);
  },
  methods: {
    fetchDataFromNetpie() {
      let apiurl = "https://api.netpie.io/v2/device/shadow/data";
      let headers = {
        "content-type": "application/json",
        Authorization:
          "Device 36762317-6e8d-445f-94f1-4548c0a62191:p1xYZpb3kPr3i5quDNBQkUg1gscPDgNh",
      };

      axios
        .get(apiurl, { headers })
        .then((response) => {
          this.buzzer = response.data.data.buzzer;
          this.temp = response.data.data.temp;
          this.hum = response.data.data.hum;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
