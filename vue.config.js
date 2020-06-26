module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/components/_variables.scss";`
            }
        }
    }
};