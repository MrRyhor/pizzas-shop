<template>
    <main-master-page>
        <div class="contacts-container">
            <h1>{{$t('messages.contact-msg')}}</h1>
            <div class="info">
                <h3>{{$t('messages.contact-info')}}</h3>                
            </div>
            <div class="phone">
                    <font-awesome-icon :icon="['fas', 'phone-volume']" size="2x" />
                    <h1>+48-111-222-333</h1>
                </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterpages/MainMasterPage.vue'

    export default {
        name: 'ContactsPage',

        components: {
            MainMasterPage
        }
    }
</script>

<style lang="scss" scoped>
.contacts-container{
    margin-top: 100px;
    & .info{
        padding: 20px 0px;
    }

    & .phone{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;

        h1 {
            color: rgb(210, 136, 0);
        }
    }
}
</style>