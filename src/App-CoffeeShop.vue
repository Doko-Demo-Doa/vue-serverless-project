<template>
  <div id="app">
    <div ng-if="!signedIn">
      <amplify-authenticator></amplify-authenticator>
    </div>
    <div ng-if="signedIn">
      <amplify-sign-out></amplify-sign-out>
      <div>
        <div class="form">
          <input class="input" v-model="name" placeholder="Coffee Shop Name">
          <input class="input" v-model="description" placeholder="Coffee Shop Description">
          <button class="button" v-on:click="createCoffeeShop">Create Coffee Shop</button>
        </div>

        <div v-for="item in coffeeShops" :key="item.key" class="list-item">
          <p class="name">{{ item.name }}</p>
          <p class="description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth, API, graphqlOperation } from 'aws-amplify'

const ListCoffeeShops = `
  query {
    listCoffeeShops {
      items {
        id name description
      }
    }
  }
`

const CreateCoffeeShop = `
  mutation($name: String! $description: String) {
    createCoffeeShop(input: {
      name: $name description: $description
    }) {
      id name description
    }
  }
`

export default {
  name: 'app',
  data () {
    return {
      name: '',
      description: '',
      coffeeShops: [],
      signedIn: false
    }
  },
  async beforeCreate () {
    const { data: { listCoffeeShops: { items }} } = await API.graphql(graphqlOperation(ListCoffeeShops))
    this.coffeeShops = items

    try {
      const user = await Auth.currentAuthenticatedUser()
      this.signedIn = true
    } catch (e) {
      this.signedIn = false
    }
  }
}
</script>

