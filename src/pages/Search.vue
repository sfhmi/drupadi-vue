<template>
    <div>
        <Breadcrumb :breadcrumb_menu="breadcrumb_menu" />
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col-lg-12 w-100 d-flex flex-row">
                    <div class="filter-top">
                        <div class="radio-filter mr-2">
                            <input type="radio" name='flight' id="one-way" value='one_way' v-model='flightType' @change="changeType('one_way')" hidden checked>
                            <label for="one-way">One-way</label>
                        </div>
                    </div>
                    <div class="filter-top">
                        <div class="radio-filter mr-2">
                            <input type="radio" name='flight' id="roundTrip" value='round_trip' @change="changeType('round_trip')" v-model='flightType' hidden>
                            <label for="roundTrip">Round-trip</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-3 select-destinations">
                    <div class="form-group w-100 ">
                        <div class="card border-0">
                            <div class="card-body">
                                <template>
                                    <v-select :options="airports" v-model="selectedDeparture" label='airport' :filterable="false" @keypress.enter.native.prevent="" @search="searchFlight()">
                                        <template #selected-option="{ city, airport, name }">
                                            <p style="margin: 0">{{ city }}</p>
                                            <small>{{ airport }} - {{ name }}</small>
                                        </template>
                                        <template #option="{ city, airport, name }">
                                            <p style="margin: 0">{{ city }}</p>
                                            <small>{{ airport }} - {{ name }}</small>
                                        </template>
                                    </v-select>
                                </template>
                            </div>
                        </div>
                    </div>
                    <button class="py-1 px-3 m-1 rounded-circle" type="button" id="switch-destination" 
                        @click='switchDestination'>
                        <img src="@/assets/images/icons/refresh-ccw.svg" alt="">
                    </button>
                </div>
                <div class="col-lg-3 select-destinations">
                    <div class="form-group w-100 ">
                        <div class="card border-0">
                            <div class="card-body">
                                <template>
                                    <v-select :options="airports" v-model="selectedArrival" label='airport' :filterable="false" @keypress.enter.native.prevent="" @search="searchFlight()">
                                        <template #selected-option="{ city, airport, name }">
                                            <p style="margin: 0">{{ city }}</p>
                                            <small>{{ airport }} - {{ name }}</small>
                                        </template>
                                        <template #option="{ city, airport, name }">
                                            <p style="margin: 0">{{ city }}</p>
                                            <small>{{ airport }} - {{ name }}</small>
                                        </template>
                                    </v-select>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                 <div class="col-lg-3 select-destinations">
                    <div class="form-group w-100" >
                        <div class="card border-0">
                            <div class="card-body date-flight">
                                <label class='text-muted mb-0'>Departure Date</label>
                                <datepicker v-model='departureDateState.date' format='D, dd MMM yyyy' :disabled-dates="departureDateState.disabled"  @selected="selectDate"></datepicker>
                            </div>
                            <img src="" alt="" class="calendar-icon">
                        </div>
                    </div>
                </div>
                 <div class="col-lg-3 select-destinations" v-if="flightType == 'round_trip' ? true : false ">
                    <div class="form-group w-100" > 
                        <div class="card border-0">
                            <div class="card-body date-flight" >
                                <label class='text-muted'>Return Date</label>
                                <datepicker v-model='returnDateState.date' format='D, dd MMM yyyy' :disabled-dates="returnDateState.disabled"></datepicker>
                            </div>
                            <img src="" alt="" class="calendar-icon">
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="row mb-4">
                <div class="col-lg-6 d-flex flex-row align-items-center">
                    <b-button v-b-modal.passenger-modal variant="primary mr-3">Add Passenger</b-button>
                    <div class="d-flex flex-row align-items-center">
                        <input type="checkbox" class="custom-checkbox" id="addme"  v-model="add_me" @change="addMe()">
                        <label for='addme' class="m-0" style="font-weight: 600; font-size: 14px;">Add me as passenger</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <ListTravelers :travelers="travelers" />
                </div>
            </div>
             <div class="row">
                <div class="col-lg-12 text-right">
                    <router-link :to="{ 
                        name:'Flights', 
                        query: { 
                            type: flightType
                        } , 
                        params: {
                            id: trip_id, 
                            departureDate: departureDateState.date, 
                            retunrDate: returnDateState.date,
                            departureAirport: selectedDeparture,
                            arrivalAirport: selectedArrival,
                            flightType: flightType,
                            travelers: travelers,
                            } 
                        }" class="btn btn-primary text-white text-decoration-none">Search flight
                    </router-link>
                </div>
            </div>
        </div>
        <AddPassengerModal 
            :travelers="travelers"
            :user="user"
            @savePassengerList="updatePassenger"
        />
    </div>
