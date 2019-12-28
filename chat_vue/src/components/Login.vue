<template>
    <div>
        <input v-model="login" type="text" placeholder="Логин"/>
        <input v-model="password" type="password" placeholder="Пароль"/>
        <button @click="setLogin">Войти</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                login: '',
                password: '',
            }
        },
        methods: {
            setLogin() {
                let data = {
                    username: this.login,
                    password: this.password
                };
                fetch("http://127.0.0.1:8000/auth/token/login/", {
                    method: 'POST',
                    // mode: 'cors',
                    // credentials: 'include',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        // 'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        // 'Authorization': "Token " + localStorage.getItem('auth_token'),
                        //'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => {
                    if (response.status === 200) {
                        alert("Спасибо что Вы с нами");
                        return response.json()
                    } else if (response.status === 400) {
                        alert("Логин или пароль не верен")
                    } else alert(response.text())
                })
                .then(response => {
                    console.log(response.data.attributes.auth_token)
                    sessionStorage.setItem("auth_token", response.data.attributes.auth_token);
                    this.$router.push({name: "room"})
                })
            },
        },
    }
</script>

<style scoped>

</style>
