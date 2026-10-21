<script setup lang="ts">
  import { Virtualizer } from '@vuetify/v0'
  import { ref, shallowRef, useTemplateRef } from 'vue'

  let next = 0
  function page (n: number) {
    return Array.from({ length: n }, () => {
      const id = next++
      return { id, text: `Row ${id}`, tall: id % 3 === 0 }
    })
  }

  const items = ref(page(200))
  const loads = shallowRef(0)
  const virtualizer = useTemplateRef('virtualizer')

  function onBottom () {
    if (items.value.length >= 1000) return
    items.value.push(...page(100))
    loads.value++
  }
</script>

<template>
  <div class="flex gap-2 mb-1 text-xs">
    <button class="px-2 rounded border border-subtle" type="button" @click="virtualizer?.scrollTo(150)">scrollTo(150)</button>
    <span data-testid="virtual-stats">{{ items.length }} items · {{ loads }} @bottom loads</span>
  </div>

  <Virtualizer.Root
    ref="virtualizer"
    v-slot="{ items: visible }"
    aria-label="Virtual list"
    as="ul"
    :bottom-threshold="200"
    class="rounded border border-subtle"
    data-testid="virtual-root"
    height="240"
    :item-height="32"
    :items
    role="list"
    @bottom="onBottom"
  >
    <Virtualizer.Spacer as="li" />

    <Virtualizer.Item
      v-for="item in visible"
      :key="item.raw.id"
      :aria-posinset="item.index + 1"
      :aria-setsize="items.length"
      as="li"
      class="border-b-4 border-subtle px-2"
      :class="item.raw.tall ? 'py-6' : 'py-1'"
      :index="item.index"
      tabindex="-1"
    >
      {{ item.raw.text }}
    </Virtualizer.Item>

    <Virtualizer.Spacer as="li" edge="end" />
  </Virtualizer.Root>
</template>
