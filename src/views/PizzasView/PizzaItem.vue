<template>
    <div class="item-container">
        <div class="image">
            <v-dialog width="500">
                <template v-slot:activator="{ props }">
                    <img v-bind="props" :src="data.imageUrl" alt="pizza" />
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card>
                        <v-card-actions>
                            <v-spacer
                                ><h3>{{ data.title }}</h3></v-spacer
                            >
                            <font-awesome-icon
                                :icon="['fas', 'circle-xmark']"
                                size="2x"
                                class="icon-close"
                                @click="isActive.value = false"
                            />
                        </v-card-actions>
                        <v-carousel hide-delimiters progress="succes">
                            <v-carousel-item
                                v-for="(item, i) in getGallery"
                                :key="i"
                                :src="item"
                                cover
                            ></v-carousel-item>
                        </v-carousel>
                    </v-card>
                </template>
            </v-dialog>
        </div>
        <div class="title">
            {{ data.title }}

            <v-dialog width="500">
                <template v-slot:activator="{ props }">
                    <span v-bind="props">{{ $t('actionTitles.description') }}</span>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card :title="data.title">
                        <v-card-text>
                            {{ data.description }}
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn @click="isActive.value = false">{{ $t('actionTitles.close') }}</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </div>
        <div class="text-center">
            <v-rating v-model="rating" hover half-increments color="orange-lighten-1" active-color="orange-lighten-1" />
            <pre>{{ rating }}</pre>
        </div>
        <div class="price">
            <h4>{{ $t('actionTitles.price') }}:</h4>
            <span>{{ data.price }}</span>
            <font-awesome-icon :icon="['fab', 'bitcoin']" />
        </div>
        <div class="types">
            <div class="type-name">
                <h4>{{ $t('actionTitles.type') }}:</h4>
            </div>
            <div
                v-for="(type, i) in getTypes"
                :key="i"
                :class="{ active: activeType === i, type: activeType !== i }"
                @click="changeType(i)"
            >
                {{ type }}
            </div>
        </div>
        <div class="sizes">
            <div class="size-name">
                <h4>{{ $t('actionTitles.size') }}:</h4>
            </div>
            <div
                v-for="(size, i) in data.sizes"
                :key="i"
                :class="{ active: activeSize === i, type: activeSize !== i }"
                @click="changeSize(i)"
            >
                {{ size }} cm
            </div>
        </div>
        <div class="btns-container">
            <v-btn v-if="getUser" variant="text" @click="onAddToCartClick">{{ $t('actionTitles.addToCart') }}</v-btn>
            <!-- <v-dialog width="500">
                <template v-slot:activator="{ props }">
                    <v-btn v-if="getUser" v-bind="props" variant="text" @click="onAddToCartClick">{{
                        $t('actionTitles.addToCart')
                    }}</v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                    <v-card>
                        <v-card-text>{{ $t('messages.to-cart-msg') }}</v-card-text>
                        <v-card-actions>
                            <v-btn variant="outlined" @click="isActive.value = false">{{ $t('actionTitles.continue') }}</v-btn>
                            <v-btn variant="outlined" @click="onGoToCartClick">{{ $t('actionTitles.to-cart') }}</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog> -->
            <div v-if="getCurrentUserPermissions.isAdmin" class="edit-btns">
                <div class="icon-edit">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="2x" @click="onEditAction" />
                </div>
                <div class="icon-delete">
                    <font-awesome-icon :icon="['far', 'trash-can']" size="2x" @click="onDeleteAction" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/store/users'
import { useAuthStore } from '@/store/auth'
import { usePizzasStore } from '@/store/pizzas'
import { useCartsStore } from '@/store/carts'
export default {
    name: 'PizzaItem',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            activeType: 0,
            activeSize: 0,
            rating: this.data.rating,
        }
    },

    computed: {
        ...mapState(useUsersStore, ['getCurrentUserPermissions']),
        ...mapState(useAuthStore, ['getUser']),
        ...mapState(useCartsStore, ['getCurrentCart']),
        getGallery() {
            return [this.data.imageUrl, this.data.imageUrl2, this.data.imageUrl3]
        },
        getTypes() {
            return ['thin', 'thick']
        },
    },

    methods: {
        ...mapActions(usePizzasStore, ['deleteItemFromPizzasList']),
        ...mapActions(useCartsStore, ['addItemToCartList', 'getItemByIdFromList']),
        changeType(i) {
            this.activeType = i
        },
        changeSize(i) {
            this.activeSize = i
        },
        onEditAction() {
            this.$router.push({
                name: 'pizzas-config',
                params: {
                    id: this.data.id,
                },
            })
        },
        async onDeleteAction() {
            await this.deleteItemFromPizzasList(this.data.id)
        },
        async onAddToCartClick() {
            const data = {
                id: this.data.id,
                price: this.data.price,
                type: this.getTypes[this.activeType],
                size: this.data.sizes[this.activeSize],
            }
            await this.addItemToCartList(this.getUser.uid, 'cart', data)
            await this.getItemByIdFromList(this.getUser.uid)
            this.$router.push({
                name: 'cart-info'
            })                   
        },
        onGoToCartClick() {
            this.$router.push({
                name: 'cart',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.item-container {
    -webkit-box-shadow: 6px 6px 20px -6px rgba(66, 68, 90, 1);
    -moz-box-shadow: 6px 6px 20px -6px rgba(66, 68, 90, 1);
    box-shadow: 6px 6px 20px -6px rgba(66, 68, 90, 1);
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;

    & .image {
        & > img {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            cursor: pointer;
        }
    }

    & .title {
        display: flex;
        justify-content: space-between;
        text-transform: uppercase;
        font-weight: 700;
        color: rgb(108, 70, 0);
        cursor: pointer;
        span {
            cursor: pointer;
            color: red;
            font-weight: 400;
            font-size: 11px;
            border: 1px solid red;
            border-radius: 5px;
            padding: 5px 10px;
            margin-left: 5px;
            &:hover {
                color: green;
                border: 1px solid green;
                border-radius: 5px;
            }
        }
    }

    & .price {
        display: flex;
        align-items: center;
        gap: 7px;
        font-weight: 500;
        & > span {
            color: red;
            font-weight: 700;
            font-size: 24px;
        }
    }

    & .types,
    .sizes {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;

        & .type-name,
        .size-name {
            margin-bottom: 20px;
        }

        & .type,
        .size {
            border: 1px solid rgb(108, 70, 0);
            border-radius: 5px;
            padding: 2px 5px;
            color: rgb(108, 70, 0);
            margin-bottom: 20px;
        }
        & .active {
            border: 2px solid orange;
            border-radius: 5px;
            padding: 2px 5px;
            color: orange;
            margin-bottom: 20px;
        }
    }
    & .btns-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > button:hover {
            background-color: orange;
        }

        & .edit-btns {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;

            & .icon-edit {
                color: green;
            }
            & .icon-edit:hover {
                color: rgb(146, 225, 146);
            }
            & .icon-delete {
                color: red;
            }
            & .icon-delete:hover {
                color: rgb(255, 117, 117);
            }
        }
    }
}
.icon-close {
    cursor: pointer;
}

.item-container:hover {
    scale: 1.1;
    transition: 0.3s;
}
</style>
