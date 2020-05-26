<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema" v-bind="$props" :typeLayouts="typeLayouts")
</template>

<script>
import Vue from 'vue'
import DemoComponent from './DemoComponent'

export default {
  name: 'type-layouts-demo',
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
      typeLayouts: {
        string: {
          label: {
            label: 'string label'
          }
        },
        integer: {
          label: {
            label: 'integer label'
          }
        },
        object: {
          label: {
            label: 'object label',
            class: ['text-red']
          }
        }
      },
      jsonSchema: {
        $id: 'https://example.com/person.schema.json',
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'Person',
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            description: "The person's first name."
          },
          lastName: {
            type: 'string',
            description: "The person's last name."
          },
          age: {
            description: 'Age in years which must be equal to or greater than zero.',
            type: 'integer',
            minimum: 0
          },
          contacts: {
            type: 'object',
            description: "The person's contacts.",
            properties: {
              phone: {
                description: "The person's phone number.",
                type: 'integer',
                minimum: 0
              }
            }
          }
        }
      }
    }
  },
  methods: {
    submit ({ context, prop, value }) {
      console.log({ context, prop, value })
      Vue.set(context, prop, value)
    },
    cancel (props) {
      console.log('cancelling')
    }
  }
}
</script>

<style scoped>
</style>
