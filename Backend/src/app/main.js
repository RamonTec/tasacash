import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

import app from './App.vue';

const routes = [

];

const router = new VueRouter({mode: 'history'}, {routes: routes});
//new Vue(Vue.util.extend({router}, app)).$mount('#app');

new Vue({
    
    el: '#app',
    render: h => h(app)
}).$mount('#app');

