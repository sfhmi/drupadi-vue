<template>
    <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" :key="index" v-for="(menu, index) in breadcrumb_menu"><a href="">{{ menu.name }}</a></li>
            </ol>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props: ["breadcrumb_menu"]
}
</script>



<style lang="scss" slot-scope>
    @import "../assets/scss/Colors";
    .breadcrumb {
        background-color: lighten($color: $primary, $amount: 35) !important;
        border: 0px;
        >.active {
            color: $primary !important;
        }
        .breadcrumb-item {
            display: flex;
            font-size: 14px;
            font-weight: 400;
            color: green;
            display: flex;
            flex-direction: row;
            align-items: center;
            &:first-child {
                &::before {
                    content: "";
                    display: none;
                }
            }
            &:before {
                // content: url("../../assets/images/icons/chevron-right.svg");
                line-height: 0em;
            }

            a {
                font-size: 14px;
                font-weight: 600;
                color: $primary;
            }
        }
    }
</style>