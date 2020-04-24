<template lang="pug">
component(:is="rootComponent")
  div(v-if="hasValue")
    data-renderer-array-component(:value="value" :prop="prop" :layout="layout" :paths="paths" :schema="schema" :path-layouts="pathLayouts" :renderer-components="rendererComponents" :extraProps="extraProps" :level="level")
    div(v-if="!editing")
      q-btn(icon="playlist_add" dense flat color="primary" @click="openDialogWithChoices(choices=currentChoices)" v-if="hasDialog && hasChoices")
      q-btn(icon="playlist_add" dense flat color="primary" @click="openDialog()" v-if="hasDialog && !hasChoices")
      q-btn(icon="playlist_add" dense flat color="primary" @click="beforeStart()" v-if="!hasDialog")
    div.row(v-else)
      q-input(@input="valueInput" ref="editor" autofocus)
      div.q-mt-sm
        q-btn(icon="done" color="primary" @click="addItem" outline) Uložit
        q-btn.q-ml-sm(icon="clear" color="grey" @click="onCancel" outline) Storno
  div(v-else)
    q-btn(icon="playlist_add" dense flat color="primary" @click="createComplexValue()") Vytvořit
</template>

<script>
import { AdditionMixin, EditorMixin } from '@oarepo/data-editor'
import { ArrayComponent } from '@oarepo/data-renderer'

export default {
  name: 'custom-array-component',
  mixins: [EditorMixin, AdditionMixin],
  components: {
    'data-renderer-array-component': ArrayComponent
  },
  props: {
    options: Object,
    value: Array,
    paths: Array,
    schema: {
      type: String,
      default: 'inline'
    },
    layout: Object,
    pathLayouts: Object,
    rendererComponents: Object
  },
  data: function () {
    return {
      editedValue: null
    }
  },
  computed: {
    currentChoices () {
      console.log(this.layout.item.children.map(child => child.prop))
      return this.layout.item.children.map(child => child.prop)
    },
    hasChoices () {
      console.log(this.currentChoices.length)
      return this.currentChoices.length !== 0
    }
  },
  methods: {
    valueInput (value) {
      this.editedValue = value
      this.$emit('change', value)
    },
    openDialogWithChoices (choices = null, errorMessage = null) {
      console.log('choices', choices)
      this.$q.dialog({
        component: this.currentDialogComponent,
        parent: this,
        initialValue: choices,
        errorMessage: errorMessage
      }).onOk((value) => {
        try {
          this.validate(value)
          this.submitData(value)
        } catch (e) {
          this.openDialog(value, e.message)
        }
      })
    },
    submitData (value) {
      const submittedData = {
        op: 'add'
        // pathValues: [],
        // values: [value.value],
      }
      if (value.prop) {
        const complexValue = {}
        complexValue[value.prop] = value.value
        submittedData.context = this.currentValue
        submittedData.value = complexValue
      } else {
        submittedData.context = this.currentValue
        submittedData.value = value
      }
      this.editing = false
      this.$emit('stop-editing')
      this.extraProps.submit(submittedData)
    },
    addItem () {
      this.submitData(this.editedValue)
    }
  }
}
</script>

<style scoped>

</style>
