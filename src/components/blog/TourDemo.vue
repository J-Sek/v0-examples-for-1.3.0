<script setup lang="ts">
  import { createValidation, Tour, useTour } from '@vuetify/v0'
  import { onBeforeUnmount, ref, shallowRef } from 'vue'

  const tour = useTour()
  const name = shallowRef('')
  const log = ref<string[]>([])

  const steps = [
    { id: 'intro', title: 'Intro', text: 'This button is the activator for step 1.' },
    { id: 'name', title: 'Form gate', text: 'Next is blocked until the name field is filled.' },
    { id: 'done', title: 'Done', text: 'No activator: content is centered.', noActivator: true },
  ]

  function start () {
    tour.stop()
    tour.steps.clear()
    tour.steps.onboard(steps.map(step => ({
      id: step.id,
      noActivator: step.noActivator,
      enter: ({ done, direction }) => {
        log.value.unshift(`enter ${step.id} (${direction})`)
        done()
      },
      leave: () => log.value.unshift(`leave ${step.id}`),
      completed: () => log.value.unshift(`completed ${step.id}`),
    })))
    tour.form.register({
      id: 'name',
      value: createValidation({ value: name, rules: [v => !!v || 'Required'] }),
    })
    tour.start()
  }

  onBeforeUnmount(() => tour.reset())
</script>

<template>
  <div class="flex flex-wrap gap-3 items-center">
    <Tour.Activator class="inline-block" step="intro">
      <button class="px-3 py-1 rounded border border-subtle" data-testid="tour-start" type="button" @click="start">Start tour</button>
    </Tour.Activator>

    <Tour.Activator class="inline-block" step="name">
      <input v-model="name" class="px-2 py-1 rounded border border-subtle bg-surface-tint" data-testid="tour-name" placeholder="Your name">
    </Tour.Activator>
  </div>

  <Tour.Keyboard />
  <Tour.Highlight />

  <Tour.Root v-for="step in steps" :key="step.id" :step="step.id">
    <Tour.Content class="w-64 rounded-lg border border-subtle bg-surface p-3 text-on-surface shadow-lg" data-testid="tour-content">
      <Tour.Title class="font-medium">{{ step.title }}</Tour.Title>
      <Tour.Description class="text-sm opacity-70">{{ step.text }}</Tour.Description>

      <div class="mt-2 flex items-center gap-2 text-sm">
        <Tour.Progress class="opacity-60" />
        <Tour.Prev class="ml-auto px-2 rounded border border-subtle data-[disabled]:opacity-40">Back</Tour.Prev>
        <Tour.Next class="px-2 rounded border border-subtle data-[disabled]:opacity-40" data-testid="tour-next">Next</Tour.Next>
        <Tour.Skip class="px-2 opacity-60">Skip</Tour.Skip>
      </div>
    </Tour.Content>
  </Tour.Root>

  <pre class="mt-2 text-xs" data-testid="tour-log">{{ log }}</pre>
</template>
