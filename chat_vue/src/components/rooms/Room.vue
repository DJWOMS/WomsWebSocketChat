<template>
    <HomeSlot>
        <mu-row>
            <mu-col span="4" xl="2" class="rooms-list">
                <mu-button @click="addRoom">Создать комнату</mu-button>
                <div v-for="room in rooms" :key="room.id">
                    <h3 @click="openDialog(room.id)">{{room.creator.username}}</h3>
                    <small>{{room.date}}</small>
                </div>
            </mu-col>
            <slot></slot>
        </mu-row>
    </HomeSlot>
</template>

<script>
    import HomeSlot from '../Home'

    export default {
        name: "Room",
        components: {
            HomeSlot,
        },
        data() {
            return {
                rooms: '',
            }
        },
        created() {
            // $.ajaxSetup({
            //     headers: {'Authorization': "Token " + sessionStorage.getItem('auth_token')},
            // });
            this.loadRoom()
        },
        methods: {
            // Загружаю список комнат
            loadRoom() {
                fetch("http://127.0.0.1:8000/api/v1/chat/room/", {
                    method: 'GET',
                    headers: {
                        'Authorization': "Token " + sessionStorage.getItem('auth_token'),
                    },
                })
                    .then(response => response.json())
                    .then(response => {
                        this.rooms = response.data.data
                    })
            },
            openDialog(id) {
                this.$router.push({name: 'dialog', params: {id: id}})
            },
            // Создание комнаты
            addRoom() {
                fetch("http://127.0.0.1:8000/api/v1/chat/room/", {
                    method: 'POST',
                    headers: {
                        'Authorization': "Token " + sessionStorage.getItem('auth_token'),
                    },
                })
                .then(response => response.json())
                .then(response => {
                    this.loadRoom()
                })
            }
        }
    }
</script>

<style scoped>
    h3 {
        cursor: pointer;
    }

    .rooms-list {
        margin: 0 10px 0 0;
        box-shadow: 1px 4px 5px #848181;
    }
</style>
