import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleSchemaDemo from '../components/SimpleSchemaDemo'
import ComplexSchemaDemo from '../components/ComplexSchemaDemo'
import ArraySchemaDemo from '../components/ArraySchemaDemo'
import ObjectSchemaDemo from '../components/ObjectSchemaDemo'
import TypeLayoutsDemo from '../components/TypeLayoutsDemo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: SimpleSchemaDemo
  },
  {
    path: '/simple-schema-demo',
    name: 'simple-schema-demo',
    component: SimpleSchemaDemo
  },
  {
    path: '/complex-schema-demo',
    name: 'complex-schema-demo',
    component: ComplexSchemaDemo
  },
  {
    path: '/array-schema-demo',
    name: 'array-schema-demo',
    component: ArraySchemaDemo
  },
  {
    path: '/type-layouts-demo',
    name: 'type-layouts-demo',
    component: TypeLayoutsDemo
  },
  {
    path: '/object-schema-demo',
    name: 'object-schema-demo',
    component: ObjectSchemaDemo
  }
]

const router = new VueRouter({
  routes
})

export default router
