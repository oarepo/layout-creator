class SchemaToLayout {
  constructor (schema, typeLayouts, options) {
    options = { showEmpty: true, ...(options || {}) }
    this.options = options
    this.typeLayouts = typeLayouts || {}
    this.layout = this.convert(schema.type, schema)
    this.layout.showEmpty = options.showEmpty
  }

  convert (path, schema) {
    let type = schema.type
    const id = schema.$id
    if (id !== undefined) {
      if (id.includes('#')) {
        type = id.split('#')[1]
      }
    }
    if (this.typeLayouts[type] !== undefined) {
      return this.typeLayouts[type]
    }
    if (schema.type === 'object') {
      return this.convertObj(path, schema)
    } else if (schema.type === 'array') {
      return this.convertArr(path, schema)
    } else {
      return this.convertStr(path)
    }
  }

  convertObj (path, schema) {
    if (schema.properties) {
      return {
        prop: path,
        children: this.convertObjProps(schema.properties)
      }
    }
    if (schema.additionalProperties) {
      if (schema.additionalProperties.type === 'object') {
        return {
          prop: path,
          children: this.convertObjProps(schema.additionalProperties.properties)
        }
      }
      return {
        prop: path
      }
    }
  }

  convertArr (path, schema) {
    if (Array.isArray(schema.items)) {
      const arrayChildren = this.convertArrItems(schema.items)
      return {
        prop: path,
        children: [
          {
            prop: path,
            children: arrayChildren
          }
        ]
      }
    }
    if (schema.items && schema.items.type === 'object') {
      return {
        prop: path,
        item: {
          children: this.convertObjProps(schema.items.properties)
        }
      }
    }
    return {
      prop: path,
      item: {}
    }
  }

  convertStr (path) {
    return {
      prop: path
    }
  }

  convertArrItems (items) {
    return items.map(item => {
      return Object.getOwnPropertyNames(item).filter(k => !k.startsWith('__')).map(k => {
        const val = item[k]
        return this.convert(k, val)
      })
    }).flat()
  }

  convertObjProps (props) {
    return Object.getOwnPropertyNames(props).filter(k => !k.startsWith('__')).map(k => {
      const val = props[k]
      return this.convert(k, val)
    })
  }
}

function schemaToLayout (schema, typeLayouts, options) {
  return new SchemaToLayout(schema, typeLayouts, options).layout
}

export { SchemaToLayout, schemaToLayout }
