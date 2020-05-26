# @oarepo/data-editor

A library for generating layout from JSON schema.

<p align="center">
    <a href="https://travis-ci.org/oarepo/layout-creator" target="_blank">
        <img src="https://img.shields.io/travis/oarepo/layout-creator"
            alt="travis build stat"></a>
    <a href="https://www.npmjs.com/package/@oarepo/layout-creator" target="_blank">
        <img src="https://img.shields.io/npm/v/@oarepo/layout-creator"
            alt="npm version"></a>
</p>

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Schema](#schema)
  * [typeLayouts](#typeLayouts)
  * [Layout](#layout)
- [Examples](#examples)
  * [Simple example](#simple-example)

<!-- tocstop -->

## Installation
```
yarn add @oarepo/layout-creator
```

## Usage

``layout-creator`` provides schemaToLayout(schema, typeLayouts, options) function to generate a layout from JSON schema.
``layout`` explanation and examples can be found here [data renderer - layout](https://github.com/oarepo/data-renderer#layout)
``schema`` is a required parameter, ``typeLayouts`` parameter is optional.

#### schema

 ``schema`` stands for a JSON schema that will be used to generate the layout for e.g. ``data-renderer``. 
 Keyword ``layout`` can be used inside JSON schema to define custom parts of layout to be included in generated layout. 
 If ``layout`` keyword contains ``hide: true``, this part of JSON schema will be skipped when layout is being generated.
 
 * skip data structure with ``hide: true``
 ```javascript
export default {
  jsonSchema: {
    $id: 'https://example.com/person.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Person',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        description: "The person's first name.",
        layout: {
          hide: true
        }
      }
    }
  }
}
```
 
 * use ``p`` html tag for label element of firstName
 ```javascript
export default {
  jsonSchema: {
    $id: 'https://example.com/person.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Person',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        description: "The person's first name.",
        layout: {
          label: {
            label: 'p'
          }
        }
      }
    }
  }
}
```


#### typeLayouts

``typeLayouts`` can be used to provide a type specific layout, e.g. layout for each data structure of type string.

* use ``p`` html tag for label element of all string data structures
 ```javascript
export default {
  typeLayouts: {
    string: {
      label: { label: 'p' }
    }
  }
}
```

* hide all string data structures
 ```javascript
export default {
  typeLayouts: {
    string: {
      hide: true
    }
  }
}
```

## Examples

Examples are located at [/src/components](https://github.com/oarepo/layout-creator/blob/master/src/components.vue):
 
#### Simple example

Example with layout generated from a simple JSON schema and passed to data-editor component. Similar demo is located at [/src/components/SimpleSchemaDemo.vue](https://github.com/oarepo/layout-creator/blob/master/src/components/SimpleSchemaDemo.vue):
```vue
<template lang="pug">
  data-editor(:record="record" :layout="layout" :options="options")
</template>

<script>
import Vue from 'vue'
import { schemaToLayout } from '@oarepo/layout-creator'

export default {
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
            description: "The person's first name.",
            layout: {
              hide: true
            }
          },
          lastName: {
            type: 'string',
            description: "The person's last name.",
            layout: {
              label: {
                label: 'p'
              }
            }
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
  computed: {
    layout () {
      return schemaToLayout(this.jsonSchema)
    }
  },
  methods: {
    submit ({ context, prop, value }) {
      Vue.set(context, prop, value)
    },
    cancel (props) {
      console.log('cancelling')
    }
  }
}
</script>
```
