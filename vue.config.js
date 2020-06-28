module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/bootstrap/_custom-variables.scss";`
            }
        }
    }
};