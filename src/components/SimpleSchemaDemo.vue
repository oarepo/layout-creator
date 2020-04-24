<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema" v-bind="$props")
</template>

<script>
import Vue from 'vue'
import DemoComponent from './DemoComponent'

export default {
  name: 'simple-schema-demo',
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
