<script setup lang="ts">
  import { useKanbanRoot } from '@vuetify/v0'
  import { computed } from 'vue'

  const { dnd } = useKanbanRoot('v0:kanban')

  // ponytail: rects are snapshotted at drag start, so the line drifts if the page scrolls mid-drag.
  const line = computed(() => {
    const drag = dnd.active.value
    if (!drag || drag.over === null || !drag.willAccept) return null
    const indicator = dnd.zones.get(drag.over)?.indicator.value
    if (!indicator) return null
    const { rect, edge } = indicator
    const gap = 2
    return {
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      top: `${(edge === 'before' ? rect.top - gap : rect.bottom + gap) - 1}px`,
    }
  })
</script>

<template>
  <div
    v-if="line"
    aria-hidden="true"
    class="pointer-events-none fixed z-10 h-0.5 rounded bg-primary"
    data-testid="kanban-pointer-indicator"
    :style="line"
  />
</template>
