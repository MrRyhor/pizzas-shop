<template>
    <div class="wrapper">
        <div class="container">
            <div class="logo">
                <img :src="getLogo" alt="logo" />
            </div>
            <nav>
                <router-link to="/">{{ $t('nav.main') }}</router-link>
                <router-link to="/pizzas">{{ $t('nav.products') }}</router-link>
                <router-link v-if="getCurrentUserPermissions.isAdmin" to="/users">{{ $t('nav.users') }}</router-link>
                <router-link v-if="getCurrentUserPermissions.isAdmin" to="/orders">{{ $t('nav.orders') }}</router-link>
                <router-link to="/contacts">{{ $t('nav.contacts') }}</router-link>
            </nav>
            <div class="page-wrapper">
                <div class="header">
                    <div class="lang-container" @click="changeLocale">
                        <img :src="getLangFlag" />
                        <span>{{ currentLanguage }}</span>
                    </div>
                    <div class="user-info">
                        <div v-if="getUser" class="user-container">
                            <div class="get-user">
                                <div class="img-container">
                                    <img v-if="getUser.photoURL" :src="getUser.photoURL" />
                                    <font-awesome-icon v-else :icon="['fas', 'user-tie']" />
                                </div>
                                <span>{{ getUser.email }}</span>
                            </div>
                            <v-btn prepend-icon="mdi-logout" @click="onLogout">{{ $t('actionTitles.logout') }}</v-btn>
                        </div>
                        <v-btn v-else prepend-icon="mdi-account-circle" @click="onLogin">{{
                            $t('actionTitles.login')
                        }}</v-btn>
                    </div>
                    <div v-if="getUser && !getCartPath" class="cart" @click="onCartClick">
                        <img :src="getCartImg" alt="cart" />
                        <span v-if="getUser && cartList?.length" class="cart-counter">{{ getCartCount }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="main-content">
            <loading-page v-if="isLoading" />
            <error-page v-else-if="hasError" />
            <template v-if="!hasError">
                <slot></slot>
            </template>
        </div>

        <div class="footer"><span>&copy;</span> Copyright 2024</div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from '@/store/auth'
import { useGeneralStore } from '@/store/general'
import { useUsersStore } from '@/store/users'
import { useCartsStore } from '@/store/carts'
import LoadingPage from '@/views/LoadingPage.vue'
import ErrorPage from '@/views/ErrorPage.vue'
export default {
    name: 'MainMasterPage',

    components: {
        LoadingPage,
        ErrorPage,
    },

    data() {
        return {
            cartList: null,
        }
    },

    computed: {
        ...mapState(useAuthStore, ['getUser']),
        ...mapState(useGeneralStore, ['isLoading', 'hasError']),
        ...mapState(useUsersStore, ['getCurrentUserPermissions']),
        ...mapState(useCartsStore, ['getCurrentCart']),

        currentLanguage() {
            return this.$i18n.locale === 'ua' ? 'Українська' : 'English'
        },
        getLangFlag() {
            return this.$i18n.locale === 'ua'
                ? 'https://www.freepnglogos.com/uploads/ukraine-flag-png/circle-flag-of-ukraine-png-download-0.png'
                : 'https://banner2.cleanpng.com/20180330/zwe/kisspng-england-flag-of-the-united-kingdom-flag-of-great-b-france-5abde290a65fd8.2730033515223937446815.jpg'
        },

        getCartCount() {
            return this.cartList?.length
        },

        getLogo() {
            return require('@/assets/png/pizza-logo.png')
        },
        getCartImg() {
            return require('@/assets/png/cart.png')
        },
        getCartPath() {
            return this.$route.path === '/cart'
        },
    },

    async created() {
        this.$i18n.locale = JSON.parse(localStorage.getItem('lastLocale')) ?? process.env.VUE_APP_I18N_LOCALE

        const self = this
        window.addEventListener('storage', function () {
            if (self.$i18n.locale !== localStorage.getItem('lastLocale')) {
                self.$i18n.locale = localStorage.getItem('lastLocale')
                self.$router.go()
            }
        })

        if (this.getUser) {
            await this.getItemByIdFromList(this.getUser.uid)
            this.cartList = this.getCurrentCart?.cart            
        }
    },

   

    methods: {
        ...mapActions(useAuthStore, ['logOut']),
        ...mapActions(useCartsStore, ['getItemByIdFromList']),
        changeLocale() {
            this.$i18n.locale === 'en' ? (this.$i18n.locale = 'ua') : (this.$i18n.locale = 'en')
            localStorage.setItem('lastLocale', JSON.stringify(this.$i18n.locale))
        },
        
        onLogin() {
            this.$router.push({
                name: 'login',
            })
        },
        onCartIconAction() {
            this.$router.push({
                name: 'cart',
            })
        },
        onLogout() {
            this.logOut()
            this.$router.push({
                name: 'login',
            })
        },
        onCartClick() {
            this.$router.push({
                name: 'cart',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 100px;
        background-color: rgb(247, 160, 0);

        & .logo {
            & > img {
                width: 100px;
                height: 100px;
            }
        }

        & > nav {
            padding: 30px;
            display: flex;
            align-items: center;
            gap: 20px;

            a {
                font-weight: bold;
                font-size: 24px;
                color: rgb(54, 54, 54);

                &.router-link-exact-active {
                    color: #fff;
                }
            }
        }
        & .page-wrapper {
            width: 1400px;
            margin: 0 auto;

            & .header {
                display: flex;
                align-items: center;
                justify-content: right;
                gap: 20px;
                & .lang-container {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    & > img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                    }

                    & > span:hover {
                        color: #fff;
                        transition: 0.3s;
                    }
                }
                & .user-info {
                    & .user-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    & .get-user {
                        display: flex;
                        align-items: center;
                        flex-direction: column;

                        & .img-container {
                            & > img {
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                            }
                        }
                        & > span {
                            font-size: 14px;
                            font-weight: 600;
                        }
                    }
                }

                & .cart {
                    margin-left: 20px;
                    position: relative;
                    cursor: pointer;
                    img {
                        width: 60px;
                        height: 60px;
                    }
                    & .cart {
                        cursor: pointer;
                    }

                    & .cart-counter {
                        position: absolute;
                        top: 0;
                        left: 40px;
                        z-index: 3;
                        background-color: #fff;
                        color: orange;
                        border-radius: 50%;
                        padding: 0px 6px;
                    }
                }
            }
        }
    }

    .main-content {
        flex: 1 1 auto;
        margin: 20px 0px;
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(247, 160, 0);
        padding: 20px 0px;
        color: #fff;
        font-weight: 600;
    }
}
</style>
