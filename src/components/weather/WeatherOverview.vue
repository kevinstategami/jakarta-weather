<template>
  <section class="overview-card">
    <div class="overview-top">
      <div>
        <p class="overview-label">LOCATION OVERVIEW</p>
        <h2>Jakarta, Indonesia</h2>
        <p class="overview-subtitle">
          Prakiraan temperatur per jam
        </p>
      </div>

      <ion-icon
        :icon="partlySunnyOutline"
        class="weather-illustration"
      />
    </div>

    <div class="current-temperature">
      <span class="temperature-value">{{ currentTemperature }}</span>
      <span class="temperature-unit">°C</span>
    </div>

    <p class="temperature-caption">
      {{ currentTemperatureLabel }}
    </p>

    <div class="overview-divider"></div>

    <div class="metrics-grid">
      <div class="metric">
        <div class="metric-label">
          <ion-icon :icon="arrowDownOutline" />
          Suhu Minimum
        </div>
        <strong>{{ minimumTemperature }}°C</strong>
      </div>

      <div class="metric">
        <div class="metric-label">
          <ion-icon :icon="arrowUpOutline" />
          Suhu Maksimum
        </div>
        <strong>{{ maximumTemperature }}°C</strong>
      </div>

      <div class="metric">
        <div class="metric-label">
          <ion-icon :icon="statsChartOutline" />
          Rata-rata
        </div>
        <strong>{{ averageTemperature }}°C</strong>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import {
  arrowDownOutline,
  arrowUpOutline,
  partlySunnyOutline,
  statsChartOutline,
} from 'ionicons/icons';

defineProps<{
  currentTemperature: string;
  currentTemperatureLabel: string;
  minimumTemperature: string;
  maximumTemperature: string;
  averageTemperature: string;
}>();
</script>

<style scoped>
.overview-card {
  padding: 32px;
  border-radius: 20px;
  background: linear-gradient(135deg, #0f2747, #214b77);
  color: white;
  margin-bottom: 24px;
}

.overview-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.overview-label {
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.6px;
  color: #a9c8eb;
}

.overview-top h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.overview-subtitle {
  margin: 10px 0 0;
  color: #bdd1e7;
  font-size: 13px;
}

.weather-illustration {
  font-size: 72px;
  color: #facc15;
}

.current-temperature {
  display: flex;
  align-items: flex-start;
  margin-top: 25px;
  font-weight: 700;
}

.temperature-value {
  font-size: clamp(52px, 7vw, 76px);
  line-height: 1;
}

.temperature-unit {
  margin: 8px 0 0 5px;
  font-size: 28px;
}

.temperature-caption {
  margin: 8px 0 0;
  color: #bdd1e7;
  font-size: 13px;
}

.overview-divider {
  height: 1px;
  background: rgb(255 255 255 / 18%);
  margin: 30px 0 24px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.metric-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bdd1e7;
  font-size: 12px;
  margin-bottom: 12px;
}

.metric-label ion-icon {
  font-size: 17px;
}

.metric strong {
  font-size: 24px;
}

@media (max-width: 768px) {
  .overview-card {
    padding: 24px;
  }

  .weather-illustration {
    font-size: 48px;
  }

  .metrics-grid {
    gap: 12px;
  }

  .metric-label {
    font-size: 10px;
  }

  .metric strong {
    font-size: 18px;
  }
}
</style>
