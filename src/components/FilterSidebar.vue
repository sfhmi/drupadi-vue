<template>
    <div>
        <div class="card border-0 filter-sidebar">
            <div id="accordion">
                <!-- <div class="card bg-primary" style="border-radius: 10px 10px 0px 0px;">
                    <div class="card-header mb-0 d-flex flex-row justify-content-between">
                        <p class="mb-0 text-white">Filter</p>
                        <button class="btn btn-link text-white p-0" @click="resetFilter()">Reset All</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header" id="headingFour">
                        <h5 class="mb-0">
                            <button class="btn " data-target="" aria-expanded="" aria-controls="">
                                <p>Transit</p>
                                <a class="btn btn-link p-0 text-primary" @click="transit = []">Clear</a>
                            </button>
                        </h5>
                    </div>
                    <div id="" class="" aria-labelledby="" data-parent="">
                        <div class="card-body p-0">
                            <div class="d-flex flex-row align-items-center mb-2" :key="index" v-for='(transits, index) in sidebarFilter.transits'>
                                <input type="checkbox" class="custom-checkbox" :value='transits.transit_count'
                                    :id="transits.type" v-model='transit'  @change="filterFare()">
                                <label :for='transits.type' class="m-0">{{ transits.type }}</label>
                            </div>
                        </div>
                    </div>
                </div> -->
                <hr class="m-0">
                <!-- <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn" data-target="#" aria-expanded="" aria-controls="">
                                <p>Airlines</p>
                                <a class="btn btn-link p-0 text-primary" @click="airline = []">Clear</a>
                            </button>
                        </h5>
                    </div>
                    <div id="" class="" aria-labelledby="" data-parent="#">
                        <div class="card-body p-0">
                            <div class="d-flex flex-row align-items-center mb-2"
                                v-for='(airlines, index) in sidebarFilter.airlines' :key="index">
                                <input type="checkbox" class="custom-checkbox" :id="airlines.airline"
                                    :value='airlines.airline' v-model='airline' @change="filterFare()">
                                <label :for='airlines.airline' class="m-0">{{ airlines.airline }}</label>
                            </div>
                        </div>
                    </div>
                </div> -->
                <hr class="m-0">
                <!-- <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h5 class="mb-0">
                            <button class="btn " data-target="" aria-expanded="" aria-controls="collapseTwo">
                                <p>Price</p>
                                <a class="btn btn-link p-0 text-primary"  @click="resetPrice()">Clear</a>
                            </button>
                        </h5>
                    </div>
                    <div id="" class="" aria-labelledby="" data-parent="">
                        <div class="card-body px-1">
                            <vue-slider v-model="sidebarFilter.filterPrice" :min='sidebarFilter.minPrice'
                                :max='sidebarFilter.maxPrice' @change="filterFare()"></vue-slider>
                            <div class="d-flex flex-row justify-content-between">
                                <p class="font-weight-bold">Rp {{ sidebarFilter.filterPrice[0] | currency }}</p>
                                <p class="font-weight-bold">Rp {{ sidebarFilter.filterPrice[1] | currency }}</p>
                            </div>
                        </div>
                    </div>
                </div> -->
                <hr class="m-0">
                <!-- <div class="card">
                    <div class="card-header" id="headingThree">
                        <h5 class="mb-0">
                            <button class="btn " data-target="" aria-expanded="flse"
                                aria-controls="collapseThree">
                                <p>Departure Time</p>
                                <a class="btn btn-link p-0 text-primary" @click="resetDeparture(flightTime)">Clear</a>
                            </button>
                        </h5>
                    </div>
                    <div id="" class="" aria-labelledby="" data-parent="#">
                        <div class="card-body p-0">
                            <div class="d-flex flex-row align-items-center mb-2"
                                v-for='(departures, index) in sidebarFilter.departureTime' :key="index">
                                <input type="checkbox" class="custom-checkbox" v-model='departures.value'
                                    @change='selectDepartureSchedule(index, "departure")'
                                    :id="'departures'+index">
                                <label :for="'departures'+index"
                                    class="m-0">{{ departures.start }}-{{ departures.end }}</label>
                            </div>
                        </div>
                    </div>
                </div> -->
                <hr class="m-0">
                <!-- <div class="card">
                    <div class="card-header" id="headingFour">
                        <h5 class="mb-0">
                            <button class="btn" data-target="" aria-expanded="" aria-controls="collapseFour">
                                <p>Arrival Time</p>
                                <a class="btn btn-link p-0 text-primary" @click="resetArrival(flightTime)">Clear</a>
                            </button>
                        </h5>
                    </div>
                    <div id="" class="" aria-labelledby="" data-parent="">
                        <div class="card-body p-0">
                            <div class="d-flex flex-row align-items-center mb-2"
                                v-for='(arrivals, index) in sidebarFilter.arrivalTime' :key="index">
                                <input type="checkbox" class="custom-checkbox" v-model='arrivals.value'
                                    @change='selectArrivalSchedule(index, "departure")' :id="'arrivals'+index">
                                <label :for="'arrivals'+index"
                                    class="m-0">{{ arrivals.start }}-{{ arrivals.end }}</label>
                            </div>
                        </div>
                    </div>
                </div> -->
                <hr class="m-0"> 
                <!-- <div class="card">
                    <div class="card-header" id="headingFour">
                        <h5 class="mb-0">
                            <button class="btn" data-target="" aria-expanded="" aria-controls="collapseFour">
                                <p>Class</p>
                                <a class="btn btn-link p-0 text-primary" @click="resetClass()">Clear</a>
                            </button>
                        </h5>
                    </div>
                    <div id="" class="" aria-labelledby="" data-parent="">
                        <div class="card-body p-0">
                            <div class="d-flex flex-row align-items-center mb-2"
                                v-for='(cabins, index) in sidebarFilter.cabinClass' :key="index">
                                <input type="checkbox" class="custom-checkbox" :id="cabins.class"
                                    :value='cabins.class' v-model='cabin_class' @change="filterFare()">
                                <label :for='cabins.class' class="m-0">{{ cabins.class }}</label>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"FilterSidebar",
    props: ["sidebarFilter"]
}
</script>

<style lang="scss">
    @import "@/assets/scss/components/_filter.scss";
</style>