</template>

<script>
import Breadcrumb from '../components/Breadcrumb.vue';
import ListTravelers from '../components/ListTravelers.vue';
import AddPassengerModal from '../components/AddPassengerModal.vue';
import Datepicker from 'vuejs-datepicker';

export default {
    name: 'Search',
    props: ["passengers"],
    components: {
        Breadcrumb,
        Datepicker,
        ListTravelers,
        AddPassengerModal,
    },
    data() {
        return {
            trip_id: 1,
            modal_passenger_is_open: false,
            passengerList: [],
            passenger_selected: [],
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
            travelers: [],
            user: {
                age_type: "adult",
                birth_date: null,
                division: "T&amp;O - DBS",
                employee_id: 18,
                employee_number: "DBS007",
                identity_number: null,"image":"",
                name: "Gayatri Diah W",
                note: null,
                passport_expired :null,
                passport_no: null,
                phone: null,
                role: "GPS Staff - L6",
                title:null,
                traveler_id :"85",
                trip_id: "28"
            },
            flightType: 'one_way',
            selectedDeparture: {
                airport:"CGK",
                name:"Soekarno Hatta International Airport",
                city:"Jakarta"
            },
            selectedArrival: {
                airport:"CGK",
                name:"Soekarno Hatta International Airport",
                city:"Jakarta"
            },
            airports: [
                {
                    airport: "CGK",
                    name: 'Soekarno Hatta International Airport',
                    city: 'Jakarta'
                },
                {
                    airport: "HLP",
                    name: 'Halim Perdana Kusuma International Airport',
                    city: 'Jakarta'
                },
                {
                    airport: "SUB",
                    name: 'Juanda International Airport',
                    city: 'Surabaya'
                },
                {
                    airport: "DPS",
                    name: 'Denpasar (Bali) International Airport',
                    city: 'Denpasar'
                },
                {
                    airport: "YIA",
                    name: 'Yogyakarta International Airport',
                    city: 'Yogyakarta'
                },
                {
                    airport: "UPG",
                    name: 'Sultan Hasanuddin International Airport',
                    city: 'Makassar'
                }
            ],
           
            departureDateState: {
                date: new Date(),
                disabled: {
                    to: new Date(+new Date() - 1000*60*60*24), // Disable all dates up to specific date
                }
            },
            returnDateState: {
                date: new Date(),
                disabled: {
                    to: new Date(+new Date() - 1000*60*60*24), // Disable all dates up to specific date
                }
            },
            add_me: false,
        }
    },

    updated() {
        this.travelers.filter(data => data.employee_id == this.user.employee_id).length > 0 ? (this.add_me = true) : (this.add_me = false);
    },
    mounted() {
        if (this.passengers) {
            this.passengers.forEach(traveler => {
                this.travelers.push(traveler)
            })
        }
        let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname  + '?' + 'type=' + this.flightType.toString();
        history.pushState(newUrl,'',newUrl);
    },
    methods: {
        changeType: function (type) {
            let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname  + '?' + 'type=' + type.toString();
            history.pushState(newUrl,'',newUrl);
        },
        switchDestination: function () {
            let departure = this.selectedDeparture
            let arrival = this.selectedArrival
            this.selectedDeparture = arrival
            this.selectedArrival = departure
        },
        modalPassenger: function(e) {
            e.preventDefault();
            this.modal_passenger_is_open = !this.modal_passenger_is_open
            console.log(this.modal_passenger_is_open)
        },
        addMe: function () {
            if (this.add_me == true) {
                if (this.travelers.length <= 6) {
                    this.travelers.push(this.user)
                } else {
                    this.add_me = false
                    
                }
            } else {
                let travelers = this.travelers.filter(data => {
                    return data.employee_id != this.user.employee_id
                })
                this.travelers = travelers
            } 
        },
        
        onSubmit: function () {
            document.querySelector("body").style.overflow = "hidden";
            this.screen_loading = true

            // $.request('bookings::onCreateOrUpdateBooking', {
            //     data: {
            //         flight: this.flightType,
            //         departure_airport_code: this.selectedDeparture.airport,
            //         arrival_airport_code: this.selectedArrival.airport,
            //         departure_date: this.parseDate(this.departureDateState.date),
            //         return_date: this.flightType == 'round_trip' ? this.parseDate(this.returnDateState.date) : null,
            //         travelers: this.travelers
            //     },
            //     error: error => {
            //         $.oc.flashMsg({ text: error.responseText, class: 'error' })
            //         document.querySelector("body").style.overflow = "visible";
            //         this.screen_loading = false
            //     }
            // })
        },
       
        selectDate: function (departureDate) {
            this.returnDateState.disabled.to = departureDate
            if ( departureDate > this.returnDateState.date ) {
                this.returnDateState.date = departureDate
            }
        },
        
        searchAirport:function () {
            // if (search) {
            //     $.request('bookings::onSearchAirport', {
            //         data: {
            //             query: search,
            //         },
            //         success: (data) => {
            //             this.airports = data
            //         },
            //         error: error => {
            //             $.oc.flashMsg({ text: error.responseText, class: 'error' })
            //         }
            //     })
            // } else {
            //     this.airports = this.displayAirport
            // }           
        },

        searchPassenger: function () {
            // this.isEmployeeSearchLoading = true
            // if (!this.searchQuery) {
            //     this.passengerList = []
            //     return
            // }
            // $.request('bookings::onSearchPassenger', {
            //     data: {
            //         query: this.searchQuery,
            //     },
            //     success: data => {
            //         data.forEach(passenger => {
            //             let list_passenger = this.travelers.concat(this.passenger_selected)
            //             passenger.is_already_added = list_passenger.filter(el => el.name == passenger.name).length > 0 ? true : false
            //         })
            //         this.passengerList = data
            //         this.isEmployeeSearchLoading = false
            //     },
            //     error: error => {
            //         $.oc.flashMsg({ text: error.responseText, class: 'error' })
            //         this.isSearchLoading = false
            //     }
            // })
        }, 

        removeFromPassengerList: function () {
            // this.passenger_selected.splice(index, 1)
        },

        updatePassenger: function(value) {
            this.travelers.push(value)
            // let passengerList = this.passenger_selected

            // if  (this.guest_is_open == true) { 
            //     passengerList = this.passenger_selected.concat(this.adult_guest, this.child_guest, this.infant_guest)
            // }

            // if (passengerList.length + this.travelers.length > 7) {
            //     $.oc.flashMsg({ text: 'Maximal travelers is 7', class: 'error' })
            // } else {
            //     if (this.travelers.length == 0 && this.adult_guest.length == 0  && this.child_guest.length == 0  && this.infant_guest.length == 0) {
            //         this.travelers = [...passengerList]
            //     } else {
            //         passengerList.forEach(passenger => {
            //             if (passenger.name == this.user.name) {
            //                 this.travelers.push(this.user)
            //             } else if (passenger.name !== "") {
            //                 this.travelers.push(passenger)
            //             } else {
            //                 this.travelers.push(passenger)
            //             }
            //         })
            //     }
            //     this.travelers.filter(data => (data.employee_id == this.user.employee_id)).length > 0 ? this.add_me = true : this.add_me = false
            //     this.passenger_selected = []
            //     this.guest_list = [{
            //         image: 'https://image.flaticon.com/icons/svg/1077/1077114.svg',
            //         age_type: 'adult',
            //         title: '',
            //         name: '',
            //         note: '',
            //     }]
            //     this.modal_passenger_is_open = false
            //     this.guest_is_open = false
            //     this.passengerList = []

            //     this.getPaxCount()
            // }
        },

     

        parseDate: function () {
            // return date ? date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, 0) + '-' + String(date.getDate()).padStart(2, 0) : null
        },


        addPassengerList: function() {
            // let passengerList = this.passenger_selected
            // if  (this.guest_is_open == true) { 
            //     passengerList = this.passenger_selected.concat(this.adult_guest, this.child_guest, this.infant_guest)
            // }
            // if (passengerList.length + this.travelers.length >= 7) {
            //     $.oc.flashMsg({ text: 'Maximal travelers is 7', class: 'error' })
            // } else {
            //     if (passenger.is_already_added) return;
            //     this.passenger_selected.push(passenger)
            //     this.passengerList.splice(idx, 1)
            //     this.searchQuery = ''
            // }
        },

        getPaxCount: function () {
            // var adult = this.travelers.filter(age => { 
            //     return age.age_type === "adult"
            // }).length;
            // var child = this.travelers.filter(age => { 
            //     return age.age_type === "child"
            // }).length;
            // var infant = this.travelers.filter(age => { 
            //     return age.age_type === "infant"  ; 
            // }).length;

            // this.adultCount = adult
            // this.childCount = child
            // this.infantCount = infant
        },

        addGuest: function () {
            // let passengerList = this.passenger_selected
            // if  (this.guest_is_open == true) { 
            //     passengerList = this.passenger_selected.concat(this.adult_guest, this.child_guest, this.infant_guest)
            // }
            // if (prop == "childInc" || prop == "adultInc" || prop == "infantInc") {
            //     if (passengerList.length + this.travelers.length > 6) {
            //         $.oc.flashMsg({ text: 'Maximal travelers is 7', class: 'error' })
            //     } else {
            //         if (prop == "adultInc") {
            //         this.adult_guest.push({
            //             image: '',
            //             age_type: 'adult',
            //             title: '',
            //             name: '',
            //             note: '',
            //         })
            //         } 
            //         if (prop == "infantInc") {
            //                 console.log(this.infant_guest)
            //             if (this.infant_guest.length >= this.adult_guest.length) {
            //                 $.oc.flashMsg({ text: 'Total infant must be below total adult', class: 'error' })
            //             } else {
            //                 this.infant_guest.push({
            //                     image: '',
            //                     age_type: 'infant',
            //                     title: '',
            //                     name: '',
            //                     note: '',
            //                 })
            //             }
            //         } 
            //         if (prop == "childInc") {
            //             this.child_guest.push({
            //                 image: '',
            //                 age_type: 'child',
            //                 title: '',
            //                 name: '',
            //                 note: '',
            //             })
            //         }
            //     }
            // }  else if (prop == "childDec" || prop == "adultDec" || prop == "infantDec") {
            //     if (prop == "childDec") {
            //         this.child_guest.splice(null,1)
            //     } else if (prop == "infantDec") {
            //         this.infant_guest.splice(null,1)
            //     } else if (prop == "adultDec")  {
            //         this.adult_guest.splice(null,1)
            //     }
            // }
            
        },

        titleValidation: function () {
            // console.log(data)
            // setTimeout(() => {
            //     if (data.age_type == 'adult') {
            //         if (data.title == 'Mr' || data.title == 'Ms' || data.title == 'Mrs') return
            //         $.oc.flashMsg({ text: 'Your title does not match with the current age', class: 'error' })
            //     } else {
            //         if (data.title == 'Mstr' || data.title == 'Miss') return 
            //         $.oc.flashMsg({ text: 'Your title does not match with the current age', class: 'error' })
            //     }
            // }, 100);
        },
    }
}
</script>

