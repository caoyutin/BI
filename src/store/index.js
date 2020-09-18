import Vue from 'vue'
import Vuex from 'vuex'
import { hrinfo, cityMap } from '@/api/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    EmployeesInfo: {},
    mapData: [],
    mapReserve: [],

  },
  mutations: {
    setEmp(state, data) {
      state.EmployeesInfo = data
    },
    setMap(state, data) {
      state.mapData = data
    },
    setmapReserve(state, data) {
      state.mapReserve = data
    }
  },
  actions: {
    commitEmp(context) {
      return new Promise((resolve, reject) => {
        hrinfo().then(res => {
          context.commit("setEmp", res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
      //
    },
    commitMap(context) {
      let colors = ["#DCFF00", "#FFAE00", "#18E945"];
      return new Promise((resolve, reject) => {
        cityMap().then(res => {
          context.commit("setMap", res.data)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  modules: {
  }
})
