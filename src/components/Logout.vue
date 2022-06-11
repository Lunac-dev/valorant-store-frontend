<template>
    <v-container>
        <h1>Logout</h1>
    </v-container>
</template>

<script>
export default {
    name: 'Logout',

    methods:{
        load() {
            if (this.$session.has('userinfo')) {
                this.$session.destroy()
                this.$router.push({ name: "home"})
                this.$swal({
                    icon: 'success',
                    title: this.$t("nolink"),
                })
            } else {
                this.$router.push({ name: "home"})
                // this.$swal({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: "You are not logged in."
                // })
            }
        }
    },

    beforeRouteEnter(_to, _from, next) {
        next(vm => {
            vm.load();
        next();
        });
    },
};
</script>
