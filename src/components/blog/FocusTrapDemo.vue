<script setup lang="ts">
  import { useFocusTrap } from '@vuetify/v0'
  import { ref, shallowRef, useTemplateRef } from 'vue'

  const outer = shallowRef(false)
  const inner = shallowRef(false)
  const log = ref<string[]>([])

  const outerEl = useTemplateRef<HTMLElement>('outerEl')
  const innerEl = useTemplateRef<HTMLElement>('innerEl')
  const emptyEl = useTemplateRef<HTMLElement>('emptyEl')
  const empty = shallowRef(false)

  useFocusTrap(outerEl, {
    active: outer,
    onEscape: () => {
      log.value.unshift('outer onEscape')
      outer.value = false
    },
  })
  // No onEscape: Escape must fall through to the outer trap even while this one owns Tab.
  useFocusTrap(innerEl, { active: inner })
  useFocusTrap(emptyEl, { active: empty, onEscape: () => (empty.value = false) })
</script>

<template>
  <div class="flex gap-2 text-sm">
    <button class="px-3 py-1 rounded border border-subtle" data-testid="trap-open" type="button" @click="outer = true">Open panel</button>
    <button class="px-3 py-1 rounded border border-subtle" data-testid="trap-empty-open" type="button" @click="empty = true">Open empty panel</button>
  </div>

  <div v-if="outer" ref="outerEl" class="mt-2 rounded border border-primary p-3 flex flex-wrap gap-2 text-sm" data-testid="trap-outer">
    <button class="px-2 rounded border border-subtle" data-testid="trap-first" type="button">First</button>
    <input class="px-2 rounded border border-subtle bg-surface-tint" placeholder="Middle">
    <button class="px-2 rounded border border-subtle" data-testid="trap-nested" type="button" @click="inner = true">Open nested</button>
    <button class="px-2 rounded border border-subtle" data-testid="trap-last" type="button" @click="outer = false">Close</button>

    <div v-if="inner" ref="innerEl" class="w-full rounded border border-warning p-2 flex gap-2" data-testid="trap-inner">
      <button class="px-2 rounded border border-subtle" data-testid="trap-inner-a" type="button">Inner A</button>
      <button class="px-2 rounded border border-subtle" data-testid="trap-inner-b" type="button" @click="inner = false">Close nested</button>
    </div>
  </div>

  <div
    v-if="empty"
    ref="emptyEl"
    class="mt-2 rounded border border-primary p-3 text-sm"
    data-testid="trap-empty"
    tabindex="-1"
  >
    No tabbable children. Escape closes.
  </div>

  <pre class="mt-2 text-xs" data-testid="trap-log">{{ log }}</pre>
</template>
