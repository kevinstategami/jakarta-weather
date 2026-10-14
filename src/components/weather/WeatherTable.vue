<template>
  <section class="forecast-card">
    <div class="forecast-header">
      <div>
        <h2>Hourly Forecast</h2>
        <p>Data temperatur udara Jakarta per jam</p>
      </div>

      <span class="data-count">{{ totalItems }} Records</span>
    </div>

    <div v-if="isLoading" class="state-container">
      <ion-spinner name="crescent" />
      <h3>Mengambil data cuaca...</h3>
      <p>Mohon tunggu sebentar.</p>
    </div>

    <div v-else-if="errorMessage" class="state-container">
      <ion-icon :icon="alertCircleOutline" class="error-icon" />
      <h3>Gagal memuat data</h3>
      <p>{{ errorMessage }}</p>

      <ion-button fill="outline" @click="emit('retry')">
        Coba Lagi
      </ion-button>
    </div>

    <div v-else-if="totalItems === 0" class="state-container">
      <ion-icon :icon="cloudOfflineOutline" class="empty-icon" />
      <h3>Tidak ada data</h3>
      <p>Data temperatur belum tersedia.</p>
    </div>

    <template v-else>
      <div class="table-wrapper">
        <table class="weather-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Waktu Pengukuran</th>
              <th>Suhu</th>
              <th>Temperatur</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(item, index) in paginatedData"
              :key="item.time"
            >
              <td class="number-cell">{{ startItem + index }}</td>

              <td>
                <div class="time-cell">
                  <ion-icon :icon="timeOutline" />
                  {{ formatDate(item.time) }}
                </div>
              </td>

              <td>
                <strong class="temperature-cell">
                  {{ item.temperature.toFixed(1) }}°C
                </strong>
              </td>

              <td>
                <TemperatureBadge :temperature="item.temperature" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <div class="pagination-summary">
          Menampilkan
          <strong>{{ startItem }}–{{ endItem }}</strong>
          dari
          <strong>{{ totalItems }}</strong>
          data
        </div>

        <div class="pagination-controls">
          <button
            class="pagination-arrow"
            :disabled="currentPage === 1"
            aria-label="Halaman sebelumnya"
            @click="emit('change-page', currentPage - 1)"
          >
            <ion-icon :icon="chevronBackOutline" />
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            class="pagination-page"
            :class="{ active: currentPage === page }"
            :aria-current="currentPage === page ? 'page' : undefined"
            @click="emit('change-page', page)"
          >
            {{ page }}
          </button>

          <button
            class="pagination-arrow"
            :disabled="currentPage === totalPages"
            aria-label="Halaman berikutnya"
            @click="emit('change-page', currentPage + 1)"
          >
            <ion-icon :icon="chevronForwardOutline" />
          </button>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonIcon,
  IonSpinner,
} from '@ionic/vue';
import {
  alertCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  cloudOfflineOutline,
  timeOutline,
} from 'ionicons/icons';

import type { WeatherData } from '@/common/model/weather/weatherData';
import { formatDate } from '@/common/utils/format-date.utils';
import TemperatureBadge from './TemperatureBadge.vue';

defineProps<{
  isLoading: boolean;
  errorMessage: string;
  totalItems: number;
  paginatedData: WeatherData[];
  startItem: number;
  endItem: number;
  currentPage: number;
  totalPages: number;
  visiblePages: number[];
}>();

const emit = defineEmits<{
  retry: [];
  'change-page': [page: number];
}>();
</script>

<style scoped>
.forecast-card {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e5eaf2;
  border-radius: 18px;
}

.forecast-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.forecast-header h2 {
  margin: 0;
  color: #172b4d;
  font-size: 20px;
  font-weight: 700;
}

.forecast-header p {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 13px;
}

.data-count {
  color: #2563eb;
  background: #eff6ff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.table-wrapper {
  overflow-x: auto;
}

.weather-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.weather-table thead {
  background: #f8fafc;
}

.weather-table th {
  padding: 15px 24px;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border-top: 1px solid #edf0f5;
  border-bottom: 1px solid #edf0f5;
}

.weather-table td {
  padding: 16px 24px;
  color: #334155;
  font-size: 13px;
  border-bottom: 1px solid #edf0f5;
}

.weather-table tbody tr:hover {
  background: #f8fafc;
}

.number-cell {
  color: #94a3b8 !important;
}

.time-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.time-cell ion-icon {
  color: #94a3b8;
  font-size: 17px;
}

.temperature-cell {
  font-weight: 700;
  color: #172b4d;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 24px;
}

.pagination-summary {
  color: #64748b;
  font-size: 12px;
}

.pagination-summary strong {
  color: #334155;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.pagination-arrow,
.pagination-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 8px;
  border: 1px solid #e5eaf2;
  background: white;
  border-radius: 8px;
  color: #475569;
  font-size: 12px;
  cursor: pointer;
}

.pagination-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination-page.active {
  background: #2563eb;
  border-color: #2563eb;
  color: white;
  font-weight: 700;
}

.pagination-arrow:not(:disabled):hover,
.pagination-page:not(.active):hover {
  background: #f1f5f9;
}

.state-container {
  padding: 70px 24px;
  text-align: center;
}

.state-container h3 {
  color: #172b4d;
  font-size: 17px;
}

.state-container p {
  color: #64748b;
  font-size: 13px;
}

.state-container ion-spinner {
  width: 32px;
  height: 32px;
  color: #2563eb;
}

.error-icon,
.empty-icon {
  font-size: 42px;
  color: #ef4444;
}

.empty-icon {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .forecast-header {
    padding: 20px;
  }

  .weather-table th,
  .weather-table td {
    padding: 14px 16px;
  }

  .pagination {
    justify-content: center;
  }

  .pagination-summary {
    width: 100%;
    text-align: center;
  }
}
</style>
