<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema" v-bind="$props")
</template>

<script>
import Vue from 'vue'
import DemoComponent from './DemoComponent'

export default {
  name: 'simple-schema-demo',
  components: { DemoComponent },
  data: function () {
    return {
      record: {},
      options: {
        schema: 'block',
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
            description: 'The person\'s first name.',
            layout: {
              hide: true
            }
          },
          lastName: {
            type: 'string',
            description: 'The person\'s last name.',
            layout: {
              label: {
                label: 'Last name label'
              }
            }
          },
          age: {
            description: 'Age in years which must be equal to or greater than zero.',
            type: 'integer',
            minimum: 0
          },
          skills: {
            description: 'Various skills.',
            type: 'object',
            required: ['python'],
            properties: {
              python: {
                type: 'object',
                properties: {
                  experience: {
                    type: 'string'
                  },
                  proficiency: {
                    type: 'string'
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
    cancel () {
    }
  }
}
</script>

<style scoped>
</style>
