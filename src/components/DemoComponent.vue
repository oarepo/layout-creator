<template lang="pug">
  div
    q-toggle(v-model="onlyData") show only data
    .row
      div(:class="{'col-4':!onlyData, 'col-12':onlyData}")
        h6.q-mb-lg.q-mt-lg JSON schema data editor component
        data-editor(:record="record" :layout="layout" :path-layouts="pathLayouts" :options="options" :editor-components="editorComponents")
      .col-8.row(v-if="!onlyData")
        .col-8
          h6 JSON Schema
          pre {{jsonSchema}}
        .col-4
          h6 Generated layout
          pre {{layout}}
</template>

<script>
import { schemaToLayout } from '../../library'

export default {
  name: 'demo-component',
  props: {
    record: Object,
    jsonSchema: Object,
    typeLayouts: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    },
    pathLayouts: Object,
    displaySchema: String,
    editorComponents: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      onlyData: false
    }
  },
  computed: {
    currentPathLayouts () {
      return this.pathLayouts || {}
    },
    layout () {
      return schemaToLayout(this.jsonSchema, this.typeLayouts)
    },
    currentSchema () {
      return this.displaySchema
    },
    currentOptions () {
      const opts = { ...this.options }
      if (opts.schema !== this.currentSchema) {
        opts.schema = this.currentSchema
      }
      return opts
    }
  }
}
</script>

<style scoped>

</style>
