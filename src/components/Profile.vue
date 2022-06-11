<template>
    <v-container>
        <h1>(-_-) zzz There is nothing here...</h1>
    </v-container>
</template>

<script>
export default {
    name: 'Profile',

    // data: () => ({
    //     riotusername: null,
    //     riottag: null,
    //     usericon: null,
    //     matches: null,
    //     level: null,
    // }),

    // methods:{
    //     async load() {
    //         if (!this.$session.has('userinfo')) {
    //             this.$router.push({ name: "home"})
    //             this.$swal({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: "You must be logged in.",
    //             })
    //             return;
    //         } else if (this.$session.get('userinfo').puuid == "none") {
    //             this.$router.push({ name: "home"})
    //             this.$swal({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: this.$t("nolink"),
    //             })
    //             return;
    //         }
    //         this.$swal({
    //             title: "Processing",
    //             icon: "info",
    //             text: "Please leave the screen as it is until the end of the process.",
    //             allowOutsideClick : false,
    //             showConfirmButton: false,
    //         });
    //         this.$swal.showLoading();
    //         const response = await this.axios.get("https://api.henrikdev.xyz/valorant/v3/by-puuid/mmr-history/" + this.$session.get('userinfo').region + "/" + this.$session.get('userinfo').puuid)

    //         if (response.data.status != "200") {
    //             this.$swal({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 text: response.data.message
    //             })
    //         } else {
    //             //riot account setup
    //             this.riotusername = response.data.name;
    //             this.riottag = response.data.tag;
    //             this.setAccount();
    //             this.matches = response.data.data;
    //         }
    //     },

    //     async setAccount() {
    //         const account =  await this.axios.get("https://api.henrikdev.xyz/valorant/v1/account/" + this.riotusername + "/" + this.riottag + "?force=true");
    //         if (account.data.status != "200") {
    //             this.$swal({
    //                 icon: 'error',
    //                 title: 'Oops...',
    //                 text: account.data.message
    //             })
    //         } else {
    //             this.usericon = account.data.data.card.small;
    //             this.level = account.data.data.account_level;
    //             this.$swal.hideLoading();
    //             this.$swal.close();
    //         }
    //     },
    // },

    // beforeRouteEnter(_to, _from, next) {
    //     next(vm => {
    //         vm.load();
    //     next();
    //     });
    // },
};
</script>

<style scoped lang="css">
@import url('https://fonts.cdnfonts.com/css/valorant');

.vtt {
    font-family: 'VALORANT', sans-serif;
}

.vtt2 {
    font-family: 'VALORANT', sans-serif;
    color: #fa4454;
}

</style>