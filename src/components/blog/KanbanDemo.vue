<script setup lang="ts">
  import { Kanban, type KanbanMovePayload } from '@vuetify/v0'
  import { computed, reactive, ref, shallowRef } from 'vue'
  import KanbanPointerIndicator from './KanbanPointerIndicator.vue'

  const columns = [
    { id: 'todo', label: 'Todo', items: ref(['Write spec', 'Review PR', 'Fix bug']) },
    { id: 'doing', label: 'Doing', items: ref(['Ship docs']) },
    { id: 'frozen', label: 'Frozen (disabled)', items: ref(['Archived']), disabled: true },
    { id: 'done', label: 'Done (rejects "bug")', items: ref<string[]>([]), accept: (value: string) => !value.includes('bug') },
  ]

  const collapsed = reactive(new Set<string>())
  const tracks = computed(() => columns.map(c => collapsed.has(c.id) ? '2.5rem' : 'minmax(180px, 1fr)').join(' '))

  // A collapsed column hides its cards, so it refuses drops; keyboard moves skip it too.
  function accepts (column: typeof columns[number], value: string) {
    return !collapsed.has(column.id) && (column.accept?.(value) ?? true)
  }

  function toggle (id: string) {
    if (collapsed.has(id)) collapsed.delete(id)
    else collapsed.add(id)
  }

  const moves = ref<KanbanMovePayload[]>([])
  const rtl = shallowRef(false)
</script>

<template>
  <div class="grid grid-cols-[auto_1fr] items-center gap-4 mb-3 text-sm">
    <label class="grid grid-cols-[auto_auto] items-center gap-2">
      <input v-model="rtl" type="checkbox"> RTL
    </label>

    <span class="opacity-60">
      Mouse: press an item and drag it onto another column. Keyboard: Tab to an item, Space or Enter picks it up,
      ←/→ switch column, ↑/↓ move within it, Home/End jump to the ends, Space or Enter drops, Escape cancels.
    </span>
  </div>

  <Kanban.Root
    class="grid grid-cols-[minmax(0,1fr)] gap-3"
    :dir="rtl ? 'rtl' : 'ltr'"
    label="Demo board"
    @move="moves.unshift($event)"
  >
    <div class="grid gap-3 overflow-x-auto pb-1" :style="{ gridTemplateColumns: tracks }">
      <Kanban.Column
        v-for="column in columns"
        :id="column.id"
        :key="column.id"
        v-slot="{ items }"
        v-model="column.items.value"
        :accept="(value: string) => accepts(column, value)"
        class="grid grid-rows-[auto_1fr] rounded-lg border border-subtle p-2 data-[collapsed]:px-1 data-[target]:ring-2 data-[target]:ring-primary data-[disabled]:opacity-50"
        :data-collapsed="collapsed.has(column.id) || undefined"
        :data-testid="`column-${column.id}`"
        :disabled="column.disabled"
        :label="column.label"
      >
        <div
          class="grid gap-2 text-xs font-medium"
          :class="collapsed.has(column.id) ? 'justify-items-center content-start' : 'grid-cols-[1fr_auto_auto] items-center mb-2'"
        >
          <template v-if="!collapsed.has(column.id)">
            {{ column.label }}
            <span class="font-normal opacity-60">{{ items.length }}</span>
          </template>

          <button
            :aria-expanded="!collapsed.has(column.id)"
            :aria-label="`${column.label} column`"
            class="grid place-items-center size-6 rounded hover:bg-surface-variant"
            :data-testid="`collapse-${column.id}`"
            type="button"
            @click="toggle(column.id)"
          >
            <span
              aria-hidden="true"
              class="size-4"
              :class="collapsed.has(column.id) ? 'icon-[mdi--arrow-expand-horizontal]' : 'icon-[mdi--arrow-collapse-horizontal]'"
            />
          </button>

          <span v-if="collapsed.has(column.id)" class="[writing-mode:vertical-rl] whitespace-nowrap">
            {{ column.label }} <span class="font-normal opacity-60">{{ items.length }}</span>
          </span>
        </div>

        <Kanban.List v-show="!collapsed.has(column.id)" class="grid content-start gap-1 min-h-24 rounded data-[target]:bg-surface-variant data-[over]:bg-surface-variant data-[over]:outline-2 data-[over]:outline-dashed data-[over]:outline-primary">
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
    </div>

    <KanbanPointerIndicator />

    <Kanban.Instructions class="sr-only" />

    <Kanban.LiveRegion v-slot="{ text, attrs }" renderless>
      <p v-bind="attrs" class="text-sm font-mono" data-testid="kanban-live">{{ text || '—' }}</p>
    </Kanban.LiveRegion>
  </Kanban.Root>

  <pre class="mt-3 text-xs" data-testid="kanban-model">{{ Object.fromEntries(columns.map(c => [c.id, c.items.value])) }}</pre>
  <pre class="text-xs" data-testid="kanban-moves">{{ moves }}</pre>
</template>
