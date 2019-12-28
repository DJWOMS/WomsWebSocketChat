import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

import Room from '@/components/rooms/Room'
import Dialog from '@/components/rooms/Dialog'
import DialogWS from '@/components/rooms/DialogWS'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'room',
        component: Room
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/dialog/:id',
        name: 'dialog',
        component: DialogWS
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
