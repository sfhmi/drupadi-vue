<template>
    <div class="card card-flights mb-0">
        <div class="card-header d-flex flex-row align-items-center justify-content-between"
            style="border-radius: 10px 10px 0px 0px">
            <div class="d-flex flex-column">
                <p>Departure flight</p>
                <p class="mb-0">{{ selectedDeparture.departure_airport_city }} to
                    {{ selectedDeparture.arrival_airport_city }}</p>
            </div>
            <button role="button" @click="changeFlight()"
                class="mb-0 text-white bg-transparent border-0">Change Departure Flight</button>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-lg-12">
                    <div class="d-flex flex-row align-items-center">
                        <div class="d-flex flex-row" v-for='(logo, index) in selectedDeparture.airline_logos' :key="logo+index">
                            <img :src="logo" class="mr-2" alt="" width="35">
                        </div>
                        <div class="d-flex flex-row" v-for='(name, index) in selectedDeparture.airline_names' :key="name+index">
                            <p class="mb-0">{{ name }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 d-flex flex-row align-items-center position-relative">
                    <div class="d-flex flex-column">
                        <p class="mb-0">{{ moment(selectedDeparture.departure_time).format('HH:mm') }}</p>
                        <small class="text-muted">{{ selectedDeparture.departure_airport_city }}
                            ({{ selectedDeparture.departure_airport_code }})</small>
                    </div>
                    <img src="@/assets/images/icons/distance.svg" class="mx-3">
                    <div class="d-flex flex-column">
                        <p class="mb-0">{{ moment(selectedDeparture.arrival_time).format('HH:mm') }}</p>
                        <small class="text-muted">{{ selectedDeparture.arrival_airport_city }}
                            ({{ selectedDeparture.arrival_airport_code }})</small>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="d-flex flex-row">
                        <img src="@/assets/images/icons/clock.svg" class="mr-3">
                        <p class="mb-0">{{ selectedDeparture.duration }}</p>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="d-flex flex-row">
                        <img src="@/assets/images/icons/map.svg" class="mr-3">
                        <p class="mb-0" v-if='selectedDeparture.transit_count > 0'>
                            {{ selectedDeparture.transit_count }} Transit(s)</p>
                        <p class="mb-0" v-if='selectedDeparture.transit_count == 0'>Direct</p>
                    </div>
                </div>
                <div class="col-lg-1">
                    <div class="d-flex flex-row">
                        <!-- <div>
                            {% endverbatim %}
                            <img src="{{ 'assets/images/icons/meals.svg' | theme }}" alt="" class="mr-3">
                            {% verbatim %}
                        </div> -->
                        <div  v-if="selectedDeparture.selectedFare[0].can_buy_additional_baggage == true">
                            <img src="@/assets/images/icons/luggage.svg" alt="" class="mr-3">
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="d-flex flex-column align-items-end">
                        <small class="text-muted"></small>
                        <p>Rp {{ selectedDeparture.selectedFare[0].display_price | currency }} <small> /
                                pax</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name:"SelectedFlight",
    props: ["selectedDeparture"],
    data() {
        return {
            moment: moment,
        }
    },
    methods: {
        changeFlight: function () {
            let select = this.selectedDeparture
            console.log(select)
            select = null
            console.log(select)

            // this.selectedDeparture = null
        }
    },
    filters: {
        currency: function (value) {
            if (!value || value == 0) return '-'
            return new Intl.NumberFormat('en-ID', { currency: 'IDR' }).format(value)
        },

    },
}
</script>

<style lang="scss">
    @import '@/assets/scss/components/_cards.scss';
</style>