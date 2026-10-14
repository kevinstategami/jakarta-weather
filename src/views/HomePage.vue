<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="app-toolbar">
        <ion-title>
          <div class="brand">
            <ion-icon :icon="partlySunnyOutline" />
            <span>Jakarta Weather</span>
          </div>
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="dashboard-content">
      <main class="dashboard">

        <!-- Header -->
        <section class="page-heading">
          <div>
            <p class="eyebrow">WEATHER ANALYTICS</p>
            <h1>Weather Dashboard</h1>
            <p class="subtitle">
              Pantau prakiraan suhu Jakarta berdasarkan data Open-Meteo.
            </p>
          </div>

          <ion-button
            class="refresh-button"
            :disabled="isLoading"
            @click="fetchWeather"
          >
            <ion-icon
              slot="start"
              :icon="refreshOutline"
            />
            {{ isLoading ? 'Memuat...' : 'Refresh Data' }}
          </ion-button>
        </section>

        <WeatherOverview
          :current-temperature="currentTemperature"
          :current-temperature-label="currentTemperatureLabel"
          :minimum-temperature="minimumTemperature"
          :maximum-temperature="maximumTemperature"
          :average-temperature="averageTemperature"
        />

        <WeatherTable
          :is-loading="isLoading"
          :error-message="errorMessage"
          :total-items="totalItems"
          :paginated-data="paginatedData"
          :start-item="startItem"
          :end-item="endItem"
          :current-page="currentPage"
          :total-pages="totalPages"
          :visible-pages="visiblePages"
          @retry="fetchWeather"
          @change-page="changePage"
        />

        <!-- Footer -->
        <footer class="dashboard-footer">
          <span>Data source: Open-Meteo API</span>
          <span>Timezone: Asia/Jakarta (WIB)</span>
        </footer>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/vue';

import {
  partlySunnyOutline,
  refreshOutline,
} from 'ionicons/icons';

import { getJakartaWeather } from '@/services/weatherService';

import { WEATHER_CONFIG } from '@/common/const/wheater.const';
import type { WeatherData } from '@/common/model/weather/weatherData';
import { formatDate } from '@/common/utils/format-date.utils';
import WeatherOverview from '@/components/weather/WeatherOverview.vue';
import WeatherTable from '@/components/weather/WeatherTable.vue';

// State
const weatherData = ref<WeatherData[]>([]);
const isLoading = ref(false);
const errorMessage = ref('');

const currentPage = ref(1);
const pageSize = WEATHER_CONFIG.pageSize;

// Pagination
const totalItems = computed(() => weatherData.value.length);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalItems.value / pageSize)),
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;

  return weatherData.value.slice(start, start + pageSize);
});

const startItem = computed(() =>
  totalItems.value === 0
    ? 0
    : (currentPage.value - 1) * pageSize + 1,
);

const endItem = computed(() =>
  Math.min(currentPage.value * pageSize, totalItems.value),
);

const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5;

  const start = Math.max(
    1,
    Math.min(
      currentPage.value - Math.floor(maxVisible / 2),
      totalPages.value - maxVisible + 1,
    ),
  );

  const end = Math.min(totalPages.value, start + maxVisible - 1);

  for (let page = start; page <= end; page++) {
    pages.push(page);
  }

  return pages;
});

// Summary
const temperatures = computed(() =>
  weatherData.value.map((item) => item.temperature),
);

const minimumTemperature = computed(() =>
  temperatures.value.length
    ? Math.min(...temperatures.value).toFixed(1)
    : '--',
);

const maximumTemperature = computed(() =>
  temperatures.value.length
    ? Math.max(...temperatures.value).toFixed(1)
    : '--',
);

const averageTemperature = computed(() => {
  if (!temperatures.value.length) return '--';

  const sum = temperatures.value.reduce(
    (total, temperature) => total + temperature,
    0,
  );

  return (sum / temperatures.value.length).toFixed(1);
});

const currentWeather = computed(() => {
  if (!weatherData.value.length) return null;

  const now = new Date();

  const jakartaHour = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hourCycle: 'h23',
  }).format(now).replace(' ', 'T');

  const currentHourWeather = weatherData.value.find(
    (item) => item.time === jakartaHour,
  );

  if (currentHourWeather) return currentHourWeather;

  return weatherData.value.reduce((closest, item) => {
    const itemTime = Date.parse(`${item.time}:00+07:00`);
    const closestTime = Date.parse(`${closest.time}:00+07:00`);

    if (Number.isNaN(itemTime)) return closest;
    if (Number.isNaN(closestTime)) return item;

    return Math.abs(itemTime - now.getTime()) <
      Math.abs(closestTime - now.getTime())
      ? item
      : closest;
  });
});

const currentTemperature = computed(() =>
  currentWeather.value
    ? currentWeather.value.temperature.toFixed(1)
    : '--',
);

const currentTemperatureLabel = computed(() =>
  currentWeather.value
    ? `Prakiraan pada ${formatDate(currentWeather.value.time)}`
    : 'Belum ada data temperatur',
);

// API
async function fetchWeather(): Promise<void> {
  if (isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const data = await getJakartaWeather();

    weatherData.value = data;
    currentPage.value = 1;
  } catch (error: unknown) {
    console.error('Weather API error:', error);

    weatherData.value = [];
    currentPage.value = 1;

    errorMessage.value =
      'Tidak dapat mengambil data dari Open-Meteo. Periksa koneksi internet lalu coba lagi.';
  } finally {
    isLoading.value = false;
  }
}

function changePage(page: number): void {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;
}

onMounted(() => {
  void fetchWeather();
});
</script>

<style scoped>
.dashboard-content {
  --background: #f5f7fb;
}

.app-toolbar {
  --background: #ffffff;
  --color: #172b4d;
  --min-height: 64px;
  --padding-start: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
}

.brand ion-icon {
  color: #2563eb;
  font-size: 25px;
}

.dashboard {
  width: min(100% - 40px, 1160px);
  margin: 0 auto;
  padding: 32px 0;
}

.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.page-heading h1 {
  margin: 0;
  color: #172b4d;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
}

.subtitle {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.refresh-button {
  --background: #2563eb;
  --border-radius: 10px;
  --box-shadow: none;
  font-weight: 600;
  text-transform: none;
  white-space: nowrap;
}

.dashboard-footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
  color: #94a3b8;
  font-size: 12px;
}

@media (max-width: 768px) {
  .dashboard {
    width: min(100% - 28px, 1160px);
    padding-top: 24px;
  }

  .page-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .refresh-button {
    width: 100%;
    margin: 0;
  }

  .dashboard-footer {
    flex-direction: column;
    text-align: center;
  }
}
</style>
