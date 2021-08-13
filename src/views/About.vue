/* eslint-disable no-unused-vars */
<template>
  <div class="about">
    <h1>This is atest of the new CRUD functions</h1>
    <v-container>
      <v-col cols=12 class="grey lighten-4">
        <v-text-field label="Collection" v-model="collection"></v-text-field>
      </v-col>
      <v-col cols=12 class="green lighten-4">
        <v-btn color="primary" @click="getDocs()">Get All</v-btn>
      </v-col>
      <v-col cols=12 class="orange lighten-4">
        <v-text-field label="ID" v-model="kittenId"></v-text-field>
        <v-btn color="accent" @click="getDoc()">Get Doc</v-btn>
      </v-col>
      <v-col cols=12 class="blue-grey lighten-4">
        <v-text-field label="Name" v-model="kittenName"></v-text-field>
        <v-text-field label="Color" v-model="kittenColor"></v-text-field>
        <v-btn color="secondary" @click="postDoc()">Post Doc</v-btn>
      </v-col>
      <v-col cols=12 class="indigo lighten-4">
        <v-btn color="success" @click="putDoc()">Put Doc</v-btn>
      </v-col>
      <v-col cols=12 class="teal lighten-4">
        <v-text-field label="ID" v-model="kittenId"></v-text-field>
        <v-btn color="warning" @click="deleteDoc()">Delete Doc</v-btn>
      </v-col>
      <v-col cols=12 class="red lighten-4">
        <v-text-field label="GET WHERE:" v-model="conditionWhere"></v-text-field>
        <v-btn color="warning" @click="getDocWhere()">Get Doc Where</v-btn>
      </v-col>
    </v-container>

    
    
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import Storage from "@/store/storage.js";

export default {
  data() {
    return{
      kittenName: '',
      kittenColor: '',
      kittenId: '',
      collection: 'kittens',
      conditionWhere: ''
    }
  },
  created() {},
  methods: {
    async getDocs() {
      var docs = await Storage.get(this.collection);
      console.info('DOCS: ', docs)
    },
    async getDoc() {
      var doc = await Storage.get(this.collection, this.kittenId);
      console.info('DOC: ', doc)
      this.kittenId = ''
    },
    async getDocWhere() {
      // var doc = await Storage.get(this.collection, this.kittenId);
      console.info('WHERE DOC: ', this.conditionWhere)
      // var doc  = await Storage.getWhere(this.collection, this.conditionWhere);
      var doc  = await Storage.getWhere(this.collection, 'color === brown');
      console.log('GET WHERE: ', doc)
      this.conditionWhere = ''
    },
    postDoc() {
      console.log(this.kittenName)
      var kitten = { Name: this.kittenName, Color: this.kittenColor };
      Storage.put(this.collection, kitten);
      this.kittenColor = ''
      this.kittenName = ''
      
    },
    putDoc() {
      var kitten = { Id: "", Name: this.kittenName, Color: this.kittenColor };
      Storage.put(this.collection, kitten);
    },
    async deleteDoc() {
      var result = await Storage.remove(this.collection, this.kittenId)
      console.log('DELETE RESULT: ', result)
    }
  }
};
</script>
