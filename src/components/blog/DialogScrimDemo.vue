<script setup lang="ts">
  import { Dialog, Scrim } from '@vuetify/v0'
</script>

<template>
  <div class="flex gap-2 text-sm">
    <Dialog.Root v-for="scrim in [true, false]" :key="String(scrim)">
      <Dialog.Activator class="px-3 py-1 rounded border border-subtle" :data-testid="`dialog-open-${scrim}`">
        Open with :scrim="{{ scrim }}"
      </Dialog.Activator>

      <Dialog.Content v-slot="{ attrs, isOpen }" renderless :scrim>
        <div
          v-if="isOpen"
          v-bind="attrs"
          class="fixed inset-0 m-auto h-fit w-72 rounded-lg border border-subtle bg-surface p-4 text-on-surface"
        >
          <Dialog.Title class="font-medium">scrim = {{ scrim }}</Dialog.Title>

          <Dialog.Description class="text-sm opacity-70">
            The app-level Scrim behind this should {{ scrim ? '' : 'not ' }}render.
          </Dialog.Description>

          <Dialog.Close class="mt-2 px-2 rounded border border-subtle" data-testid="dialog-close">Close</Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  </div>

  <Scrim class="fixed inset-0 bg-black/50" data-testid="app-scrim" />
</template>
