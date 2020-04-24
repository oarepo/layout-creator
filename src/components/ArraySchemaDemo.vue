<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema" v-bind="$props")
</template>

<script>
import DemoComponent from './DemoComponent'
import Vue from 'vue'

export default {
  name: 'array-schema-demo',
  components: { DemoComponent },
  props: {
    displaySchema: String
  },
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
      },
      jsonSchema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        properties: {
          phone: {
            type: 'array'
          }
        }
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
      console.log('submit', context, prop, value, op, context[prop])
      if (op === 'replace') {
        context[prop] = value
      }
      console.log('submit', context, prop, value, op, context[prop])
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel (props) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>
</style>
