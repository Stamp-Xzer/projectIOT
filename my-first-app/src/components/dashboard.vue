<template>
  <div class="items-center justify-center text-center">
    <div class="text-7xl font-bold mb-8">Dashboard</div>
    <div class="flex items-center justify-center text-4xl">
      <div class="text-center col-span-1">
        Temperature: {{ temp }} °C
        <div>Humidity: {{ hum }} %</div>
      </div>
    </div>
    <br />
    <div
      class="grid grid-flow-col gap-5 text-center items-center justify-center auto-cols-max text-2xl"
    >
      <div class="flex flex-col">
        <span class="countdown font-mono text-5xl">
          <span v-bind:style="{ '--value': hours }"></span>
        </span>
        Hours
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-5xl">
          <span v-bind:style="{ '--value': minutes }"></span>
        </span>
        Min
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-5xl">
          <span v-bind:style="{ '--value': seconds }"></span>
        </span>
        Sec
      </div>
    </div>
    <br />
    <div class="items-center grid grid-cols-3 w-screen text-2xl m-auto">
      <div class="text-center">
        <ion-icon name="alarm-outline" class="text-8xl"></ion-icon><br />
        <div class="font-bold">Time Auto</div>
        <div v-for="item in timesetting" :key="item.id" class="">
          {{ item.timesetting }} น.
          <button>
            <ion-icon
              name="trash-outline"
              class="trashred"
              @click="deleteTimeSetting(item.id)"
            ></ion-icon>
          </button>
        </div>
        <button
          class="btn btn-primary text-xl hover hover:btn-secondary hover:text-white"
          onclick="Modal_Time.showModal()"
        >
          Setting Time
        </button>
        <dialog id="Modal_Time" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-5xl">Time Setting</h3>
            <p class="py-4">กรุณาระบุเวลาเพื่อเพิ่มเวลาในการเปิดน้ำอัตโนมัติ</p>
            <div class="modal-action justify-center text-center">
              <form
                @submit.prevent="addTimeSetting"
                class="text-center"
                method="dialog"
              >
                <div class="mb-4 mx-auto">
                  <input
                    type="number"
                    v-model="f_hours"
                    placeholder=" HH"
                    class="placeholder-center text-lg"
                    min="0"
                    max="23"
                    required
                  />
                  <span class="mx-auto">:</span>
                  <input
                    type="number"
                    v-model="t_minutes"
                    placeholder=" MM"
                    class="placeholder-center text-lg"
                    min="0"
                    max="59"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="btn btn-accent hover hover:text-black"
                  >
                    Add Time Setting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div class="col-span-1">
        <div class="grid grid-cols-1 text-center text-4xl font-bold">
          เปิด/ปิดน้ำ
          <div class="grid grid-cols-2">
            <button
              class="btn bg-green-400 font-bold hover hover:bg-green-200 col-span-1 mx-3 m-24"
              @click="switchOpen(0)"
            >
              Open
            </button>
            <button
              class="btn bg-red-400 font-bold hover hover:bg-red-200 col-span-1 mx-3 m-24"
              @click="switchOpen(1)"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div class="text-center col-span-1">
        <ion-icon name="water-outline" class="text-8xl"></ion-icon><br />
        <div class="font-bold">Humidity Auto</div>
        <div v-for="item in Hum_Settings" :key="item.id" class="">
          {{ item.humidity }} %
          <!-- แสดงค่าความชื้นแทนเวลา -->
          <button>
            <ion-icon
              name="trash-outline"
              class="trashred"
              @click="deleteHum_Setting(item.id)"
            >
              ></ion-icon
            >
          </button>
        </div>
        <button
          class="btn btn-primary text-xl hover hover:btn-secondary hover:text-white"
          onclick="humidityModal.showModal()"
        >
          Setting Humidity
        </button>
        <dialog id="humidityModal" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="font-bold text-5xl">Humidity Setting</h3>
            <p class="py-4">
              กรุณาระบุค่าความชื้นเพื่อเพิ่มค่าความชื้นในการเปิดน้ำอัตโนมัติ
            </p>
            <div class="modal-action justify-center text-center">
              <form
                @submit.prevent="addHum_Setting"
                class="text-center"
                method="dialog"
              >
                <div class="mb-4 mx-auto">
                  <input
                    type="number"
                    v-model="newHumidity"
                    placeholder=" Humidity (%)"
                    class="placeholder-center text-lg"
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    class="btn btn-accent hover hover:text-black"
                  >
                    Add Humidity Setting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
    <div
      role="alert"
      class="alert alert-success hidden alert-bottom w-auto h-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="text-lg">Add Setting Success!</span>
    </div>

    <div
      role="alert"
      class="alert alert-error hidden alert-bottom w-auto h-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="text-lg">Error!! Add Setting Fail.</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard_test1",
  props: {
    temp: Number,
    hum: Number,
    buzzer: Number,
  },
  data() {
    return {
      timesetting: [],
      Hum_Settings: [],
      hours: 0,
      minutes: 0,
      seconds: 0,
      f_hours: "",
      t_minutes: "",
      newTimeSetting: "",
      newHumidity: "",
    };
  },
  mounted() {
    this.fetchTimeSetting();
    this.fetchHum_Setting();
    this.startCountdown();
  },
  methods: {
    fetchTimeSetting() {
      axios
        .get("http://localhost:3002/timesetting")
        .then((response) => {
          this.timesetting = response.data.sort((a, b) => {
            return a.timesetting.localeCompare(b.timesetting);
          });
        })
        .catch((error) => {
          console.error("Error fetching timesetting:", error);
        });
    },

    fetchHum_Setting() {
      axios
        .get("http://localhost:3002/Hum_Setting")
        .then((response) => {
          this.Hum_Settings = response.data.sort((a, b) => {
            return a.humidity - b.humidity;
          });
        })
        .catch((error) => {
          console.error("Error fetching humidity settings:", error);
        });
    },

    startCountdown() {
      setInterval(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        if (this.timesetting && this.timesetting.length > 0) {
          const nowTime = hours * 60 + minutes;
          const closestTime = this.timesetting
            .map((item) => {
              const [h, m] = item.timesetting.split(":").map(Number);
              return h * 60 + m;
            })
            .reduce((prev, curr) => {
              return Math.abs(curr - nowTime) < Math.abs(prev - nowTime)
                ? curr
                : prev;
            });
          const diffMinutes = closestTime - nowTime;
          this.hours = Math.floor(diffMinutes / 60);
          this.minutes = diffMinutes % 60;
          this.seconds = 60 - seconds;
        }
      }, 1000);
    },
    deleteTimeSetting(id) {
      axios
        .delete(`http://localhost:3002/timesetting/${id}`)
        .then((response) => {
          console.log(response);
          console.log("Time setting deleted:", id);
          this.fetchTimeSetting();
        })
        .catch((error) => {
          console.error("Error deleting time setting:", error);
        });
    },
    addTimeSetting() {
      let success = false;
      const formattedTime = `${this.f_hours
        .toString()
        .padStart(2, "0")}:${this.t_minutes.toString().padStart(2, "0")}`;

      axios
        .post("http://localhost:3002/timesetting", {
          timesetting: formattedTime,
        })
        .then((response) => {
          console.log("Time setting added:", response.data);
          this.timesetting.push({ timesetting: formattedTime });
          this.newTimeSetting = "";
          success = true;
          const myModal = document.getElementById("Modal_Time");
          myModal.close();
          this.fetchTimeSetting();
        })
        .catch((error) => {
          console.error("Error adding time setting:", error);
        })
        .finally(() => {
          if (success) {
            const successAlert = document.querySelector(".alert-success");
            successAlert.classList.remove("hidden");
            setTimeout(() => {
              successAlert.classList.add("hidden");
            }, 3000);
          } else {
            const errorAlert = document.querySelector(".alert-error");
            errorAlert.classList.remove("hidden");
            setTimeout(() => {
              errorAlert.classList.add("hidden");
            }, 3000);
          }
        });
    },
    addHum_Setting() {
      let success = false;

      axios
        .post("http://localhost:3002/Hum_Setting", {
          humidity: this.newHumidity,
        })
        .then((response) => {
          console.log("Humidity setting added:", response.data);
          this.Hum_Settings.push({ humidity: this.newHumidity });
          this.newHumidity = "";
          success = true;

          const humidityModal = document.getElementById("humidityModal");
          humidityModal.close();
          this.fetchHum_Setting();
        })
        .catch((error) => {
          console.error("Error adding humidity setting:", error);
        })
        .finally(() => {
          if (success) {
            const successAlert = document.querySelector(".alert-success");
            successAlert.classList.remove("hidden");
            setTimeout(() => {
              successAlert.classList.add("hidden");
            }, 3000);
          } else {
            const errorAlert = document.querySelector(".alert-error");
            errorAlert.classList.remove("hidden");
            setTimeout(() => {
              errorAlert.classList.add("hidden");
            }, 3000);
          }
        });
    },
    switchOpen(paramValue) {
      let _payload = "";
      console.log(paramValue);
      if (paramValue == 0) {
        _payload = "BUZZER_ON";
      } else {
        _payload = "BUZZER_OFF";
      }
      this.publishDataToNetpie(_payload);
      this.updateServerStatus(_payload, this.buzzer, this.hum, this.temp);
    },
    publishDataToNetpie(payload) {
      let targetTopic = "topic=lab_ict_kps%2Fcommand";
      let apiurl = "http://api.netpie.io/v2/device/message" + "?" + targetTopic;
      let headers = {
        "Content-Type": "text/plain",
        Authorization:
          "Device 36762317-6e8d-445f-94f1-4548c0a62191:p1xYZpb3kPr3i5quDNBQkUg1gscPDgNh",
      };
      let data = payload;
      axios
        .put(apiurl, data, { headers })
        .then(() => {})
        .catch((error) => {
          console.log("Publish failed:", error);
        });
    },
    updateServerStatus(payload, bunzer, hum, temp) {
      let logEntry = {
        DATE: this.getCurrentDate(),
        Time: this.getCurrentTime(),
        Temp: temp,
        Hum: hum,
        Buzzer: bunzer,
      };
      this.saveDataToJSON(logEntry);
    },

    saveDataToJSON(logEntry) {
      axios
        .post("http://localhost:3002/log_data", logEntry)
        .then(() => {
          console.log("Data saved successfully.");
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    },

    getCurrentDate() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },

    getCurrentTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },

    deleteHum_Setting(id) {
      axios
        .delete(`http://localhost:3002/Hum_Setting/${id}`)
        .then((response) => {
          console.log(response);
          console.log("Humidity setting deleted:", id);
          this.fetchHum_Setting();
        })
        .catch((error) => {
          console.error("Error deleting humidity setting:", error);
        });
    },
  },
};
</script>
