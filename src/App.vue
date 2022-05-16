<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-col lg="1">
        <v-btn to="/" style="background-color: black;">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-col>
      <v-col lg="10">
        <v-text-field
          style="margin-top:25px;"
          prepend-inner-icon="mdi-magnify"
          @change="searchRecipes()"
          v-model="search"
          solo
          label="Search"
          clearable
        ></v-text-field>
      </v-col>
      <v-col lg="1">
        <shopping-cart></shopping-cart>
      </v-col>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer padless>
      <v-col md="2">
        <accounts></accounts>
      </v-col>
      <v-col class="text-center" md="8" style="font-size: 12px;">
        <strong>Created by Samuel Dowse</strong><br />
        For Holly and Bryony, my inspirations<br />
        Build Version 1.0.2
      </v-col>
      <v-col md="2" style="text-align:right;">
        <form
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
        >
          <input type="hidden" name="hosted_button_id" value="NTPB5FKULLQ7W" />
          <input
            type="image"
            src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif"
            border="0"
            name="submit"
            title="PayPal - The safer, easier way to pay online!"
            alt="Donate with PayPal button"
          />
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_GB/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import ShoppingCart from "@/components/ShoppingCart.vue";
import Accounts from "./components/Accounts.vue";
export default {
  name: "App",

  components: { ShoppingCart, Accounts },

  data: () => ({
    search: "",
  }),
  methods: {
    searchRecipes() {
      this.$store.commit("setSearch", this.search);
      if (this.$router.currentRoute.name != "SearchID") {
        this.$router.push({ name: "SearchID" });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
h1 {
  font-size: 50px;
}

h3 {
  font-size: 15px;
  font-style: italic;
}

.v-main__wrap {
  background-color: #f0f0f0;
}

.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>
