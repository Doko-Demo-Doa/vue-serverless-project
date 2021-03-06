import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

Vue.use(AmplifyPlugin, AmplifyModules)

import Vue from 'vue'
// import App from './App.vue'
import AppCoffeeShop from './App-CoffeeShop.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(AppCoffeeShop)
}).$mount('#app')
