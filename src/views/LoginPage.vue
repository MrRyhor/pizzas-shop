<template>
    <main-master-page>
        <div class="email-container">
            <h2>{{ $t('messages.enterMessage') }}</h2>
            <label>
                <v-responsive class="mx-auto" max-width="344">
                    <v-text-field
                        v-model="email"
                        hide-details="auto"
                        :label="$t('actionTitles.email')"
                        placeholder="johndoe@gmail.com"
                        type="email"
                        class="email-inp"
                    />
                </v-responsive>
            </label>
            <label>
                <v-responsive class="mx-auto" max-width="344">
                    <v-text-field
                        v-model="password"
                        :label="$t('actionTitles.password')"
                        type="password"
                        :hint="$t('messages.enter')"
                        class="password-inp"
                    />
                </v-responsive>
            </label>
            <div class="btns-container">
                <v-btn
                    variant="outlined"
                    :disabled="!isDataValid"
                    @click="registerWithEmailAndPassword(email, password)"
                    >{{ $t('actionTitles.register') }}</v-btn
                >
                <v-btn
                    variant="outlined"
                    :disabled="!isDataValid"
                    @click="loginWithEmailAndPassword(email, password)"
                    >{{ $t('actionTitles.sign-in') }}</v-btn
                >
            </div>
        </div>
        <div class="google-container">
            {{ $t('messages.google') }}
            <v-btn variant="outlined" @click="loginWithGoogle">
                <font-awesome-icon :icon="['fab', 'google']" />
            </v-btn>
        </div>        
    </main-master-page>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import MainMasterPage from '@/masterpages/MainMasterPage.vue'
import { useAuthStore } from '@/store/auth'
import { useUsersStore } from '@/store/users'
export default {
    name: 'LoginPage',

    components: {
        MainMasterPage,
    },

    data() {
        return {
            email: null,
            password: null,
            errorMessage: null,
        }
    },

    computed: {
        ...mapState(useUsersStore, ['getUserByEmail', 'usersList']),
        isDataValid() {
            return this.email && this.password
        },
    },

    created() {
        this.loadUsersList()
    },

    methods: {
        ...mapActions(useAuthStore, [
            'signUpWithWithEmailAndPassword',
            'signInWithWithEmailAndPassword',
            'loginWithGoogleAccount',
        ]),
        ...mapActions(useUsersStore, ['loadUsersList']),

        registerWithEmailAndPassword(email, password) {
            const userEmail = this.getUserByEmail(email)
            if (!userEmail) {
                this.signUpWithWithEmailAndPassword(email, password).then(() => {
                    this.$router.push({
                        name: 'pizzas',
                    })
                })
            }else {
                this.errorMessage = this.$t('messages.email-in')
                alert(this.errorMessage)
                this.email = null
                this.password = null
        }
        },

        loginWithEmailAndPassword(email, password) {
            const userEmail = this.getUserByEmail(email)
            if (userEmail) {
                this.signInWithWithEmailAndPassword(email, password).then(() => {
                    this.$router.push({
                        name: 'pizzas',
                    })
                })
            } else {
                this.errorMessage = this.$t('messages.wrong-message')
                alert(this.errorMessage)
                this.email = null
                this.password = null
            }
        },
        loginWithGoogle() {
            this.loginWithGoogleAccount().then(() => {
                this.$router.push({
                    name: 'pizzas',
                })
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.email-container {
    width: 500px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 10px;

    button {
        width: 200px;
        margin: 0 auto;
    }

    & .register {
        span {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
        }
    }

    & .btns-container {
        display: flex;
        align-items: center;
    }
}
.google-container {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    button {
        width: 100px;
        margin: 0 auto;
    }
}
</style>
