<template>
  <div class="container mx-auto text-xl text-center items-center">
    <table class="table text-2xl font-bold bg-slate-100">
      <thead class="text-black">
        <tr>
          <th class="px-4 py-2 text-2xl font-bold">วันที่</th>
          <th class="px-4 py-2 text-2xl font-bold">เวลา</th>
          <th class="px-4 py-2 text-2xl font-bold">Temperature (°C)</th>
          <th class="px-4 py-2 text-2xl font-bold">Humidity (%)</th>
          <th class="px-4 py-2 text-2xl font-bold">เปิด/ปิดน้ำ</th>
        </tr>
      </thead>
      <tbody class="text-xl text-gray-600">
        <tr v-for="item in data" :key="item.id">
          <td class="border px-4 py-2 text-">{{ item.DATE }}</td>
          <td class="border px-4 py-2">{{ item.Time }}</td>
          <td class="border px-4 py-2">{{ item.Temp }}</td>
          <td class="border px-4 py-2">{{ item.Hum }}</td>
          <td v-if="item.Buzzer == 1" class="border px-4 py-2">เปิดน้ำ</td>
          <td v-if="item.Buzzer == 0" class="border px-4 py-2">ปิดน้ำ</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "log_message",

  data() {
    return {
      data: [], // เริ่มต้น data เป็น array
    };
  },
  mounted() {
    axios
      .get("http://localhost:3002/log_data")
      .then((response) => {
        // เรียงลำดับตาม ID ในลำดับจากมากไปน้อย
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        // เลือกเฉพาะ 3 รายการล่าสุด
        this.data = sortedData.slice(0, 3);
        console.log(this.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
};
</script>
