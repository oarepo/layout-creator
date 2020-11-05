class SchemaToLayout {
  constructor (schema, typeLayouts, options) {
    options = { showEmpty: true, ...(options || {}) }
    this.options = options
    this.typeLayouts = typeLayouts || {}
    this.layout = this.convert(schema.type, schema)
    this.layout.showEmpty = options.showEmpty
  }

  convert (path, schema) {
    const converted = this.convertInternal(schema, path)
    if (!converted) {
      return converted
    } return {
      ...converted,
      ...schema.layout || {}
    }
  }

  convertInternal (schema, path) {
    if (schema.layout && schema.layout.hide) {
      return null
    }
    let type = schema.type
    const id = schema.$id
    if (id !== undefined) {
      if (id.includes('#')) {
        type = id.split('#')[1]
      }
    }
    let ret = {}
    if (type === 'object') {
      ret = this.convertObj(path, schema)
    } else if (type === 'array') {
      ret = this.convertArr(path, schema)
    } else {
      ret = this.convertStr(path)
    }
    const typeLayouts = this.typeLayouts
    if (typeLayouts[type] !== undefined) {
      if (typeLayouts[type].hide) {
        return null
      }
      ret = { ...ret, ...typeLayouts[type] }
    }
    return ret
  }

  convertObj (path, schema) {
    if (!schema.properties) {
      return {
        prop: path,
        children: []
      }
    }
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
    if (schema.layout && schema.layout.hide) {
      return null
    }
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
    }).flat().filter(k => k !== null)
  }

  convertObjProps (props) {
    console.log(props)
    return Object.getOwnPropertyNames(props).filter(k => !k.startsWith('__')).map(k => {
      const val = props[k]
      return this.convert(k, val)
    }).filter(k => k !== null)
  }
}

function schemaToLayout (schema, typeLayouts, options) {
  return new SchemaToLayout(schema, typeLayouts, options).layout
}

export { SchemaToLayout, schemaToLayout }
