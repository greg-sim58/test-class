<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
      </v-col>

      <v-col cols="12"><v-btn primary @click="getChain()"> Chain</v-btn></v-col>
      <v-col cols="12"><v-btn primary @click="getBestChain()"> Best Chain</v-btn></v-col>
      <v-col cols="12"><v-btn primary @click="getGet()"> Best Chain Get</v-btn></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chainer from "@/store/chainer.js";
import BestChainer from "@/store/bestChainer.js";

export default {
  name: "HelloWorld",

  data: () => ({}),
  methods: {
    getChain() {
      console.log("get chain");

      var chainer = new Chainer();
      var value = chainer
        .foo(15) // foo assigns
        .bar() // bar adds
        .baz() // baz subtracts
        .result(); // output :: 44
      console.log("Chainer Result: ", value);
      var bainer = new Chainer();
      value = bainer
        .foo(34) // foo assigns
        .bar() // bar adds
        .baz() // baz subtracts
        .result(); // output :: 44
      console.log("Bainer Result: ", value);
    },
    async getBestChain() {
      console.log('Best chain!')

      var bestChain = new BestChainer(1)
      // var result = await bestChain.add(15)
      // console.log('Best chain result: ', result)
      var result2 = await bestChain.add(10).subtract(2)
      console.log('Best chain result + add: ', result2)
    },
    async getGet() {
      var getChain = new BestChainer()
      var res = await getChain.get('kittens').where('Name', 'eq', 'Joe')
      console.log('Get Result: ', res)
    }
  },
};
</script>
