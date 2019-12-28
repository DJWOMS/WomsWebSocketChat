<template>
    <RoomSlot>
        <mu-col span="8" xl="9">
            <h3>{{status}}</h3>
            <AddUsers :room="id"></AddUsers>
            <mu-container class="dialog">
                <mu-row v-for="dialog in dialogs"
                        direction="column"
                        justify-content="start"
                        align-items="end"
                        :key="dialog.id">
<!--                    <p><strong>{{dialog.user.username}}</strong></p>-->
<!--                    <p>{{dialog.text}}</p>-->
<!--                    <span>{{dialog.date}}</span>-->
                    <p>{{dialog.username}} - {{dialog.message}}</p>
                </mu-row>
            </mu-container>
            <mu-container>
                <mu-row>
                    <mu-text-field v-model="form.textarea"
                                   multi-line
                                   :rows="4"
                                   full-width
                                   placeholder="Введите текст сообщения">
                    </mu-text-field>

                    <mu-button class="btn-send" round color="success" @click="sendMes">Отправить
                    </mu-button>
                    <mu-button class="btn-send" round color="success" @click="disconnect">Выйти
                    </mu-button>

                    <input v-model="userName" value="">
                    <mu-button class="btn-send" round color="success" @click="setName">Дать имя
                    </mu-button>
                </mu-row>
            </mu-container>
        </mu-col>
    </RoomSlot>
</template>

<script>
    import RoomSlot from './Room'
    import AddUsers from './AddUsers'

    export default {
        name: "Dialog",
        props: {
            id: '',
        },
        components: {
            AddUsers,
            RoomSlot,
        },
        data() {
            return {
                status: 'disconnect',
                dialogs: [],
                form: {
                    textarea: '',
                },
                chatSocket: '',
                logs: [],
                userName: '',
            }
        },
        mounted() {
            // this.loadDialog()
        },
        created() {
            // this.chatSocket = new WebSocket(
            //     'ws://' + '127.0.0.1:8000' +
            //     '/ws/chat/' + this.$route.params.id + '/');
            // this.chatSocket = new Socket('ws:' + '127.0.0.1:8000' +
            //     '/ws/chat/' + this.$route.params.id + '/');
            this.connect()
        },
        methods: {
            connect() {
                this.chatSocket = new WebSocket(
                    'ws:' + '127.0.0.1:8000/ws/chat/' + this.$route.params.id + '/');
                this.chatSocket.onopen = () => {
                    this.status = "connected";
                    this.dialogs.push({event: "Connected to", message: 'WomsChat'})
                    this.chatSocket.onmessage = ({data}) => {
                        this.dialogs.push(JSON.parse(data));
                        console.log(data);
                        console.log(this.dialogs)
                    };
                };
            },
            // Загрузка диалога
            // loadDialog() {
            //     console.log(this.chatSocket.onmessage);
            //     console.log(this.chatSocket)
            // },
            disconnect() {
                this.chatSocket.close();
                this.status = "disconnected";
                this.dialogs = [];
            },
            // Отправка сообщения
            sendMes(e) {
                this.chatSocket.send(JSON.stringify({
                    'message': this.form.textarea, 'username': sessionStorage.getItem("username")
                }));
                // this.dialogs.push({event: "Sent message", message: this.form.textarea});
                this.form.textarea = "";
            },
            setName(){
                sessionStorage.setItem("username", this.userName);
            }
        }
    }
</script>

<style scoped>
    .dialog {
        border: 1px solid #000;
    }

    .btn-send {
        margin: 60px 0 0 15px;
    }
</style>

