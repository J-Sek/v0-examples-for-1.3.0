<script lang="ts" setup>
  import ComboboxDemo from '@/components/blog/ComboboxDemo.vue'
  import DialogScrimDemo from '@/components/blog/DialogScrimDemo.vue'
  import FocusTrapDemo from '@/components/blog/FocusTrapDemo.vue'
  import FormsFocusDemo from '@/components/blog/FormsFocusDemo.vue'
  import KanbanDemo from '@/components/blog/KanbanDemo.vue'
  import MenuDemo from '@/components/blog/MenuDemo.vue'
  import OtpDemo from '@/components/blog/OtpDemo.vue'
  import SelectDemo from '@/components/blog/SelectDemo.vue'
  import TourDemo from '@/components/blog/TourDemo.vue'
  import VirtualizerDemo from '@/components/blog/VirtualizerDemo.vue'

  const demos = [
    { id: 'kanban', title: 'Kanban', component: KanbanDemo },
    { id: 'menu', title: 'Menu', component: MenuDemo },
    { id: 'otp', title: 'Otp', component: OtpDemo },
    { id: 'virtualizer', title: 'Virtualizer', component: VirtualizerDemo },
    { id: 'tour', title: 'Tour', component: TourDemo },
    { id: 'combobox', title: 'Combobox', component: ComboboxDemo },
    { id: 'focus-trap', title: 'useFocusTrap', component: FocusTrapDemo },
    { id: 'dialog', title: 'Dialog scrim', component: DialogScrimDemo },
    { id: 'select', title: 'Select', component: SelectDemo },
    { id: 'forms', title: 'Forms focus', component: FormsFocusDemo },
  ]
</script>

<template>
  <div class="w-full max-w-4xl mx-auto flex flex-col gap-6 py-8">
    <h1 class="text-2xl font-bold text-on-background">Vuetify0 1.3.0 blog post claims</h1>

    <section
      v-for="demo in demos"
      :id="demo.id"
      :key="demo.id"
      class="rounded-xl border border-subtle bg-surface p-4 text-on-surface"
    >
      <h2 class="text-sm font-medium uppercase tracking-wide opacity-50 mb-3">{{ demo.title }}</h2>
      <component :is="demo.component" />
    </section>
  </div>
</template>
