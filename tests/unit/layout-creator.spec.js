import { expect } from 'chai'
import { createLocalVue, mount } from '@vue/test-utils'
import install from '@oarepo/data-editor-jsonschema'
import DataEditor from '@oarepo/data-editor'
import DataRenderer from '@oarepo/data-renderer'
import SimpleSchemaDemo from '../../src/components/SimpleSchemaDemo'
// eslint-disable-next-line camelcase
import { html_beautify } from 'js-beautify'
import '../../src/quasar'
import ArraySchemaDemo from '../../src/components/ArraySchemaDemo'
import ObjectSchemaDemo from '../../src/components/ObjectSchemaDemo'

describe('data editor jsonschema components', () => {
  it('renders layout for simple json schema', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataEditor)
    localVue.use(DataRenderer)

    const wrapper = mount(SimpleSchemaDemo, { localVue })
    console.log(html_beautify(wrapper.html()))
    expect(wrapper.html()).to.include('{\n' +
      '  "prop": "object",\n' +
      '  "children": [\n' +
      '    {\n' +
      '      "prop": "lastName",\n' +
      '      "label": {\n' +
      '        "label": "p"\n' +
      '      }\n' +
      '    },\n' +
      '    {\n' +
      '      "prop": "age"\n' +
      '    },\n' +
      '    {\n' +
      '      "prop": "skills",\n' +
      '      "children": [\n' +
      '        {\n' +
      '          "prop": "python"\n' +
      '        }\n' +
      '      ],\n' +
      '      "childrenLayout": {\n' +
      '        "children": [\n' +
      '          {\n' +
      '            "prop": "properties"\n' +
      '          }\n' +
      '        ]\n' +
      '      },\n' +
      '      "additionalProps": {\n' +
      '        "defaultValue": {\n' +
      '          "python": {\n' +
      '            "experience": " 3 months",\n' +
      '            "proficiency": "beginner"\n' +
      '          }\n' +
      '        }\n' +
      '      }\n' +
      '    }\n' +
      '  ],\n' +
      '  "childrenLayout": {},\n' +
      '  "showEmpty": true\n' +
      '}')
  })

  it('renders layout for array json schema', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataEditor)
    localVue.use(DataRenderer)

    const wrapper = mount(ArraySchemaDemo, { localVue })
    console.log(wrapper.html())
    expect(wrapper.html()).to.include('{\n' +
      '  "prop": "object",\n' +
      '  "children": [\n' +
      '    {\n' +
      '      "prop": "phone",\n' +
      '      "item": {}\n' +
      '    }\n' +
      '  ],\n' +
      '  "childrenLayout": {},\n' +
      '  "showEmpty": true\n' +
      '}')
  })

  it('renders layout for object json schema', async () => {
    const localVue = createLocalVue()
    localVue.use(install)
    localVue.use(DataEditor)
    localVue.use(DataRenderer)

    const wrapper = mount(ObjectSchemaDemo, { localVue })
    console.log(wrapper.html())
    expect(wrapper.html()).to.include('{\n' +
      '  "prop": "object",\n' +
      '  "children": [\n' +
      '    {\n' +
      '      "prop": "contact",\n' +
      '      "children": [\n' +
      '        {\n' +
      '          "prop": "phone"\n' +
      '        }\n' +
      '      ],\n' +
      '      "childrenLayout": {}\n' +
      '    }\n' +
      '  ],\n' +
      '  "childrenLayout": {},\n' +
      '  "showEmpty": true\n' +
      '}')
  })
})
