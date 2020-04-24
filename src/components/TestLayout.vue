<template lang="pug">
  demo-component(:record="record" :options="options" :path-layouts="pathLayouts" :jsonSchema="jsonSchema" v-bind="$props")
</template>

<script>
import DemoComponent from './DemoComponent'
import DialogWithPropertyComponent from './DialogWithPropertyComponent'
import Vue from 'vue'

export default {
  name: 'test-layout',
  components: { DemoComponent },
  props: {
    displaySchema: String
  },
  data: function () {
    return {
      record: {
        cron: {},
        lang: {
          name: ' python',
          version: '3.7'
        },
        scripts: [],
        databases: {
          default: {
            NAME: 'cis_dashboard',
            USER: 'cis_dashboard',
            ENGINE: 'django.db.backends.postgresql_psycopg2',
            VERSION: '9.6'
          }
        },
        server_name: 'cis-dashboard',
        use_django_admin: true,
        extra_allowed_hosts: [],
        production_settings: 'cis_dashboard.settings',
        rest_framework_camel_case_on_frontend: false,
        rest_framework_camel_case_no_underscore_before_number: false
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
      pathLayouts: {},
      // pathLayouts: {
      //   extra_allowed_hosts: {
      //     additionalProps: {
      //       dialogComponent: DialogWithPropertyComponent
      //     }
      //   }
      // },
      jsonSchema: {
        type: 'object',
        $schema: 'http://json-schema.org/draft-07/schema#',
        required: [
          'lang',
          'secret_key',
          'production_settings',
          'databases',
          'server_name',
          'social_auth',
          'rest_framework_camel_case_on_frontend',
          'use_django_admin'
        ],
        properties: {
          cron: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              required: [
                'user',
                'command',
                'execution-type',
                'environment',
                'minute',
                'hour',
                'day',
                'month',
                'weekday'
              ],
              properties: {
                day: {
                  type: 'string',
                  pattern: '^(\\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\\*\\/([1-9]|1[0-9]|2[0-9]|3[0-1]))$'
                },
                hour: {
                  type: 'string',
                  pattern: '^(\\*|([0-9]|1[0-9]|2[0-3])|\\*\\/([0-9]|1[0-9]|2[0-3]))$'
                },
                user: {
                  type: 'string'
                },
                month: {
                  type: 'string',
                  pattern: '^(\\*|([1-9]|1[0-2])|\\*\\/([1-9]|1[0-2]))$'
                },
                minute: {
                  type: 'string',
                  pattern: '^(\\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\\*\\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]))$'
                },
                command: {
                  type: 'string'
                },
                weekday: {
                  type: 'string',
                  pattern: '^(\\*|([0-6])|\\*\\/([0-6]))$'
                },
                environment: {
                  type: 'object',
                  additionalProperties: {
                    type: 'string'
                  }
                },
                'execution-type': {
                  enum: [
                    'venv'
                  ],
                  type: 'string'
                }
              }
            }
          },
          lang: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              version: {
                type: 'string'
              }
            }
          },
          $order: {
            type: 'integer'
          },
          scripts: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          databases: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              required: [
                'ENGINE',
                'USER',
                'PASSWORD'
              ],
              properties: {
                HOST: {
                  type: 'string'
                },
                NAME: {
                  type: 'string'
                },
                PORT: {
                  type: 'integer'
                },
                USER: {
                  type: 'string'
                },
                ENGINE: {
                  type: 'string'
                },
                VERSION: {
                  type: 'string'
                },
                PASSWORD: {
                  type: 'string'
                }
              }
            }
          },
          secret_key: {
            type: 'string'
          },
          server_name: {
            type: 'string'
          },
          social_auth: {
            type: 'object',
            required: [
              'server',
              'key',
              'secret'
            ],
            properties: {
              key: {
                type: 'string'
              },
              secret: {
                type: 'string'
              },
              server: {
                type: 'string'
              },
              'server-logout': {
                type: 'string'
              }
            }
          },
          server_host_name: {
            type: 'string'
          },
          use_django_admin: {
            type: 'boolean'
          },
          extra_allowed_hosts: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          production_settings: {
            type: 'string'
          },
          'readonly-test-databases': {
            type: 'object',
            additionalProperties: {
              type: 'object',
              required: [
                'ENGINE',
                'USER',
                'PASSWORD'
              ],
              properties: {
                HOST: {
                  type: 'string'
                },
                NAME: {
                  type: 'string'
                },
                PORT: {
                  type: 'integer'
                },
                USER: {
                  type: 'string'
                },
                ENGINE: {
                  type: 'string'
                },
                VERSION: {
                  type: 'string'
                },
                PASSWORD: {
                  type: 'string'
                }
              }
            }
          },
          use_cis_login_for_admin: {
            type: 'boolean'
          },
          rest_framework_camel_case_on_frontend: {
            type: 'boolean'
          },
          rest_framework_camel_case_no_underscore_before_number: {
            type: 'boolean'
          }
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