<style lang="scss">
    .filter-top {
        .radio-filter {
            input[type="radio"] {
                &:checked {
                    & ~ label {
                        color: $white;
                        background-color: $primary;
                        &::after {
                            background-color: $white;
                        }
                    }
                }
            }

            label {
                background-color: lighten($color: $primary, $amount: 30);
                color: $primary;
                padding: 5px 10px;
                font-size: 14px;
                border-radius: 5px;
                position: relative;
                font-weight: 600;
                // &::after {
                //     content: "";
                //     display: block;
                //     position: absolute;
                //     top: 12px;
                //     left: 10px;
                //     width: 7px;
                //     height: 7px;
                //     border-radius: 50%;
                //     background-color: $primary;
                // }
            }
        }
    }
    .select-destinations {
        position: relative;
        .card {
            height: 92px;
            .date-flight {
                position: relative;
                cursor: pointer;
                label {
                    font-weight: 400;
                    color: $gray-300;
                    margin-bottom: 0px;
                    font-size: 12px;
                }
                span {
                    input {
                        border-radius: 0px;
                        border: 0px;
                        box-shadow: none;
                        padding: 0px;
                        font-size: 14px;
                        font-weight: 800;
                    }
                }
            }
            img.calendar-icon {
                position: absolute;
                top: 50px;
                right: 20px;
            }
            .custom-combobox {
                .ui-widget {
                    border: 0px;
                }
                .custom-combobox-input {
                    font-size: 24px;
                    font-weight: bold;
                    outline: none;
                }

                a.ui-button {
                    display: none;
                }
            }

            .v__select {
                margin-top: 10px;
            }
            .vs__dropdown-toggle {
                border: 0px;
                padding: 0px;
                .vs__selected-options {
                    padding: 0px;
                    height: auto;
                    .vs__search:focus {
                        background-color: white;
                    }
                    .vs__search {
                        // margin-top: 25px;
                        padding: 0px;
                        position: absolute;
                        width: 100%;
                        font-size: 16px;
                        padding-bottom: 40px;
                        font-size: 16;
                        font-weight: bold;
                    }
                    .vs__selected {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        font-size: 20px;
                        font-weight: 800;
                        padding: 0px;
                        margin: 0px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        line-height: 24px;
                        max-height: 3em; 
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        p {
                            font-weight: bold;
                            font-size: 24px !important;
                        }
                    }
                }

                .vs__actions {
                    display: none;
                    // .vs__clear {
                    //     display: none;
                    // }
                }
            }

            .vs__dropdown-menu {
                border: 0px;
                border-radius: 10px;
                margin-top: 50px;
                li {
                    font-size: 16px;
                    font-weight: 800;

                    &:hover {
                        background-color: $primary !important;
                    }

                    p {
                        font-weight: bold;
                    }
                }
            }

            small {
                font-size: 12px;
                margin-left: 0px;
            }
        }
        #switch-destination {
            position: absolute;
            top: 17px;
            right: -29px;
            z-index: 2;
            width: 49px;
            height: 49px;
            border-radius: 50%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            background-color: $primary;
            border: none;
            outline: none;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            &:active, &:focus {
                box-shadow: 0 0 0 0.2rem lighten($color: $primary, $amount: 30);
            }
            &:hover {
                background-color: darken($color: $primary, $amount: 10);
            } 
        }
    }
</style>