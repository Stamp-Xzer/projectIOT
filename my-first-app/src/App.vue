<template>
  <div class="h-max w-max bg">
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
      <div>
        <label class="swap swap-rotate text-5xl">
          <!-- this hidden checkbox controls the state -->
          <input type="checkbox" />

          <!-- sun icon -->
          <svg
            class="swap-on fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            />
          </svg>

          <!-- moon icon -->
          <svg
            class="swap-off fill-current w-10 h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            />
          </svg>
        </label>
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

    // Capture the click event on the checkbox to toggle the theme
    const checkbox = document.querySelector(".swap input[type='checkbox']");
    const htmlElement = document.querySelector("html");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        htmlElement.setAttribute("data-theme", "cupcake");
      } else {
        htmlElement.setAttribute("data-theme", "bumblebee");
      }
    });
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
