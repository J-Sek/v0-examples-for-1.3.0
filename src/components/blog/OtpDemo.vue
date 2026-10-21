<script setup lang="ts">
  import { Otp } from '@vuetify/v0'
  import { ref, shallowRef } from 'vue'

  const code = shallowRef('')
  const completed = ref<string[]>([])
  const submitted = shallowRef('')

  function onSubmit (e: Event) {
    submitted.value = new URLSearchParams(new FormData(e.target as HTMLFormElement) as never).toString()
  }
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Otp.Root
      v-slot="{ items }"
      v-model="code"
      class="flex gap-2"
      data-testid="otp-root"
      :length="6"
      name="otp"
      @complete="completed.push($event)"
    >
      <Otp.Item
        v-for="item in items"
        :key="item.index"
        class="size-10 rounded border border-subtle bg-surface-tint text-center text-lg data-[state=filled]:border-primary"
        :index="item.index"
      />
    </Otp.Root>

    <button class="mt-2 px-3 py-1 rounded border border-subtle text-sm" type="submit">Submit form</button>
  </form>

  <p class="mt-2 text-sm font-mono" data-testid="otp-state">v-model = "{{ code }}" · @complete = {{ completed }} · form = {{ submitted || '—' }}</p>
</template>
