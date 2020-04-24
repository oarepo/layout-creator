import Vue from 'vue'
import VueRouter from 'vue-router'
import SimpleSchemaDemo from '../components/SimpleSchemaDemo'
import ComplexSchemaDemo from '../components/ComplexSchemaDemo'
import ArraySchemaDemo from '../components/ArraySchemaDemo'
import ObjectSchemaDemo from '../components/ObjectSchemaDemo'
import TestLayout from '../components/TestLayout'

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
    path: '/object-schema-demo',
    name: 'object-schema-demo',
    component: ObjectSchemaDemo
  },
  {
    path: '/test-layout',
    name: 'test-layout',
    component: TestLayout
  }
]

const router = new VueRouter({
  routes
})

export default router
