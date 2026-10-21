<script setup lang="ts">
  import { Kanban, type KanbanMovePayload } from '@vuetify/v0'
  import { ref, shallowRef } from 'vue'
  import KanbanPointerIndicator from './KanbanPointerIndicator.vue'

  const columns = [
    { id: 'todo', label: 'Todo', items: ref(['Write spec', 'Review PR', 'Fix bug']) },
    { id: 'doing', label: 'Doing', items: ref(['Ship docs']) },
    { id: 'frozen', label: 'Frozen (disabled)', items: ref(['Archived']), disabled: true },
    { id: 'done', label: 'Done (rejects "bug")', items: ref<string[]>([]), accept: (value: string) => !value.includes('bug') },
  ]

  const moves = ref<KanbanMovePayload[]>([])
  const rtl = shallowRef(false)
</script>

<template>
  <div class="flex items-center gap-4 mb-3 text-sm">
    <label class="flex items-center gap-2">
      <input v-model="rtl" type="checkbox"> RTL
    </label>

    <span class="opacity-60">
      Mouse: press an item and drag it onto another column. Keyboard: Tab to an item, Space or Enter picks it up,
      ←/→ switch column, ↑/↓ move within it, Home/End jump to the ends, Space or Enter drops, Escape cancels.
    </span>
  </div>

  <Kanban.Root
    class="grid grid-cols-4 gap-3"
    :dir="rtl ? 'rtl' : 'ltr'"
    label="Demo board"
    @move="moves.unshift($event)"
  >
    <Kanban.Column
      v-for="column in columns"
      :id="column.id"
      :key="column.id"
      v-slot="{ items }"
      v-model="column.items.value"
      :accept="column.accept"
      class="flex flex-col rounded-lg border border-subtle p-2 data-[target]:ring-2 data-[target]:ring-primary data-[disabled]:opacity-50"
      :data-testid="`column-${column.id}`"
      :disabled="column.disabled"
      :label="column.label"
    >
      <div class="text-xs font-medium mb-2">{{ column.label }}</div>

      <Kanban.List class="flex flex-1 flex-col gap-1 min-h-24 rounded data-[target]:bg-surface-variant data-[over]:bg-surface-variant data-[over]:outline-2 data-[over]:outline-dashed data-[over]:outline-primary">
        <Kanban.Item
          v-for="item in items"
          :key="item"
          v-slot="{ state }"
          class="cursor-grab select-none touch-none rounded bg-surface-tint px-2 py-1 text-sm border-y-2 data-[state=dragging]:opacity-40 data-[state=dragging]:cursor-grabbing border-transparent data-[drop=before]:border-t-primary data-[drop=after]:border-b-primary data-[state=grabbed]:outline data-[state=grabbed]:outline-primary"
          :label="item"
          :value="item"
        >
          {{ item }} <span class="opacity-40 text-xs">{{ state }}</span>
        </Kanban.Item>
      </Kanban.List>
    </Kanban.Column>

    <KanbanPointerIndicator />

    <Kanban.Instructions class="sr-only" />

    <Kanban.LiveRegion v-slot="{ text, attrs }" renderless>
      <p v-bind="attrs" class="col-span-4 text-sm font-mono" data-testid="kanban-live">{{ text || '—' }}</p>
    </Kanban.LiveRegion>
  </Kanban.Root>

  <pre class="mt-3 text-xs" data-testid="kanban-model">{{ Object.fromEntries(columns.map(c => [c.id, c.items.value])) }}</pre>
  <pre class="text-xs" data-testid="kanban-moves">{{ moves }}</pre>
</template>
