<script setup lang="ts">
  import { type ID, Menu } from '@vuetify/v0'
  import { ref, shallowRef } from 'vue'

  const fruits = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Cherry']
  const log = ref<string[]>([])
  const wrap = shallowRef(true)
  const size = shallowRef('m')
  const open = shallowRef<ID | null>(null)

  function onItemClick (label: string) {
    log.value.unshift(`${label}: listener ran while open layer = ${open.value}`)
  }

  const item = 'block w-full text-left px-3 py-1 rounded data-[highlighted]:bg-primary data-[highlighted]:text-on-primary data-[disabled]:opacity-40'
  const content = 'm-0 min-w-40 rounded-lg border border-subtle bg-surface p-1 text-on-surface shadow-lg'
</script>

<template>
  <div class="flex flex-wrap gap-4 items-start">
    <Menu.Root v-model="open">
      <Menu.Activator class="px-3 py-1 rounded border border-subtle" data-testid="menu-button">Button menu</Menu.Activator>

      <Menu.Content :class="content" data-testid="menu-content">
        <Menu.Item
          v-for="fruit in fruits"
          :key="fruit"
          :class="item"
          @click="onItemClick(fruit)"
        >
          {{ fruit }}
        </Menu.Item>

        <Menu.Item :class="item" disabled @click="onItemClick('Disabled')">Disabled</Menu.Item>
        <Menu.Separator class="my-1 border-t border-subtle" />

        <Menu.CheckboxItem v-model:checked="wrap" :class="item">
          {{ wrap ? '☑' : '☐' }} Word wrap
        </Menu.CheckboxItem>

        <Menu.RadioGroup v-model="size" label="Size">
          <Menu.RadioItem v-for="s in ['s', 'm', 'l']" :key="s" :class="item" :value="s">
            {{ size === s ? '●' : '○' }} Size {{ s }}
          </Menu.RadioItem>
        </Menu.RadioGroup>

        <Menu.Separator class="my-1 border-t border-subtle" />

        <Menu.Sub>
          <Menu.SubActivator :class="item" data-testid="menu-sub">More ▸</Menu.SubActivator>

          <Menu.SubContent :class="content" data-testid="menu-subcontent">
            <Menu.Item :class="item" @click="onItemClick('Sub A')">Sub A</Menu.Item>
            <Menu.Item :class="item" @click="onItemClick('Sub B')">Sub B</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu.Root>

    <Menu.Root>
      <Menu.Context class="grid place-items-center w-48 h-20 rounded border border-dashed border-subtle text-sm" data-testid="menu-context">
        Right-click here
      </Menu.Context>

      <Menu.Content :class="content">
        <Menu.Item :class="item">Cut</Menu.Item>
        <Menu.Item :class="item">Copy</Menu.Item>
        <Menu.Item :class="item">Paste</Menu.Item>
      </Menu.Content>
    </Menu.Root>

    <Menu.Root>
      <Menu.Bar class="flex gap-1 rounded border border-subtle p-1" data-testid="menu-bar">
        <template v-for="top in ['File', 'Edit', 'View']" :key="top">
          <Menu.Activator class="px-2 py-1 rounded data-[open]:bg-surface-variant data-[highlighted]:bg-surface-variant" :value="top">{{ top }}</Menu.Activator>

          <Menu.Content :class="content" :value="top">
            <Menu.Item :class="item">{{ top }} one</Menu.Item>
            <Menu.Item :class="item">{{ top }} two</Menu.Item>
          </Menu.Content>
        </template>
      </Menu.Bar>
    </Menu.Root>
  </div>

  <p class="mt-2 text-sm">wrap = {{ wrap }}, size = {{ size }}</p>
  <pre class="text-xs" data-testid="menu-log">{{ log }}</pre>
</template>
