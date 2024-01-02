import firebase from "firebase/compat/app";
export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name, currency = 'UAH'}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password);
                const uid = await dispatch('getUid');
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name,
                    currency,
                    email: email
                })
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async forgotPassword({dispatch, commit}, formData) {
            await firebase.auth().sendPasswordResetEmail(formData.email)
        },

        getUid() {
          const user = firebase.auth().currentUser;
          return user  ? user.uid : null;
        },
        async logout({commit}) {
            try {
                await firebase.auth().signOut()
                commit('clearInfo')
            } catch (e) {

            }
        }
    }
}