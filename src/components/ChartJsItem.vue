<script lang="ts">
  import { defineComponent } from 'vue';
  import Chart from 'chart.js/auto';
  import { useApiStore, pinia } from '../store/api';
  
  export default defineComponent({
    name: 'SalesMetrics',
    data() {
      return {
        monthlySales: {
          "2024-01": 10,
          "2024-02": 13,
          "2024-03": 9,
          "2024-04": 13,
          "2024-05": 10,
        }
      };
    },
    methods: {
  async renderChart() {
  const ctx = (document.getElementById('monthlySalesChart') as HTMLCanvasElement).getContext('2d');
  if (!ctx) return;

  const labels = Object.keys(this.monthlySales);
  const data = Object.values(this.monthlySales);
  let gameShop = await useApiStore(pinia).fetchGameShop(1);
  const totalSales = gameShop.annualSales
  console.log(totalSales);
  
  
  // Obtener la fecha actual en formato YYYY-MM
  const currentDate = new Date();
  const currentYearMonth = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0');

  // Verificar si el mes actual ya existe en los datos
  if (!this.monthlySales[currentYearMonth]) {
    // Si no existe, agregar el mes actual con un valor de 0
    labels.push(currentYearMonth);
    data.push(0);
  }

  // Añadir el total de ventas actual al último mes
  data[data.length - 1] += totalSales;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Sales',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
    },
    mounted() {
      this.renderChart();
    }
  });
  </script>

<template>
    <div class="sales-metrics">
      <p class="title">Monthly Sales</p>
      <canvas id="monthlySalesChart"></canvas>
    </div>
</template>
  
  <style scoped>
.sales-metrics {
  background-color: var(--color-black);
  color: var(--neutral-colors-white);
  padding: 20px;
  width: 100%;
  height: 600px;
  max-width: 900px;
  margin: 0 auto;
  border-radius: 10px;
  font-family: var(--font-archivo-black);
}

.title {
  text-align: center;
  font-family: var(--font-roboto);
  margin-bottom: 40px;
  font-size: 1.5rem;
}
  </style>
  