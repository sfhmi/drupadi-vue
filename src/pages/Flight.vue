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
                <hr v-if='selectedDeparture'>
                <div class="row">
                    <div class="col-lg-12" >
                        <SelectedFlight  v-if='selectedDeparture'  :selectedDeparture="selectedDeparture" />
                    </div>
                </div>
                <hr class="my-4">
                <div class="row my-3">
                    <div class="col-lg-6">
                        <h3 class="text-primary font-weight-bold">Search result for {{ flightTime }} flight</h3>
                        <div class="d-flex flex-row align-items-center">
                            <p class="mb-0">{{ flightTime != 'return' ? departureAirport.city : arrivalAirport.city }}
                                ({{ flightTime != 'return' ? departureAirport.airport : arrivalAirport.airport }})</p>
                            <font-awesome-icon :icon="['fas','arrow-right']" class="mx-3"/>
                            <p class="mb-0">{{ flightTime != 'return' ? arrivalAirport.city : departureAirport.city }}
                                ({{ flightTime != 'return' ? arrivalAirport.airport : departureAirport.airport }})</p>
                        </div>
                    </div>
                    <div class="col-lg-6 d-flex flex-row align-items-end justify-content-end">
                        <div class="d-flex flex-row align-items-center">
                            <!-- <button class="bg-transparent border-0 outline-none">
                                {% endverbatim %}
                                <img src="{{ 'assets/images/icons/arrow-left.svg'|theme }}" alt="" class="mx-3">
                                {% verbatim %}
                            </button> -->
                            <!-- <p class="mb-0">{{ flightTime != 'return' ? departureDate : returnDate }}</p> -->
                            <!-- <button class="bg-transparent border-0 outline-none">
                                {% endverbatim %}
                                <img src="{{ 'assets/images/icons/arrow-right.svg'|theme }}" alt="" class="mx-3">
                                {% verbatim %}
                            </button> -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12" v-if='no_flight == true'>
                        <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                            <figure class="text-center">
                                <img src="@/assets/images/no-trip.svg" alt="">
                                <p>No Flight Found</p>
                            </figure>
                        </div>
                    </div>
                    <div class="col-lg-12" v-if="loading == true">
                        <div class="dots-container">
                            <div class="dots"></div>
                            <div class="dots"></div>
                            <div class="dots"></div>
                            <div class="dots"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <FilterSidebar  :sidebarFilter="sidebarFilter"/>
                    </div>
                    <div class="col-9">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body p-3">
                                        <div class="d-flex flex-row align-items-center justify-content-between w-100">
                                            <div class="toggle-cabin-options d-flex flex-row align-items-center">
                                                <input type="checkbox" class="toggle-checked-box mr-3" id="more-cabin"  v-model="moreFlightOptions">
                                                <label for="more-cabin" class="mb-0">Show more cabin options</label>
                                            </div>
                                            <p class="mb-0">Price in IDR (Indonesian Rupiah) per pax</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12" v-if="loading == false">
                                <CardFlight 
                                :computedDeparture="computedDeparture" 
                                :moreFlightOptions="moreFlightOptions"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment';
