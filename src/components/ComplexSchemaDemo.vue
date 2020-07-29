<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema" v-bind="$props")
</template>

<script>
import Vue from 'vue'
import DemoComponent from './DemoComponent'

export default {
  name: 'complex-schema-demo',
  components: { DemoComponent },
  props: {
    displaySchema: String
  },
  data: function () {
    return {
      record: {},
      jsonSchema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'Schema for a recording',
        type: 'object',
        properties: {
          id: { type: 'number' },
          work: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              composer: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  functions: {
                    type: 'array',
                    items: { type: 'string' }
                  }
                },
                required: ['id', 'name', 'functions']
              }
            }
          },
          recording_artists: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                functions: {
                  type: 'array',
                  items: { type: 'string' }
                }
              },
              required: ['id', 'name', 'functions']
            }
          }
        },
        required: ['id', 'work', 'recording_artists']
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
      }
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        if (Array.isArray(context)) {
          context.splice(prop, 1, value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel () {}
  }
}
</script>

<style scoped>
</style>
