<template>
  <span class="temperature-status" :class="temperatureClass">
    {{ temperatureLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  temperature: number;
}>();

const temperatureLabel = computed(() => {
  if (props.temperature < 25) return 'Sejuk';
  if (props.temperature < 30) return 'Hangat';

  return 'Panas';
});

const temperatureClass = computed(() => {
  if (props.temperature < 25) return 'cool';
  if (props.temperature < 30) return 'warm';

  return 'hot';
});
</script>

<style scoped>
.temperature-status {
  display: inline-block;
  border-radius: 7px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
}

.temperature-status.cool {
  color: #0369a1;
  background: #e0f2fe;
}

.temperature-status.warm {
  color: #a16207;
  background: #fef9c3;
}

.temperature-status.hot {
  color: #c2410c;
  background: #ffedd5;
}
</style>
