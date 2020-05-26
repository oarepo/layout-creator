<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header.glossy(elevated='')
      q-toolbar
        q-btn(flat='', dense='', round='', @click='leftDrawerOpen = !leftDrawerOpen', aria-label='Menu', icon='menu')
        q-toolbar-title
          | @oarepo/data-editor-jsonschema
        div.q-pa-md
          div.q-gutter-sm.fixed-top-right
            q-radio(v-model="displaySchema" val="inline" label="inline")
            q-radio(v-model="displaySchema" val="block"  label="block")
            q-radio(v-model="displaySchema" val="table"  label="table")
            q-radio(v-model="displaySchema" val="flex"  label="flex")
    q-drawer(v-model='leftDrawerOpen', show-if-above='', bordered='', content-class='bg-grey-2')
      q-list
        q-expansion-item(header='' label="Basic Layouts")
          q-card
            q-card-section
              q-list
                q-item(clickable='' :to="{name: 'simple-schema-demo'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Simple schema
                q-item(clickable='' :to="{name: 'array-schema-demo'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Array schema
                q-item(clickable='' :to="{name: 'object-schema-demo'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Object schema
                q-item(clickable='' :to="{name: 'type-layouts-demo'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Custom type layout
                q-item(clickable='' :to="{name: 'complex-schema-demo'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Complex schema
    q-page-container
      q-page.q-ma-lg
        router-view(:displaySchema="displaySchema")
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {},
  data () {
    return {
      leftDrawerOpen: false,
      displaySchema: 'table'
    }
  }
}
</script>

<style lang="stylus">
</style>
