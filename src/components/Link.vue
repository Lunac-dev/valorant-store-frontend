<template>
    <v-container>
        <h1 class="vtt">// Link Riot Account</h1>
        <v-alert
            outlined
            type="warning"
        >
        {{ $t("linkwarning")}}
        </v-alert>
        <v-form ref="form">
            <v-text-field
                label="Riot Account Name"
                v-model="riotusername"
                :rules="[required]"
                filled
                clearable
            >
            </v-text-field>
            <v-text-field
                label="Riot Account Password"
                v-model="riotuserpassword"
                :rules="[required]"
                filled
                clearable
                :append-icon="toggle.icon"
                :type="toggle.type"
                @click:append="show = !show"
            >
            </v-text-field>
            <v-select
                item-text="label"
                item-value="value"
                :items="regions"
                filled
                label="Select Riot Account Region"
                v-model="riotregion"
                :rules="[required]"
            ></v-select>
            <v-btn
                elevation="2"
                color="error"
                @click="clicked"
                large
            >Submit</v-btn>
        </v-form>
        <h1 class="vtt">// Unlink Riot Account</h1>
        <v-alert
            outlined
            type="warning"
        >
        {{ $t("unlinkwarning")}}
        </v-alert>
        <v-btn
            elevation="2"
            color="error"
            @click="unlink"
            large
        >Submit</v-btn>
    </v-container>
</template>

<script>
export default {
    name: 'Link',

    data: () => ({
        regions: [
            {label: "Asia_Pacific" ,value: "ap"},
            {label: "Europa" ,value: "eu"},
            {label: "North_America / Latin_America / Brazil" ,value: "na"},
            {label: "Korea", value: "kr"}
        ],
        show: false,
        riotusername: null,
        riotuserpassword: null,
        riotregion: null,

        required: value => !!value || "Please be sure to fill out the form or select.",
    }),

    methods:{
        async unlink() {
            this.$swal.showLoading();
            if (this.$session.get('userinfo').puuid == "none") {
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: this.$t("nolink"),
                })
            } else {
                //const unlink = await this.axios.get("http://localhost:5000/unlink/" + this.$session.get('userinfo').id)
                const unlink = await this.axios.get(`${process.env.VUE_APP_API_BASE}/unlink` , { headers: { discordid: this.$session.get('userinfo').id } })

                if (unlink.data.Status == "OK") {
                    //Success
                    this.$swal({
                        icon: 'success',
                        title: 'Bye!',
                        text: "Unlink is complete! You will be automatically logged out."
                    })
                    this.$router.push({ name: "logout"})
                } else {
                    //Failed
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: unlink.data.Status
                    })
                }
            }
        },
        load() {
            if (!this.$session.has('userinfo')) {
                this.$router.push({ name: "home"})
                this.$swal({
                icon: 'error',
                title: 'Oops...',
                text: "You must be logged in.",
                })
                return
            }
        },
        async clicked() {
            this.$swal.showLoading();
            if (this.$refs.form.validate()) {
                var reg = new RegExp(/^[0-9a-zA-Z_]+$/);
                if (!reg.test(this.riotusername)) {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: "User name contains an unusable string or spaces."
                    })
                    return;
                }
                //Success
                const register = await this.axios.get(`${process.env.VUE_APP_API_BASE}/register/` + this.$session.get('userinfo').id + "/" 
                + this.riotusername + "/" + this.riotregion, { headers: { password: this.riotuserpassword } })

                if (register.data.Status == "OK") {
                    //Success
                    this.$swal({
                        icon: 'success',
                        title: 'NICE!',
                        text: "Link is complete! You will be automatically logged out."
                    })
                    this.$router.push({ name: "logout"})
                } else if (register.data.Status == "FAILED") {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Already linked."
                    })
                } else if (register.data.Status == "auth_failure") {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Wrong password or username."
                    })
                } else if (register.data.Status == "2fa") {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Two-factor authentication is not supported at this stage. Please disable 2-factor authentication only when linking, and then re-enable it."
                    })
                } else {
                    this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: register.data.Status
                    })
                }
            } else {
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Please fill out the form and make your selection."
                })
            }
        }
    },

    computed: {
        toggle () {
            const icon = this.show ? 'mdi-eye' : 'mdi-eye-off'
            const type = this.show ? 'text' : 'password'
            return { icon, type }
        },
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.load();
        next();
        });
    },
};
</script>

<style scoped lang="css">
@import url('https://fonts.cdnfonts.com/css/valorant');

.vtt {
    font-family: 'VALORANT', sans-serif;
    color: #fa4454;
}

</style>
