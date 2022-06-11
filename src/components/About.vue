<template>
    <v-container>
        <v-row justify="center">
            <v-img
                src="@/assets/vs.png"
                max-height="300"
                max-width="300"
                contain>
            </v-img>
        </v-row>
        <h1>1. Hello!</h1>
        <p>{{ $t("helloeveryone") }}</p>
        <br>
        <h1>2. {{ $t("title2") }}</h1>
        <p>{{ $t("title2-text") }}</p>
        <br>
        <h1>3. {{ $t("title3") }}</h1>
        <a href="https://lunacnet.notion.site/lunacnet/Valorant-Store-Chcecker-ce4ed87caebb4fbc94e1af3debb5b7b8">Click me</a>
        <br>
        <h1>4. {{ $t("title4") }}</h1>
        <a href="https://discord.gg/4zrQDW9PNq"><img src="https://discordapp.com/api/guilds/781946764168658984/widget.png?style=banner2" alt="Discord Banner 2"/></a>
    </v-container>
</template>

<script>
export default {
    name: 'About',
};
</script>
