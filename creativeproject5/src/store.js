import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    palettes: [],
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    palettes: state => state.palettes,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setFeed (state, palettes) {
      state.palettes = palettes;
    },
  },
  actions: {
    // Registration, Login //
    register(context,user) {
      axios.post("/api/users", user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setLogin',true);
        context.commit('setRegisterError',"");
        context.commit('setLoginError',"");
      }).catch(error => {
        context.commit('setLoginError',"");
        context.commit('setLogin',false);
        if (error.response) {
          if (error.response.status === 403)
            context.commit('setRegisterError',"That email address already has an account.");
          return;
        }
          context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    }, // END Registration, Login //

    // Login //
    login(context,user) {
      axios.post("/api/login", user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setLogin', true);
        context.commit('setRegisterError', "");
        context.commit('setLoginError', "");
      }).catch(error => {
        context.commit('setRegisterError', "");
        if (error.response) {
          if (error.response.status === 403 || error.response.status === 400)
            context.commit('setLoginError', "Invalid login.");
          context.commit('setRegisterError', "");
          return;
        }
        context.commit('setLoginError', "Sorry, your request failed. We will look into it.");
      });
    }, // END Login //

    // Logout
    logout(context, user){
      context.commit('setUser', {});
      context.commit('setLogin', false);
    }, // END Logout

    getFeed(context) {
      axios.get("/api/users/" + context.state.user.id + "/palettes").then(response => {
        context.commit('setPalettes',response.data.palettes);
      }).catch(err => {
        console.log("getFeed failed:",err);
      });
    },
    addPalette(context, palette) {
      axios.post("/api/users/" + context.state.user.id + "/palettes", palette)
        .then(response => {
          return context.dispatch('getFeed');
      }).catch(err => {
        console.log("addPalette failed:",err);
      });
    },
  }
});
