<template>
    <div>
        <Breadcrumb :breadcrumb_menu="breadcrumb_menu" />
        <div class="page-flight">
            <div class="container-fluid">
                <div class="row mb-3">
                    <div class="col-lg-6">
                        <div class="departure-and-arrival d-flex flex-row align-items-center">
                            <h1>{{ departureAirport.city }} ({{ departureAirport.airport }})</h1>
                            <img src="@/assets/images/icons/refresh-primary.svg" v-if="flightType == 'round_trip'" alt="" class="mx-3">
                            <font-awesome-icon :icon="['fas','arrow-right']" v-else-if="flightType == 'one_way'" class="mx-3"/>
                            <font-awesome-icon :icon="['fas','arrow-right']" v-else-if="flightType == 'multi_city'" class="mx-3"/>
                            <h1>{{ arrivalAirport.city }} ({{ arrivalAirport.airport }})</h1>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-8 d-flex flex-row align-items-center">
                        <img src="@/assets/images/icons/calendar.svg" alt="" class="mr-1">
                        <p class="mb-0 mr-4">{{ moment(departureDate).format('ddd, D MMM YYYY') }} {{ flightType == 'round_trip' ? ' - ' : null }}
                            {{flightType == 'round_trip' ? moment(returnDate).format('ddd, D MMM YYYY') : null }}
                        </p>
                        <img src="@/assets/images/icons/user.svg" alt="" class="mr-1">
                        <div class="total">
                            <div class="d-flex flex-row">
                                <p v-if='adultCount > 0' class="mr-1 my-0">Total:</p>
                                <p v-if='adultCount > 0' class="mr-1 my-0">{{ adultCount }} adult(s)</p>
                                <p v-if='childCount > 0' class="mr-1 my-0">, {{ childCount }} child(s)</p>
                                <p v-if='infantCount > 0' class="my-0">, {{ infantCount }} infant(s)</p>
                            </div>
                            <!-- <p class="mb-0">Total: {{ adultCount > 0 ? adultCount }} , {{ childCount }} child(s), {{ infantCount }} infant(s)</p> -->
                        </div>
                    </div>
                    <div class="col-lg-4 text-right">
                        <router-link :to="{ name: 'Search', params: {passengers: travelers} }" class="btn btn-primary">Change Search</router-link>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment';
// import Breadcrumb from '../components/Breadcrumb.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
export default {
    name: "Flight",
    props: [
        "departureDate", 
        "returnDate",
        "departureAirport",
        "arrivalAirport",
        "flightType",
        "travelers"
    ],
    components: {
        Breadcrumb,
    },
    data() {
        return {
            moment: moment,
            user: null,
            breadcrumb_menu: [
                {
                    id: 1,
                    name: 'Trips'
                },
                {
                    id: 2,
                    name: 'Trips menu'
                }
            ],
            adultCount: null,
            childCount: null,
            infantCount: null,
         
        }
    },
    mounted() {
        console.log('the component has been mounted')
        this.adultCount = this.travelers.filter(traveler => traveler.age_type == 'adult').length
        this.childCount = this.travelers.filter(traveler => traveler.age_type == 'child').length
        this.infantCount = this.travelers.filter(traveler => traveler.age_type == 'infant').length
    },
    methods:  {
        
    }
}
</script>

<style lang="scss">
    @import "@/assets/scss/pages/flight.scss";
</style>