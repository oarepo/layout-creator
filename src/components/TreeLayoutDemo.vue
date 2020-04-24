<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema" v-bind="$props" :editor-components="editorComponents")
</template>

<script>
import DemoComponent from './DemoComponent'
import Vue from 'vue'
import DialogWithChoicesComponent from './DialogWithChoicesComponent'
import CustomArrayComponent from './CustomArrayComponent'

export default {
  name: 'tree-layout-demo',
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
          cancel: this.cancel,
          dialogComponent: DialogWithChoicesComponent
        },
        showEmpty: true
      },
      editorComponents: {
        array: CustomArrayComponent
      },
      jsonSchema: {
        $schema: 'http://json-schema.org/draft-07/schema',
        type: 'object',
        properties: {
          object: {
            type: 'object',
            properties: {
              creator: {
                type: 'string'
              },
              contact: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    phone: {
                      type: 'string'
                    },
                    email: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      console.log({ context, prop, value, op })
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel () {
    }
  }
}
</script>

<style scoped>
</style>
