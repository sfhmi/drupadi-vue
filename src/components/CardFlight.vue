<template>
    <div>
        <div class="card-flights" 
        style="transition: all 0.3s"  
        v-for='(journey, index) in computedDeparture.journey'
        :key="index"
        :class="journey.is_open == true ? 'my-3 border-round' : 'my-0'"
        >
            <div v-if="computedDeparture.filtered_fare[index].length === 0 ? false : true">
                 <!-- Show more cabin options -->
                <!-- <div class="card-body"  @click='journey.is_open = !journey.is_open' v-if='moreFlightOptions = moreFlightOptions'>
                    <div class="row">
                        <div class="col-lg-2">
                            <figure class="card-icon d-flex flex-row align-items-center mb-0 ">
                                <div class="d-flex flex-column" style="width: 50px;">
                                    <img v-for="(airlineLogo, loop) in journey.airline_logos" :key="loop" :src="airlineLogo" alt="" width="35">
                                </div>
                                <div class="flex flex-column">
                                    <div class=" flex-row align-items-center" :class="journey.is_smart_combo == true ? 'd-flex' : 'd-none' ">
                                        <img src="@/assets/images/icons/smartcombo.svg" alt="">
                                    </div>
                                    <small
                                        class="text-muted">{{ journey.is_multi_airline ? 'Multi-airline' : journey.airline_names[0] }}</small>
                                    <p class="mb-0">
                                        {{ journey.segments.data[0].airline_code }}-{{journey.segments.data[0].flight_number}}
                                    </p>
                                    <p class="mb-0">
                                        {{ moment(journey.departure_time).format('HH:mm') }}-{{ moment(journey.arrival_time).format('HH:mm') }}{{ journey.is_same_day > 0 ? ('+' + journey.is_same_day + 'd') : '' }}
                                    </p>
                                </div>
                            </figure>
                        </div>
                        <div class="col-lg-10 pr-0">
                            <div class="overflow">
                                <div class="fares d-flex flex-row">
                                    <div v-for="(fare, idx) in computedDeparture.filtered_fare[index]" :key="idx"> 
                                        <input type="radio" :id="fare.subclass+index" name="fare_options"
                                            :value="fare" v-model='journey.selectedFare[0]' hidden
                                            :checked='fare.class' @click='journey.is_open = true'>
                                        <label :for='fare.subclass+index' class="options">
                                            <div
                                                :class="'policy-level-'+fare.policy_level.compliance_level">
                                            </div>
                                            <p>{{ Math.round(fare.display_price / 1000) | currency }}K</p>
                                            <p class="text-muted mb-0">{{ fare.class_name }}
                                                ({{ fare.subclass }})
                                            </p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <!-- Default view -->
                <div class="card-body" style="cursor: pointer;" @click='journey.is_open = !journey.is_open'  v-if='moreFlightOptions == moreFlightOptions'>
                    <!-- <div :class="'policy-level-'+journey.selectedFare[0].policy_level.compliance_level">
                        <p class="policy-level-description">
                            {{ journey.selectedFare[0].policy_level.compliance_level }}: {{ compliance_level_description[journey.selectedFare[0].policy_level.compliance_level] }}</p>
                    </div> -->
                    <div class="row mb-2">
                        <div class="col-lg-6">
                            <figure class="card-icon d-flex flex-row align-items-center mb-0 ">
                                <img v-for="(airlineLogo, loop) in journey.airline_logos" :src="airlineLogo" :key="loop" :class="loop < (journey.airline_logos.length - 1) ? 'mr-2' : null"
                                    alt="" width="35">
                                <p class="mb-0 ml-3">
                                    {{ journey.is_multi_airline ? 'Multi-airline' : journey.airline_names[0] }}
                                </p>
                            </figure>
                        </div>
                        <div class="col-lg-6 d-flex flex-row justify-content-end">
                            <div class=" flex-row align-items-center"
                                :class="journey.is_smart_combo == true ? 'd-flex' : 'd-none' ">
                                <img src="@/assets/images/icons/smartcombo.svg" alt="">                               
                            </div>
                            <img src="@/assets/images/icons/chevron-down-gray.svg" alt="" width="18" height="18" style="object-fit: contain" class="ml-3">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 d-flex flex-row align-items-center position-relative">
                            <div class="d-flex flex-column">
                                <p class="mb-0">{{ moment(journey.departure_time).format('HH:mm') }}</p>
                                <small>GMT+{{ journey.departure_time_zone }}</small>
                                <small class="text-muted">{{ journey.departure_airport_city }}
                                    ({{ journey.departure_airport_code }})</small>
                            </div>
                             
                            <img src="@/assets/images/icons/distance.svg" alt="" class="mx-3">
                             
                            <div class="d-flex flex-column">
                                <div class="d-flex flex-row">
                                    <p class="mb-0">{{ moment(journey.arrival_time).format('HH:mm') }}</p><small
                                        v-if="journey.is_same_day > 0">{{ journey.is_same_day > 0 ? ('+' + journey.is_same_day + 'd') : '' }}</small>
                                </div>
                                <small>GMT+{{ journey.arrival_time_zone }}</small>
                                <small class="text-muted">{{ journey.arrival_airport_city }}
                                    ({{ journey.arrival_airport_code }})</small>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="d-flex flex-row align-items-center">
                                <img src="@/assets/images/icons/clock.svg" alt="" width="18" height="18" style="object-fit: contain" class="mr-3">
                                <p class="mb-0">{{ journey.duration }}</p>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <div class="d-flex flex-row align-items-center">
                                <img src="@/assets/images/icons/map.svg" alt="" class="mr-3" width="18" height="18" style="object-fit: contain">
                                <p class="mb-0">
                                    {{ journey.transit_count > 0 ? journey.transit_count + ' Transit(s)' : 'Direct' }}
                                </p>  
                                <img src="@/assets/images/icons/luggage.svg" alt="" class="ml-3" width="18" height="18" style="object-fit: contain" v-if="journey.selectedFare[0].can_buy_additional_baggage == true">
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="d-flex flex-column align-items-end">
                                <small class="text-muted">{{ journey.selectedFare[0].class_name }}
                                    ({{ journey.selectedFare[0].subclass }})</small>
                                <p>Rp {{ journey.selectedFare[0].display_price | currency }}<small> /
                                        pax</small></p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div :class="journey.is_open == true ? 'd-block' : 'd-none'">
                    <div class="card-body">
                        <div class="d-block pt-4" v-for="(segment, idx) in journey.segments.data" :key="idx">
                            <div class="row mb-3">
                                <div class="col-lg-12">
                                    <figure class="card-icon d-flex flex-row align-items-center mb-0 ">
                                        <img :src="segment.airline_logo" alt="" width="35">
                                        <div class="d-flex flex-column ml-3">
                                            <small class="text-muted">{{ segment.airline_name }}</small>
                                            <p class="mb-0">
                                                {{ segment.airline_code }}-{{ segment.flight_number }}
                                            </p>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="d-flex flex-column">
                                        <ul class="flight-schedule">
                                            <li class='elips'>
                                                <p class="mb-0">{{ moment(segment.departure_time).format('HH:mm') }} <small>GMT+{{ segment.departure_time_zone }}</small></p>
                                                <p class="mb-0">{{ segment.departure_airport_city }}
                                                    ({{ segment.departure_airport_code }})</p>
                                                <p class="text-muted">{{ segment.departure_airport_name }}
                                                </p>
                                            </li>
                                            <li class='elips' v-for="(leg, l) in segment.legs.data" :key="l">
                                                <div v-if='segment.is_stop_over && l < segment.legs.data.length-1' >
                                                    <p class="mb-0">+Stopover at {{ leg.arrival_airport_city }}
                                                        ({{ leg.arrival_airport_code }}) for
                                                        {{ segment.stop_overs[l] }}</p>
                                                    <p class="text-muted">{{ leg.arrival_airport_name }}</p>
                                                </div>
                                            </li>
                                            <li class='elips'>
                                                <p class="mb-0">{{ moment(segment.arrival_time).format('HH:mm') }} <small>GMT+{{ segment.arrival_time_zone }}</small></p>
                                                <p class="mb-0">{{ segment.arrival_airport_city }}
                                                    ({{ segment.arrival_airport_code }})</p>
                                                <p class="text-muted">{{ segment.arrival_airport_name }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex flex-row align-items-center">
                                             
                                            <img src="@/assets/images/icons/clock.svg" alt="" width="18" height="18" style="object-fit: contain"
                                                class="mr-3">
                                             
                                            <p class="mb-0">
                                                {{ segment.duration }}
                                            </p>
                                        </div>
                                        <div class="d-flex flex-row">
                                            <p class="mb-0">Class:</p>
                                            <p class="text-muted mb-0 ml-2">
                                                {{ journey.selectedFare[0].class_name }}
                                                ({{ journey.selectedFare[0].basis_subclass }})
                                            </p>
                                        </div>
                                        <div class="d-flex flex-row">
                                            <p class="mb-0">Aircraft:</p>
                                            <p class="text-muted mb-0 ml-2">-</p>
                                        </div>
                                        <div class="d-flex flex-row">
                                            <p class="mb-0">Seat Layout:</p>
                                            <p class="text-muted mb-0 ml-2">-</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="d-flex flex-row">
                                        <p class="mb-0">Cabin Baggage:</p>
                                        <p class="text-muted mb-0 ml-2">7kg</p>
                                    </div>
                                    <div class="d-flex flex-row align-items-center">
                                         
                                        <img src="@/assets/images/icons/baggage.svg" alt=""
                                            class="mr-3" width="18" height="18" style="object-fit: contain">
                                         
                                        <p class="mb-0"
                                            v-if='journey.selectedFare[0].free_baggage > 0'>
                                            Baggage
                                            {{ journey.selectedFare[0].free_baggage }}
                                            ({{ journey.selectedFare[0].free_baggage_unit }})
                                        </p>
                                        <p class="mb-0"
                                            v-if='journey.selectedFare[0].free_baggage == 0'>
                                            Baggage (In Booking) </p>

                                    </div>
                                    <div class="d-flex flex-row aling-items-center">
                                         
                                        <img src="@/assets/images/icons/meals.svg" alt=""
                                            class="mr-3" width="18" height="18" style="object-fit: contain">
                                         
                                        <p class="mb-0">In-Flight meal</p>
                                    </div>
                                </div>
                            </div>

                            <div class="row journey-segments"
                                :class="journey.segments.data.length > 1 && idx < journey.segments.data.length-1 ? 'd-block' : 'd-none' ">
                                <div class="col-lg-12">
                                    <div
                                        class="transits p-3 d-flex flex-row align-items-center justify-content-center">
                                         
                                        <img src="@/assets/images/icons/alert-triangle.svg"
                                            alt="" class="mx-3">
                                         
                                        <p class="text-primary mb-0">Transit for {{ journey.transits[idx] }}
                                            in {{ segment.arrival_airport_city }}
                                            ({{ segment.arrival_airport_code }})</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-block">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div 
                                    class="agents d-flex flex-row justify-content-between align-items-center py-2"  
                                    v-for="(agent, indx) in computedDeparture.journey[index].selectedFare[0].agentsOffersRate"
                                    :key="indx">
                                        <div class="d-flex flex-row align-items-center">
                                            <figure class="mb-0 mr-2">
                                                <img :src="agent.agentLogo" alt="" height="30">
                                            </figure>
                                            <p class="mb-0">{{ agent.agentCode }}</p>
                                        </div>
                                        <div class="d-flex flex-row align-items-center">
                                            <figure class="mb-0 mr-2">
                                                 
                                                <img src="@/assets/images/icons/info.svg" alt=""
                                                    class="mx-3">
                                                 
                                            </figure>
                                            <p class="mb-0 mr-2">Rp {{ agent.totalFare | currency }}</p>
                                            <button @click="selectFlight(journey, 'departure')"
                                                class="btn btn-primary  btn-sm" 
                                                :disabled="computedDeparture.journey[index].selectedFare[0].policy_level.compliance_level == 'black'">Choose</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "CardFlight",
    props: ["computedDeparture", "moreFlightOptions"],
    data() {
        return {
            moment: moment,
        }
    },
    methods: {
        selectFlight: function (journey) {
            // document.querySelector("body").style.overflow = "hidden";
            // this.screen_loading = true
            // $.request('bookings::onSelectFlight', {
            //     data: {
            //         journey: journey,
            //         flightTime: flightTime
            //     },
            //     success: response => {
            //         if (response.result) {
            //             window.location.href = response.result
            //         }
            //         if (flightTime == "departure" && this.flightType == 'round_trip') {
            //             this.flightTime = 'return'
            //             this.selectedDeparture = journey
            //             this.arrayJourneys = this.returnJourneys
            //             window.scrollTo({top: 0, behavior: 'smooth'});
            //             this.sortBy(this.sortedBy)
            //         }
            //         this.screen_loading = false
            //         document.querySelector("body").style.overflow = "visible";
            //         this.sortBy(this.sortedBy)
                   
            //     },
            //     error: error => {
            //         document.querySelector("body").style.overflow = "visible";
            //         this.screen_loading = false
            //         $.oc.flashMsg({ test: error.responseText, class: 'error' })
            //     }
            // })
            this.flightTime = 'return'
            this.$emit('selectFlight', journey)
            // this.selectedDeparture = journey

        },
    },
    filters: {
        currency: function (value) {
            if (!value || value == 0) return '-'
            return new Intl.NumberFormat('en-ID', { currency: 'IDR' }).format(value)
        },
    }
}
</script>
