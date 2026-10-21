<script setup lang="ts">
  import { Checkbox, Radio } from '@vuetify/v0'
  import { shallowRef, useTemplateRef } from 'vue'

  const plan = shallowRef('pro')
  const checkbox = useTemplateRef('checkbox')
  const group = useTemplateRef('group')
  const agreed = shallowRef(false)
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 text-sm">
    <Checkbox.Root ref="checkbox" v-model="agreed" class="px-2 rounded border border-subtle" data-testid="forms-checkbox">
      {{ agreed ? '☑' : '☐' }} Agree
    </Checkbox.Root>

    <Radio.Group ref="group" v-model="plan" class="flex gap-1" label="Plan">
      <Radio.Root
        v-for="p in ['free', 'pro', 'team']"
        :key="p"
        class="px-2 rounded border border-subtle data-[state=checked]:bg-primary data-[state=checked]:text-on-primary"
        :data-testid="`forms-radio-${p}`"
        :value="p"
      >
        {{ p }}
      </Radio.Root>
    </Radio.Group>

    <button class="px-2 rounded border border-subtle" data-testid="forms-focus-checkbox" type="button" @click="checkbox?.element?.focus()">checkbox.element.focus()</button>
    <button class="px-2 rounded border border-subtle" data-testid="forms-focus-group" type="button" @click="group?.focus()">group.focus()</button>
  </div>
</template>
