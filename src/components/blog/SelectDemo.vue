<script setup lang="ts">
  import { Select } from '@vuetify/v0'
  import { shallowRef } from 'vue'

  const fruits = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Cranberry']
  const fruit = shallowRef('Cherry')
</script>

<template>
  <div class="flex items-center gap-3 text-sm">
    <span id="fruit-label">Favorite fruit</span>

    <Select.Root v-model="fruit">
      <Select.Activator
        aria-labelledby="fruit-label"
        class="min-w-32 px-3 py-1 rounded border border-subtle text-left"
        data-testid="select-activator"
        label="Ignored when aria-labelledby is set"
      >
        <Select.Value v-slot="{ selectedValue }">{{ selectedValue }}</Select.Value>
      </Select.Activator>

      <Select.Content class="m-0 rounded border border-subtle bg-surface p-1 text-on-surface" data-testid="select-content" eager>
        <Select.Item
          v-for="f in fruits"
          :id="f"
          :key="f"
          class="px-2 py-0.5 rounded data-[highlighted]:bg-primary data-[highlighted]:text-on-primary data-[selected]:font-bold"
          :value="f"
        >
          {{ f }}
        </Select.Item>
      </Select.Content>
    </Select.Root>

    <span class="font-mono" data-testid="select-value">v-model = {{ fruit }}</span>
  </div>
</template>
