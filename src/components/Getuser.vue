<template>
    <v-container>
        <h1>User information is being acquired...</h1>
    </v-container>
</template>

<script>
export default {
    name: 'Getuser',

    methods:{
        async load() {
            const query = this.$route.query;

            const response = await this.axios.get(`${process.env.VUE_APP_API_BASE}/checkuser`, { headers: { key: query.key } });

            if (response.data.Status != undefined) {
                //Failed
                this.$router.push({ name: "home"})
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Login failed. Please try again."
                })
            } else {
                //Success
                this.$session.start();
                this.$session.set("userinfo", response.data)
                this.$router.push({ name: "home"})
                this.$swal({
                    icon: 'success',
                    title: 'NICE!',
                    text: "Welcome to " + this.$session.get("userinfo").username
                })
            }
        }
    },

    beforeRouteEnter(_to, _from, next) {
        next(vm => {
            vm.load();
        next();
        });
    },
}
</script>
