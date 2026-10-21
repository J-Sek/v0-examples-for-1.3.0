<script setup lang="ts">
  import { Combobox } from '@vuetify/v0'
  import { shallowRef } from 'vue'

  const fruits = ['Apple', 'Banana', 'Cherry']
  const loose = shallowRef<string>()
  const strict = shallowRef<string>()

  const control = 'px-2 py-1 rounded border border-subtle bg-surface-tint'
  const content = 'm-0 rounded border border-subtle bg-surface p-1 text-on-surface'
  const option = 'px-2 py-0.5 rounded data-[highlighted]:bg-primary data-[highlighted]:text-on-primary'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 text-sm">
    <div>
      <div class="mb-1 opacity-60">default (non-strict)</div>

      <Combobox.Root v-model="loose">
        <Combobox.Activator>
          <Combobox.Control :class="control" data-testid="combo-loose" placeholder="Type anything" />
        </Combobox.Activator>

        <Combobox.Content :class="content">
          <Combobox.Item
            v-for="fruit in fruits"
            :id="fruit"
            :key="fruit"
            :class="option"
            :value="fruit"
          >{{ fruit }}</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>

      <p class="mt-1 font-mono" data-testid="combo-loose-value">v-model = {{ JSON.stringify(loose) }}</p>
    </div>

    <div>
      <div class="mb-1 opacity-60">strict</div>

      <Combobox.Root v-model="strict" strict>
        <Combobox.Activator>
          <Combobox.Control :class="control" data-testid="combo-strict" placeholder="Type anything" />
        </Combobox.Activator>

        <Combobox.Content :class="content">
          <Combobox.Item
            v-for="fruit in fruits"
            :id="fruit"
            :key="fruit"
            :class="option"
            :value="fruit"
          >{{ fruit }}</Combobox.Item>
        </Combobox.Content>
      </Combobox.Root>

      <p class="mt-1 font-mono" data-testid="combo-strict-value">v-model = {{ JSON.stringify(strict) }}</p>
    </div>
  </div>
</template>