import Breadcrumb from '@/components/Breadcrumb.vue';
import SelectedFlight from '@/components/SelectedFlight.vue';
import FilterSidebar from '@/components/FilterSidebar.vue';
import CardFlight from '@/components/CardFlight.vue';
import axios from 'axios';

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
        SelectedFlight,
        CardFlight,
        FilterSidebar
    },
    data() {
        return {
            moment: moment,
            user: null,
            flightTime: "departure",
            no_flight: false,
            loading: false,
            departureJourneys: [
                {
                    id: "QG710~CGK~SUB^QG694~SUB~DPS",
                    airline_code: "QG",
                    airline_names: ["Citilink"],
                    airline_logos: ["https://image.flaticon.com/icons/svg/1078/1078005.svg"],
                    flight_number: "710",
                    departure_time: "2020-12-17 04:10:00",
                    departure_time_zone: 7,
                    departure_airport_code: "CGK",
                    departure_airport_name: "Soekarno-Hatta International Airport",
                    departure_airport_city: "Jakarta",
                    arrival_time: "2020-12-17 09:45:00",
                    arrival_time_zone: 8,
                    arrival_airport_code: "DPS",
                    arrival_airport_name: "Ngurah Rai (Bali) International Airport",
                    arrival_airport_city: "Denpasar",
                    duration: "4h 35m",
                    transit_count: 1,
                    is_smart_combo: false,
                    is_same_day: 0,
                    is_round_trip: false,
                    is_multi_airline: false,
                    transits: ["2h 15m"],
                    selectedFare: [
                        {
                        class: "E",
                        class_name: "Economy",
                        subclass: "OTB",
                        basis_subclass: "OTB",
                        free_baggage: "20",
                        free_baggage_unit: "KG",
                        can_buy_additional_baggage: false,
                        display_price: 1360500,
                        display_price_formatted: "1,360,500",
                        policy_level: {
                            compliance_level: "green",
                            approval_matrix: "dbsapvl4l5"
                        },
                        agentsOffersRate: [
                            {
                            agentCode: "GOLDENRAMA",
                            agentName: "Golden Rama",
                            agentLogo:
                                "http://drupadi.test/storage/app/uploads/public/5ed/e3b/70c/5ede3b70c43d8592335250.png",
                            baseFare: 1155000,
                            totalTax: 205500,
                            totalFare: 1360500,
                            policyLevel: {
                                compliance_level: "green",
                                approval_matrix: "dbsapvl4l5"
                            }
                            }
                        ]
                        }
                    ],
                    is_open: false,
                    rule_fare_combination: ["OTB/OTB^OTB/OTB", "OTA/OTA^OTA/OTA"],
                    segments: {
                        data: [
                        {
                            id: "QG~710~~CGK~SUB~2020-12-17T04:10~2020-12-17T05:40",
                            airline_name: "Citilink",
                            airline_code: "QG",
                            airline_logo:
                            "https://image.flaticon.com/icons/svg/1078/1078005.svg",
                            flight_number: "710",
                            duration: "1h 30m",
                            arrival_airport_code: "SUB",
                            arrival_airport_name: "Juanda International Airport",
                            arrival_airport_city: "Surabaya",
                            arrival_time: "2020-12-17T05:40:00",
                            arrival_time_zone: 7,
                            departure_airport_code: "CGK",
                            departure_airport_name: "Soekarno-Hatta International Airport",
                            departure_airport_city: "Jakarta",
                            departure_time: "2020-12-17T04:10:00",
                            departure_time_zone: 7,
                            is_stop_over: false,
                            stop_overs: [],
                            legs: {
                            data: [
                                {
                                id: "CGK~SUB~2020-12-17T04:10~2020-12-17T05:40",
                                duration: "1h 30m",
                                arrival_airport_code: "SUB",
                                arrival_airport_name: "Juanda International Airport",
                                arrival_airport_city: "Surabaya",
                                arrival_time: "2020-12-17T05:40:00",
                                departure_airport_code: "CGK",
                                departure_airport_name:
                                    "Soekarno-Hatta International Airport",
                                departure_airport_city: "Jakarta",
                                departure_time: "2020-12-17T04:10:00"
                                }
                            ]
                            }
                        },
                        {
                            id: "QG~694~~SUB~DPS~2020-12-17T07:55~2020-12-17T09:45",
                            airline_name: "Citilink",
                            airline_code: "QG",
                            airline_logo:
                            "https://image.flaticon.com/icons/svg/1078/1078005.svg",
                            flight_number: "694",
                            duration: "0h 50m",
                            arrival_airport_code: "DPS",
                            arrival_airport_name: "Ngurah Rai (Bali) International Airport",
                            arrival_airport_city: "Denpasar",
                            arrival_time: "2020-12-17T09:45:00",
                            arrival_time_zone: 8,
                            departure_airport_code: "SUB",
                            departure_airport_name: "Juanda International Airport",
                            departure_airport_city: "Surabaya",
                            departure_time: "2020-12-17T07:55:00",
                            departure_time_zone: 7,
                            is_stop_over: false,
                            stop_overs: [],
                            legs: {
                            data: [
                                {
                                id: "SUB~DPS~2020-12-17T07:55~2020-12-17T09:45",
                                duration: "0h 50m",
                                arrival_airport_code: "DPS",
                                arrival_airport_name:
                                    "Ngurah Rai (Bali) International Airport",
                                arrival_airport_city: "Denpasar",
                                arrival_time: "2020-12-17T08:45:00",
                                departure_airport_code: "SUB",
                                departure_airport_name: "Juanda International Airport",
                                departure_airport_city: "Surabaya",
                                departure_time: "2020-12-17T07:55:00"
                                }
                            ]
                            }
                        }
                        ]
                    },
                    fares: {
                        data: [
                        {
                            class: "E",
                            class_name: "Economy",
                            subclass: "OTB",
                            basis_subclass: "OTB",
                            free_baggage: "20",
                            free_baggage_unit: "KG",
                            can_buy_additional_baggage: false,
                            display_price: 1360500,
                            display_price_formatted: "1,360,500",
                            policy_level: {
                            compliance_level: "green",
                            approval_matrix: "dbsapvl4l5"
                            },
                            agentsOffersRate: [
                            {
                                agentCode: "GOLDENRAMA",
                                agentName: "Golden Rama",
                                agentLogo:
                                "http://drupadi.test/storage/app/uploads/public/5ed/e3b/70c/5ede3b70c43d8592335250.png",
                                baseFare: 1155000,
                                totalTax: 205500,
                                totalFare: 1360500,
                                policyLevel: {
                                compliance_level: "green",
                                approval_matrix: "dbsapvl4l5"
                                }
                            }
                            ]
                        },
                        {
                            class: "E",
                            class_name: "Economy",
                            subclass: "OTA",
                            basis_subclass: "OTA",
                            free_baggage: "20",
                            free_baggage_unit: "KG",
                            can_buy_additional_baggage: false,
                            display_price: 1427600,
                            display_price_formatted: "1,427,600",
                            policy_level: {
                            compliance_level: "green",
                            approval_matrix: "dbsapvl4l5"
                            },
                            agentsOffersRate: [
                            {
                                agentCode: "GOLDENRAMA",
                                agentName: "Golden Rama",
                                agentLogo:
                                "http://drupadi.test/storage/app/uploads/public/5ed/e3b/70c/5ede3b70c43d8592335250.png",
                                baseFare: 1216000,
                                totalTax: 211600,
                                totalFare: 1427600,
                                policyLevel: {
                                compliance_level: "green",
                                approval_matrix: "dbsapvl4l5"
                                }
                            }
                            ]
                        }
                        ]
                    }
                }
            ],
            sidebarFilter: {
                airlines: [],
                departureTime: [
                    {
                        value: false,
                        start: '00:00',
                        end: '06:00'
                    },
                    {
                        value: false,
                        start: '06:00',
                        end: '12:00'
                    },
                    {
                        value: false,
                        start: '12:00',
                        end: '18:00'
                    },
                    {
                        value: false,
                        start: '18:00',
                        end: '24:00'
                    }
                ],
                arrivalTime: [
                    {
                        value: false,
                        start: '00:00',
                        end: '06:00'
                    },
                    {
                        value: false,
                        start: '06:00',
                        end: '12:00'
                    },
                    {
                        value: false,
                        start: '12:00',
                        end: '18:00'
                    },
                    {
                        value: false,
                        start: '18:00',
                        end: '24:00'
                    }
                ],
                cabinClass: [
                    {
                        value: false,
                        class: 'First Class',
                    },
                    {
                        value: false,
                        class: 'Business',
                    },
                    {
                        value: false,
                        class: 'Economy',
                    },
                ],
                transits: [
                    {
                        value: false,
                        type: 'Direct',
                        transit_count: 0
                    },
                    {
                        value: false,
                        type: '1 Transit(s)',
                        transit_count: 1

                    },
                    {
                        value: false,
                        type: '2 Transit(s)',
                        transit_count: 2
                    },
                ],
                filterPrice: [1, 15000000],
                maxPrice:15000000,
                minPrice:  1,
            },
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
            selectedDeparture: null,
            transit: [],
            airline: [],
            cabin_class: [],
            moreFlightOptions: false,

        }
    },
    mounted() {
        console.log('the component has been mounted')
        axios.get('fakeAPI.json')
        .then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })

        this.adultCount = this.travelers.filter(traveler => traveler.age_type == 'adult').length
        this.childCount = this.travelers.filter(traveler => traveler.age_type == 'child').length
        this.infantCount = this.travelers.filter(traveler => traveler.age_type == 'infant').length
    },
     methods: {
        // requestAPI: function (data, count) {
            // $.request('bookings::onGetSchedules', {
            //     data: {
            //         airlineGroup: data,
            //     },
            //     success: (response) => {
            //         if (response.length == 0) return
            //         let airline = response.airlines
            //         let departure_schedule = response.schedules.departure
            //         let return_schedule = response.schedules.return
            //         let array_journey = response.schedules.departure

            //         departure_schedule.forEach(departure => {
            //             this.departureJourneys.push(departure)
            //         })
            //         airline.forEach(airline => {
            //             this.sidebarFilter.airlines.push(airline)
            //         })
            //         return_schedule.forEach(return_schedule => {
            //             this.returnJourneys.push(return_schedule)
            //         })
            //         array_journey.forEach(all => {
            //             this.arrayJourneys.push(all)
            //         })
            //         this.loading = false

            //         this.departureJourneys.forEach((element, index) => {
            //             this.departureJourneys[index].selectedFare.push(element.fares.data[0])
            //         })

            //         this.returnJourneys.forEach((element, index) => {
            //             this.returnJourneys[index].selectedFare.push(element.fares.data[0])
            //         })
            //         this[this.flightTime + 'Journeys'].sort((a, b) => {
            //             return moment(a.departure_time).format('HHmm') - moment(b.departure_time).format('HHmm')
            //         })
            //         this.filterFare()
            //         let counting = this.request_count + count
            //         this.request_count = counting
            //         console.log(data)
            //     },
            //     error: (error) => {
            //         this.errored = true
            //         console.log(error)
            //         if (error) {
            //             this.no_flight = true
            //             this.loading = null
            //             let counting = this.request_count + count
            //             this.request_count = counting
            //         }
            //     }
            // });
        // },

        // collapse: function (index, flightType) {
        //     this[flightType + "Journeys"][index].is_open = !this[flightType + "Journeys"][index].is_open
        // },

        // filterFare: function () {
            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })
        // },

        // resetFilter: function () {
            // this.sidebarFilter.departureTime.forEach(el => {
            //     el.value = false
            // })
            // this.selectDepartureSchedule()
            // this.sidebarFilter.arrivalTime.forEach(el => {
            //     el.value = false
            // })
            // this.selectArrivalSchedule()
            // this.transit = []
            // this.airline = []
            // this.cabin_class = []
            // this.sidebarFilter.minPrice = 0
            // this.sidebarFilter.maxPrice = 15000000
            // this.sidebarFilter.filterPrice = [1, 15000000],
            // this[this.flightTime + "Journeys"] = this.arrayJourneys
            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })
            // this[this.flightTime + 'Journeys'].sort((a, b) => {
            //     return moment(a.departure_time).format('HHmm') - moment(b.departure_time).format('HHmm')
            // })
        // },

        // resetPrice: function () {
            // this.sidebarFilter.minPrice = 0
            // this.sidebarFilter.maxPrice = 15000000
            // this.sidebarFilter.filterPrice = [1, 15000000],
            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })
            // this[this.flightTime + 'Journeys'].sort((a, b) => {
            //     return moment(a.departure_time).format('HHmm') - moment(b.departure_time).format('HHmm')
            // })
        // },

        // resetDeparture: function(depTime) {
            // const format = 'HH:mm';
            // let rawListFlight = this.arrayJourneys
            // let journeys = this[depTime + "Journeys"]
            // let arrAr = []
            // let checked = []
            // this.sidebarFilter.departureTime.forEach(el => {
            //     el.value = false
            // })
            // this.sidebarFilter.arrivalTime.forEach(arrival => {
            //     let start = moment(arrival.start, format).subtract(1, 'Seconds')
            //     let end = moment(arrival.end, format).subtract(1, 'Seconds')
            //     if (arrival.value == true) {
            //         rawListFlight.forEach(el => {
            //             let time = moment(el.arrival_time).format('HH:mm')
            //             let arrivalTime = moment(time, format)
            //             if (arrivalTime.isBetween(start, end)) arrAr.push(el)
            //         })
            //     }
            // })

            // function checkArray(val) {
            //     return val == false
            // }

            // if (checked.every(checkArray) == true) {
            //     if (arrAr.length > 0) return this[depTime + "Journeys"] = [...arrAr]
            //     this[depTime + "Journeys"] = rawListFlight
              
            // }
            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })
            // this[this.flightTime + 'Journeys'].sort((a, b) => {
            //     return moment(a.departure_time).format('HHmm') - moment(b.departure_time).format('HHmm')
            // })
        // },

        // resetArrival: function (depTime) {
            // const format = 'HH:mm';
            // let rawListFlight = this.arrayJourneys
            // let journeys = this[depTime + "Journeys"]
            // let arrAr = []
            // let checked = []
            // this.sidebarFilter.arrivalTime.forEach(el => {
            //     el.value = false
            // })
            // this.sidebarFilter.departureTime.forEach(departure => {
            //     let start = moment(departure.start, format).subtract(1, 'Seconds')
            //     let end = moment(departure.end, format).subtract(1, 'Seconds')
            //     if (departure.value == true) {
            //         rawListFlight.forEach(el => {
            //             let time = moment(el.departure_time).format('HH:mm')
            //             let departureTime = moment(time, format)
            //             if (departureTime.isBetween(start, end)) arrAr.push(el)
            //         })
            //     }
            // })

            // function checkArray(val) {
            //     return val == false
            // }

            // if (checked.every(checkArray) == true) {
            //     if (arrAr.length > 0) return this[depTime + "Journeys"] = [...arrAr]
            //     this[depTime + "Journeys"] = rawListFlight
            // }

            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })

            // this[this.flightTime + 'Journeys'].sort((a, b) => {
            //     return moment(a.departure_time).format('HHmm') - moment(b.departure_time).format('HHmm')
            // })
        // },

        // resetClass: function () {
            // this.cabin_class = []
            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })
        // },

        // selectDepartureSchedule: function (index, flightType) {
            // let rawListFlight = this.arrayJourneys
            // let journeys = this[flightType + "Journeys"]
            // let journey = []
            // let arrival = this.arrival
            // let arrAr = []
            // let checked = []
            // const format = 'HH:mm';
            // this.sidebarFilter.departureTime.forEach(departure => {
            //     checked.push(departure.value)
            // })
            // const checkArray = (val) => {
            //     return val == false
            // }
            // this.sidebarFilter.arrivalTime.forEach(arrival => {
            //     let start = moment(arrival.start, format).subtract(1, 'Seconds')
            //     let end = moment(arrival.end, format).subtract(1, 'Seconds')
            //     if (arrival.value == true) {
            //         rawListFlight.forEach(el => {
            //             let time = moment(el.arrival_time).format('HH:mm')
            //             let arrivalTime = moment(time, format)
            //             if (arrivalTime.isBetween(start, end)) arrAr.push(el)
            //         })
            //     }
            // })
            // if (checked.every(checkArray) == true) {
            //     if (arrAr.length > 0) return this[flightType + "Journeys"] = [...arrAr]
            //     this[flightType + "Journeys"] = rawListFlight
            // } else {
            //     this.sidebarFilter.departureTime.forEach(departure => {
            //         let start = moment(departure.start, format).subtract(1, 'Seconds')
            //         let end = moment(departure.end, format).subtract(1, 'Seconds')
            //         if (departure.value == true) {
            //             if (arrAr.length > 0) {
            //                 arrAr.forEach(el => {
            //                     let time = moment(el.departure_time).format('HH:mm')
            //                     let departureTime = moment(time, format)
            //                     if (departureTime.isBetween(start, end)) journey.push(el)
            //                 })
            //             } else {
            //                 rawListFlight.forEach(el => {
            //                     let time = moment(el.departure_time).format('HH:mm')
            //                     let departureTime = moment(time, format)
            //                     if (departureTime.isBetween(start, end)) journey.push(el)
            //                 })
            //             }
            //         }
            //     })
            //     this[flightType + "Journeys"] = [...journey]
            // }
            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })
        // },

        // selectArrivalSchedule: function (index, flightType) {
            // let rawListFlight = this.arrayJourneys
            // let journeys = this[flightType + "Journeys"]
            // let journey = []
            // let departure = this.departure
            // let arrAr = []
            // let checked = []
            // const format = 'HH:mm';
            // this.sidebarFilter.arrivalTime.forEach(arrival => {
            //     checked.push(arrival.value)
            // })
            // const checkArray = (val) => {
            //     return val == false
            // }
            // this.sidebarFilter.departureTime.forEach(departure => {
            //     let start = moment(departure.start, format).subtract(1, 'Seconds')
            //     let end = moment(departure.end, format).subtract(1, 'Seconds')
            //     if (departure.value == true) {
            //         rawListFlight.forEach(el => {
            //             let time = moment(el.departure_time).format('HH:mm')
            //             let departureTime = moment(time, format)
            //             if (departureTime.isBetween(start, end)) arrAr.push(el)
            //         })
            //     }
            // })
            // if (checked.every(checkArray) == true) {
            //     if (arrAr.length > 0) return this[flightType + "Journeys"] = [...arrAr]
            //     this[flightType + "Journeys"] = rawListFlight
            // } else {
            //     this.sidebarFilter.arrivalTime.forEach(arrival => {
            //         let start = moment(arrival.start, format).subtract(1, 'Seconds');
            //         let end = moment(arrival.end, format).subtract(1, 'Seconds');
            //         if (arrival.value == true) {
            //             if (arrAr.length > 0) {
            //                 arrAr.forEach(el => {
            //                     let time = moment(el.arrival_time).format('HH:mm')
            //                     let arrivalTime = moment(time, format)
            //                     if (arrivalTime.isBetween(start, end)) journey.push(el)
            //                 })
            //             } else {
            //                 rawListFlight.forEach(el => {
            //                     let time = moment(el.arrival_time).format('HH:mm')
            //                     let arrivalTime = moment(time, format)
            //                     if (arrivalTime.isBetween(start, end)) journey.push(el)
            //                 })
            //             }
            //         }
            //     })
            //     this[flightType + "Journeys"] = [...journey]
            // }
            // this.computedDeparture.journey.forEach((jrny, idx) => {
            //     jrny.selectedFare[0] = this.computedDeparture.filtered_fare[idx][0]
            // })
        // },

        // selectFlight: function (journey, flightTime) {
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
        // },

        // changeFlight: function (flightType) {
            // this["selected" + flightType] = null
            // this.flightTime = 'departure'
        // },

        // sortBy: function (data) {
            // console.log(data)
            // this.filterFare()
            // let datas = data.toLowerCase()
            // if (datas == 'lowest price') {
            //     this[this.flightTime + 'Journeys'].sort((a, b) => {
            //         return a.selectedFare[0].display_price - b.selectedFare[0].display_price
            //     })
            // } else if (datas == 'shortest duration') {
            //     this[this.flightTime + 'Journeys'].sort((a, b) => {
            //         return moment(b.departure_time).diff(b.arrival_time) - moment(a.departure_time).diff(a.arrival_time)
            //     })
            // } else if (datas == 'earliest departure') {
            //     this[this.flightTime + 'Journeys'].sort((a, b) => {
            //         return new moment(a.departure_time).format('HHmm') - new moment(b.departure_time).format('HHmm')
            //     })
            // } else if (datas == 'latest departure') {
                
            //     this[this.flightTime + 'Journeys'].sort((a, b) => {
            //         return moment(b.departure_time).format('HHmm') - moment(a.departure_time).format('HHmm')
            //     })
            // } else if (datas == 'earliest arrival') {
            //     this[this.flightTime + 'Journeys'].sort((a, b) => {
            //         return moment(a.arrival_time).format('HHmm') - moment(b.arrival_time).format('HHmm')
            //     })
            // } else if (datas == 'latest arrival') {
            //     this[this.flightTime + 'Journeys'].sort((a, b) => {
            //         return moment(b.arrival_time).format('HHmm') - moment(a.arrival_time).format('HHmm')
            //     })
            // }

            // this.sortedBy = data
        // },
    },

    filters: {
        currency: function (value) {
            if (!value || value == 0) return '-'
            return new Intl.NumberFormat('en-ID', { currency: 'IDR' }).format(value)
        },

    },
    computed: {
        computedDeparture: function () {
            let fares = []
            let filtered_fare = []
            // let departure_time = []
            // const format = 'HH:mm';
            

            let journey = this[this.flightTime + "Journeys"].filter((flight) => {   
                return (this.transit.length === 0 || this.transit.includes(flight.transit_count)) &&
                (this.airline.length === 0 || this.airline.includes(flight.airline_names[0]))
            }) 

            journey.forEach((flight) =>  {
                fares.push(flight.fares.data)
            })

            fares.forEach((fare) => {
                let price = fare.filter(prce => { 
                    return (prce.display_price > this.sidebarFilter.filterPrice[0] && prce.display_price < this.sidebarFilter.filterPrice[1]) &&
                    (this.cabin_class.length == 0 || this.cabin_class.includes(prce.class_name))
                })
                filtered_fare.push(price)
            })

            return{
                journey : journey,
                filtered_fare: filtered_fare
            }
        },
    },
}
</script>

<style lang="scss">
    @import "@/assets/scss/pages/flight.scss";
</style>