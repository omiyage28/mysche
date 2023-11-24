/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from "vue";
import App from "../app.vue";
import router from "../router";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import colors from "vuetify/lib/util/colors";
import store from "./store";

// dayjs.locale("ja");
// Vue.prototype.$dayjs = dayjs;

Vue.use(Vuetify);
const vuetify = new Vuetify({
  icons: {
    iconfont: "mdiSvg",
    iconfont: "mdi",
  },
  theme: {
    themes: {
      dark: {
        primary: "#FCF5ED",
        secondary: "#F4BF96",
        point: "orange",
        red: colors.red.accent4,
        white: colors.white,
      },
      light: {
        primary: "#FCF5ED",
        secondary: "#F4BF96",
        point: "orange",
        red: colors.red.accent4,
        white: colors.white,
      },
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const app = new Vue({
    router,
    vuetify,
    store,

    render: (h) => h(App),
  }).$mount();
  document.body.appendChild(app.$el);

  console.log(app);
});

// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>

// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })
