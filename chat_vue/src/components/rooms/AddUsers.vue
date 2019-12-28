<template>
    <div>
        <select v-model="option">
            <option v-for="user in list"
                    :value="user.id">
                {{user.attributes.username}}
            </option>
        </select>
        <mu-button class="btn-send" round color="success" @click="addUser">Добавить пользователя
        </mu-button>
    </div>
</template>

<script>
    export default {
        name: "AddUsers",
        props: {
            room: '',
        },
        data() {
            return {
                option: '',
                list: '',
            }
        },
        created() {
            this.loadUsers()
        },
        methods: {
            // Получаю список пользователей
            loadUsers() {
                fetch("http://127.0.0.1:8000/api/v1/chat/users/", {
                    headers: {
                        'Authorization': "Token " + sessionStorage.getItem('auth_token'),
                    },
                })
                    .then(response => response.json())
                    .then(response => {
                        this.list = response.data
                    })
            },
            // Добавляю пользователя в комнату
            addUser() {
                let data = {
                        room: this.room,
                        user: parseInt(this.option)
                };
                fetch("http://127.0.0.1:8000/api/v1/chat/users/", {
                    method: "POST",
                    headers: {
                        'Authorization': "Token " + sessionStorage.getItem('auth_token'),
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => alert("Пользователь добавлен"))
                    .catch(error => {
                        alert("Error add user")
                    })
            }
        }
    }
</script>

<style scoped>

</style>
