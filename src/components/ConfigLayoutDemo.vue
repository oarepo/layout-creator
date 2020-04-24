<template lang="pug">
  demo-component(:record="record" :options="options" :jsonSchema="jsonSchema" v-bind="$props")
</template>

<script>
import DemoComponent from './DemoComponent'
import DialogWithPropertyComponent from './DialogWithPropertyComponent'
import Vue from 'vue'

export default {
  name: 'config-layout-demo',
  components: { DemoComponent },
  props: {
    displaySchema: String
  },
  data: function () {
    return {
      record: {
        cron: {},
        lang: {
          name: 'python',
          version: '3.7'
        },
        scripts: [],
        databases: {
          default: {
            NAME: 'app_name',
            USER: 'user_name',
            ENGINE: 'django.db.backends.postgresql_psycopg2',
            VERSION: '9.6'
          }
        },
        server_name: 'app-name',
        extra_allowed_hosts: [],
        production_settings: 'app_name.settings',
        debug: false
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel,
          dialogComponent: DialogWithPropertyComponent
        },
        showEmpty: true
      },
      jsonSchema: {
        type: 'object',
        $schema: 'http://json-schema.org/draft-07/schema#',
        required: ['lang', 'production_settings', 'secret_key', 'debug', 'server_name', 'databases', 'use_django_admin', 'social_auth'],
        properties: {
          cron: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              required: ['user', 'command', 'execution-type', 'environment', 'minute', 'hour', 'day', 'month', 'weekday'],
              properties: {
                day: {
                  type: 'string',
                  pattern: '^(\\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\\*\\/([1-9]|1[0-9]|2[0-9]|3[0-1]))$'
                },
                hour: {
                  type: 'string',
                  pattern: '^(\\*|([0-9]|1[0-9]|2[0-3])|\\*\\/([0-9]|1[0-9]|2[0-3]))$'
                },
                user: { type: 'string' },
                month: {
                  type: 'string',
                  pattern: '^(\\*|([1-9]|1[0-2])|\\*\\/([1-9]|1[0-2]))$'
                },
                minute: {
                  type: 'string',
                  pattern: '^(\\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\\*\\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]))$'
                },
                command: { type: 'string' },
                weekday: {
                  type: 'string',
                  pattern: '^(\\*|([0-6])|\\*\\/([0-6]))$'
                },
                environment: {
                  type: 'object',
                  additionalProperties: { type: 'string' }
                },
                'execution-type': {
                  enum: ['venv'],
                  type: 'string'
                }
              }
            }
          },
          lang: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              version: { type: 'string' }
            }
          },
          $order: { type: 'integer' },
          scripts: {
            type: 'array',
            items: { type: 'string' }
          },
          databases: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              required: ['ENGINE', 'USER', 'PASSWORD'],
              properties: {
                HOST: { type: 'string' },
                NAME: { type: 'string' },
                PORT: { type: 'integer' },
                USER: { type: 'string' },
                ENGINE: { type: 'string' },
                VERSION: { type: 'string' },
                PASSWORD: { type: 'string' }
              }
            }
          },
          secret_key: { type: 'string' },
          server_name: { type: 'string' },
          social_auth: {
            type: 'object',
            required: ['server', 'key', 'secret'],
            properties: {
              key: { type: 'string' },
              secret: { type: 'string' },
              server: { type: 'string' },
              'server-logout': { type: 'string' }
            }
          },
          server_host_name: { type: 'string' },
          extra_allowed_hosts: {
            type: 'array',
            items: { type: 'string' }
          },
          production_settings: { type: 'string' },
          'readonly-test-databases': {
            type: 'object',
            additionalProperties: {
              type: 'object',
              required: ['ENGINE', 'USER', 'PASSWORD'],
              properties: {
                HOST: { type: 'string' },
                NAME: { type: 'string' },
                PORT: { type: 'integer' },
                USER: { type: 'string' },
                ENGINE: { type: 'string' },
                VERSION: { type: 'string' },
                PASSWORD: { type: 'string' }
              }
            }
          },
          debug: { type: 'boolean' }
        },
        additionalProperties: false
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
