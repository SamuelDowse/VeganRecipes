<template>
  <v-card style="cursor:pointer" :to="`/${url}/${item.name}`" v-if="item.name">
    <v-img
      :src="`https://firebasestorage.googleapis.com/v0/b/veganrecipes-11631.appspot.com/o/${image}%2F${item.name}.jpg?alt=media`"
      height="300px"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      cover
    ></v-img>
    <v-card-title>
      {{ item.name }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: ['item', 'url', 'image'],
  data: () => ({
    
  })
}
</script>
