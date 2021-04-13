// Vuex store
import Vuex from 'vuex';
import { api } from '../api';
import { consts } from '../util/consts';

const store = new Vuex.Store({
    state: {
        menuIndex: consts.deviceManageMenuIndex,
        lamps: [],
        leaveHomeLampIds: [],
        returnHomeLampIds: [],
        partyLampIds: [],
        isParty: false
    },
    mutations: {
        setMenuIndex (state, menuIndex) {
            state.menuIndex = menuIndex;
        },
        setLamps (state, lamps = []) {
            state.lamps = [...lamps];
        },
        setLeaveHomeLampIds (state, leaveHomeLampIds = []) {
            state.leaveHomeLampIds = [...leaveHomeLampIds];
        },
        setReturnHomeLampIds (state, returnHomeLampIds = []) {
            state.returnHomeLampIds = [...returnHomeLampIds];
        },
        setPartyLampIds (state, partyLampIds = []) {
            state.partyLampIds = [...partyLampIds];
        },
        setIsParty (state, isParty) {
            state.isParty = isParty;
        }
    },
    actions: {
        async initStore ({ dispatch }) {
            Promise.all([
                dispatch('initLamps'),
                dispatch('initLeaveHomeLampIds'),
                dispatch('initReturnHomeLampIds'),
                dispatch('initPartyLampIds'),
                dispatch('initIsParty')
            ]);
        },
        async initLamps ({ commit }) {
            const { data } = await api.getLamps();
            commit('setLamps', data);
        },
        async initLeaveHomeLampIds ({ commit }) {
            const { data } = await api.getLeaveHomeLampIds();
            commit('setLeaveHomeLampIds', data);
        },
        async updateLeaveHomeLampIds ({ commit }, newIds) {
            // TODO 后端请求
            console.log(`updateLeaveHomeLampIds newIds:${ newIds }`);
            commit('setLeaveHomeLampIds', newIds);
        },
        async leaveHome ({ state }) {
            const { lamps, leaveHomeLampIds } = state;
            await Promise.all(leaveHomeLampIds.map(id => api.off(id)));
            for (const lamp of lamps)
            {
                if (leaveHomeLampIds.indexOf(lamp.id) >= 0)
                {
                    lamp.isOn = false;
                }
            }
        },
        async initReturnHomeLampIds ({ commit }) {
            const { data } = await api.getReturnHomeLampIds();
            commit('setReturnHomeLampIds', data);
        },
        async updateReturnHomeLampIds ({ commit }, newIds) {
            // TODO 后端请求
            console.log(`updateReturnHomeLampIds newIds:${ newIds }`);
            commit('setReturnHomeLampIds', newIds);
        },
        async returnHome ({ state }) {
            const { lamps, returnHomeLampIds } = state;
            await Promise.all(returnHomeLampIds.map(id => api.on(id)));
            for (const lamp of lamps)
            {
                if (returnHomeLampIds.indexOf(lamp.id) >= 0)
                {
                    lamp.isOn = true;
                }
            }
        },
        async initPartyLampIds ({ commit }) {
            const { data } = await api.getPartyLampIds();
            commit('setPartyLampIds', data);
        },
        async updatePartyLampIds ({ commit }, newIds) {
            // TODO 后端请求
            console.log(`updatePartyLampIds newIds:${ newIds }`);
            commit('setPartyLampIds', newIds);
        },
        async initIsParty ({ commit }) {
            const { data } = await api.getIsParty();
            commit('setIsParty', data);
        }
    }
});

export default store;
