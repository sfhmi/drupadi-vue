<template>
    <div>
        <b-modal id="passenger-modal"  ref="passengerModal" size="lg" title="Large Modal" hide-footer>
             <template v-slot:modal-header>
                <div class="w-100 d-flex justify-content-between">
                    <h3 class="font-weight-bold">Add Passengers</h3>
                    <div class="d-flex flex-row">
                        <button class="btn btn-secondary btn-sm  mr-2" data-dismiss="modal" @click="closeModal()">Cancel</button>
                        <button class="btn btn-primary btn-sm" data-dismiss="modal" @click="savePassengerList()">Save</button>
                    </div>
                </div>
            </template>
            <div class="px-3 py-2">
                <p class="mb-2 text-primary" style="font-weight: 600;">Employee List</p>
                <div class="passenger-search">
                    <label for="search_employees">
                        <div class="passengers-selected mr-1" :key="index" v-for='(passenger, index) in passenger_selected'>
                            <img :src="passenger.image" alt="">
                            <p>{{ passenger.name }}</p>
                            <div style="cursor: pointer;" class="btn-delete" @click='removeFromPassengerList(index)'>
                                <img src="" class="m-0" alt="" style="width: 15px;">
                            </div>
                        </div>
                        <input type="text" id="search_employees" v-model='searchQuery' @keyup='searchPassenger' placeholder="Search Employees">
                    </label>
                </div>
            </div> 
            <div class="px-3 " v-if="isEmployeeSearchLoading">
                <small class="text-primary" style="font-weight: 600;">Searching...</small>
            </div>
            <div class="py-1 px-3 pl-0 border-top " v-if="!isEmployeeSearchLoading && searchQuery">
                <small class="text-primary" style="font-weight: 600;" v-if="passengerList.length > 0">{{ passengerList.length }} search result(s).</small>
                <small class="text-primary" style="font-weight: 600;" v-else>No search result.</small>
            </div>
            <div class="border-0" v-if="passengerList.length > 0" style="max-height: 200px; overflow: scroll; background: #F9F5FA;">
                <div class="passengers-list">
                    <table class="table table-borderless table-hover passenger-table">
                        <tr :key="index" v-for="(passenger, index) in passengerList" style="cursor: pointer;" @click="addPassengerList(passenger, index)">
                            <td>
                                <div class="d-flex flex-row align-items-center">
                                    <input type="checkbox" :disabled="passenger.is_already_added" class="custom-checkbox" :value="passenger" v-model="passenger_selected" hidden>
                                    <img :src="passenger.image" alt="">
                                    <div class="d-flex flex-column">
                                        <b>{{ passenger.name }}</b>
                                        <small>{{ passenger.employee_number }}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="d-flex flex-column">
                                    <p class="mb-0">{{ passenger.role ? passenger.role : passenger.note }}</p>
                                    <small class="text-muted">{{ passenger.division ? passenger.division : 'Guest' }}</small>
                                    <small v-if="passenger.is_already_added" class="text-danger">Already added</small>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="add-guest-passengers px-3 border-top" style="cursor: pointer;">
                <div class="d-flex flex-row align-items-center">
                    <input type="checkbox" class="custom-checkbox" id="guest-as-passenger" v-model='guest_is_open'>
                    <label for="guest-as-passenger" class="mb-0" >Add guest as passenger</label>
                </div>
                <div class="d-flex flex-row align-items-center" v-if='guest_is_open == true'>
                    <div class="d-flex flex-row align-items-center">
                        <p class="mb-0 mr-1">Adult</p>
                        <button class="btn btn-outline-primary" @click='addGuest("adultDec")'><i class="fa fa-minus fa-fw"></i></button>
                        <p class="mx-2 my-0">{{ adult_guest.length }}</p>
                        <button class="btn btn-outline-primary" @click='addGuest("adultInc")'><i class="fa fa-plus fa-fw"></i></button>
                    </div>
                    <div class="d-flex flex-row align-items-center mx-3">
                        <p class="mb-0 mr-1">Child</p>
                        <button class="btn btn-outline-primary" @click='addGuest("childDec")'><i class="fa fa-minus fa-fw"></i></button>
                        <p  class="mx-2 my-0">{{ child_guest.length  }}</p>
                        <button class="btn btn-outline-primary" @click='addGuest("childInc")'><i class="fa fa-plus fa-fw"></i></button>
                    </div>
                    <div class="d-flex flex-row align-items-center">
                        <p class="mb-0 mr-1">Infant</p>
                        <button class="btn btn-outline-primary" @click='addGuest("infantDec")'><i class="fa fa-minus fa-fw"></i></button>
                        <p  class="mx-2 my-0">{{ infant_guest.length }}</p>
                        <button class="btn btn-outline-primary" @click='addGuest("infantInc")'><i class="fa fa-plus fa-fw"></i></button>
                    </div>
                </div> 
            </div>
             <div class="py-0 px-0 border-0">
                <div class="guest-form" :class='guest_is_open ? "guest-modal-open" : "guest-modal-close" '>
                    <div class="d-flex flex-row align-items-center pt-2 px-3" :key="adult.id+index" v-for='(adult, index) in adult_guest'>
                            <img src="@/assets/images/icons/user-default.svg" class="mr-2" alt="" width="35" height="35" style="border-radius: 50%;">
                        <p class="mr-2 mb-0" style="width: 80px;">{{ adult.age_type }}</p>
                        <div class="position-relative">
                            <select name="" id="" class='form-control mr-2'  v-model='adult.title'  @change='titleValidation(adult, index)' style="width: 100px; -webkit-appearance: none; padding-right: 20px;">
                                <option :key="idx" v-for='(title, idx) in title' :value="title.title" >
                                    {{ title.title }}</option>
                            </select>
                            <i class="fas fa-chevron-down position-absolute" style="top: 10px; right: 15px"></i>
                        </div>
                        <input type="text" v-model="adult.name" class="form-control mr-2" placeholder="Guest Name" style="width: 300px;">
                        <input type="text" v-model="adult.note" class="form-control" placeholder="Notes (optional)">
                        <button class="btn p-0" @click='adult_guest.splice(index, 1)'>
                            <img src="" alt="">
                        </button>
                    </div>
                    <div class="d-flex flex-row align-items-center pt-2 px-3" :key="child.id+index" v-for='(child, index) in child_guest'>
                        <img src="@/assets/images/icons/user-default.svg" class="mr-2" alt="" width="35" height="35" style="border-radius: 50%;">
                        <p class="mr-2 mb-0"  style="width: 80px;">{{ child.age_type }} </p>
                        <div class="position-relative">
                            <select name="" id="" class='form-control mr-2'
                                v-model='child.title'  @change='titleValidation(child, index)' style="width: 100px; -webkit-appearance: none; padding-right: 20px;">
                                <option :key="idx" v-for='(title, idx) in title' :value="title.title" >
                                    {{ title.title }}</option>
                            </select>
                            <i class="fas fa-chevron-down position-absolute" style="top: 10px; right: 15px"></i>
                        </div>
                        <input type="text" v-model="child.name" class="form-control mr-2" placeholder="Guest Name" style="width: 300px;">
                        <input type="text" v-model="child.note" class="form-control" placeholder="Notes (optional)">
                        <button class="btn p-0" @click='child_guest.splice(index, 1)'>
                            <img src="" alt="">
                        </button>
                    </div>
                    <div class="d-flex flex-row align-items-center pt-2 px-3" :key="infant.id+index" v-for='(infant, index) in infant_guest'>
                            <img src="@/assets/images/icons/user-default.svg" class="mr-2" alt="" width="35" height="35" style="border-radius: 50%;">
                        <p class="mr-2 mb-0"  style="width: 80px;">{{ infant.age_type }}</p>
                        <div class="position-relative">
                            <select name="" id="" class='form-control mr-2'
                                v-model='infant.title'  @change='titleValidation(infant, index)' style="width: 100px; -webkit-appearance: none; padding-right: 20px;">
                                <option :key="idx" v-for='(title, idx) in title' :value="title.title" >
                                    {{ title.title }}</option>
                            </select>
                            <i class="fas fa-chevron-down position-absolute" style="top: 10px; right: 15px"></i>
                        </div>
                        <input type="text" v-model="infant.name" class="form-control mr-2" placeholder="Guest name" style="width: 300px;">
                        <input type="text" v-model="infant.note" class="form-control" placeholder="Notes (Optional)">
                        <div @click='infant_guest.splice(index, 1)'>
                            <img src="" alt="">
                        </div>
                    </div>
                </div> 
            </div>
        </b-modal>    
    </div>
</template>

<script>
export default {
    name: "AddPassengerModal",
    props: [
        "modal_passenger_is_open",
        "travelers",
        "user",
    ],
    data() {
        return {
            isEmployeeSearchLoading: false,
            searchQuery: null,
            guest_is_open: false,
            passenger_selected: [],
            passengerList: [],
            title: [
                { title: 'Mr' },
                { title: 'Ms' },
                { title: 'Mrs' },
                { title: 'Mstr' },
                { title: 'Miss' },
            ],
            adult_guest: [],
            infant_guest: [],
            child_guest: [],
        }
    },
    methods: {
        closeModal: function () {
            // this.$emit('update:modal_passenger_is_open')
            // this.$root.$emit('bv::hide::modal', 'modal-lg', '#btnShow')
            this.$refs['passengerModal'].hide()
        },
        searchPassenger: function () {

        },
        addGuest: function (prop) {
            let passengerList = this.passenger_selected
            if  (this.guest_is_open == true) { 
                passengerList = this.passenger_selected.concat(this.adult_guest, this.child_guest, this.infant_guest)
            }
            if (prop == "childInc" || prop == "adultInc" || prop == "infantInc") {
                if (passengerList.length + this.travelers.length > 6) {
                    alert('Maximal travelers is 7')
                } else {
                    if (prop == "adultInc") {
                        this.adult_guest.push({
                            id: "adlt",
                            image: '',
                            age_type: 'adult',
                            title: '',
                            name: '',
                            note: '',
                        })
                    } 
                    if (prop == "infantInc") {
                            console.log(this.infant_guest)
                        if (this.infant_guest.length >= this.adult_guest.length) {
                            // $.oc.flashMsg({ text: 'Total infant must be below total adult', class: 'error' })
                        } else {
                            this.infant_guest.push({
                                 id: 'infnt',
                                image: '',
                                age_type: 'infant',
                                title: '',
                                name: '',
                                note: '',
                            })
                        }
                    } 
                    if (prop == "childInc") {
                        this.child_guest.push({
                            id: 'chld',
                            image: '',
                            age_type: 'child',
                            title: '',
                            name: '',
                            note: '',
                        })
                    }
                }
            }  else if (prop == "childDec" || prop == "adultDec" || prop == "infantDec") {
                if (prop == "childDec") {
                    this.child_guest.splice(null,1)
                } else if (prop == "infantDec") {
                    this.infant_guest.splice(null,1)
                } else if (prop == "adultDec")  {
                    this.adult_guest.splice(null,1)
                }
            }
        },
        savePassengerList: function () {
            let passengerList = this.passenger_selected

            if  (this.guest_is_open == true) { 
                passengerList = this.passenger_selected.concat(this.adult_guest, this.child_guest, this.infant_guest)
            }

            if (passengerList.length + this.travelers.length > 7) {
                alert('Maximal travelers is 7')
                // $.oc.flashMsg({ text: 'Maximal travelers is 7', class: 'error' })
            } else {
                if (this.travelers.length == 0 && this.adult_guest.length == 0  && this.child_guest.length == 0  && this.infant_guest.length == 0) {
                    this.travelers = [...passengerList]
                } else {
                    passengerList.forEach(passenger => {
                        if (passenger.name == this.user.name) {
                            this.travelers.push(this.user)
                        } else if (passenger.name !== "") {
                            this.travelers.push(passenger)
                        } else {
                            this.travelers.push(passenger)

                        }
                    })
                }
                // this.travelers.filter(data => (data.employee_id == this.user.employee_id)).length > 0 ? this.add_me = true : this.add_me = false
                this.passenger_selected = []
                this.guest_is_open = false
                this.passengerList = []
                this.adult_guest = []
                this.child_guest = []
                this.infant_guest = []

                this.closeModal()
            }
        },
        titleValidation: function (data) {
            setTimeout(() => {
                if (data.age_type == 'adult') {
                    if (data.title == 'Mr' || data.title == 'Ms' || data.title == 'Mrs') return
                    // $.oc.flashMsg({ text: 'Your title does not match with the current age', class: 'error' })
                    alert('Your title does not match with the current age')
                } else {
                    if (data.title == 'Mstr' || data.title == 'Miss') return 
                    // $.oc.flashMsg({ text: 'Your title does not match with the current age', class: 'error' })
                    alert('Your title does not match with the current age')

                }
            }, 100);
        }

    }
}
</script>

<style scope lang="scss">
    #passenger-modal {
        border-radius: 10px;
        .add-guest-passengers {
            padding: 10px 0px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-radius: 0px 0px 10px 10px;
            p {
                font-size: 14px;
            }
            input[type=number] {
                width: 40px;
                margin: 0px 4px;
                border: 0px;
                outline: none;
                text-align: end;
            }

            label {
                font-size: 14px;
            }

            button {
                border-radius: 50%;
                width: 25px;
                height: 25px;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
            }
        }

        .modal-header {
            background-color: transparent;
            border-bottom: 1px solid lighten($color: $primary, $amount: 35);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            // padding-bottom: 0px;
            align-items: center;

            h3 {
                font-size: 24px;
                color: $primary;
                font-weight: bold;
            }
        }

        .modal-body {
            padding: 0px;
            border-bottom: 1px solid lighten($color: $primary, $amount: 35);
            p.text-primary {
                color:  $primary !important;
            }
            .passengers-container {
                width: 100%;
                padding: 9px 15px;
                border: 1px solid lighten($color: $primary, $amount: 35);
                border-radius: 5px;
                display: flex;
                flex-direction: row;
                margin-bottom: 15px;

                .passengers-selected {
                    padding: 5px;
                    display: flex;
                    flex-direction: row;
                    border-radius: 5px;
                    align-items: center;
                    background-color: $primary;

                    img {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }

                    p {
                        margin-bottom: 0px;
                        color: white;
                        font-weight: 600;
                        font-size: 14px;
                        margin-right: 5px;
                    }

                    i {
                        color: $primary;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 14px;
                    }
                }
            }

            .passenger-search {
                position: relative;

                label {
                    width: 100%;
                    padding: 5px;
                    border-radius: 5px;
                    background-color: $white;
                    display: flex;
                    flex-flow: row;
                    border: 1px solid $gray-200;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    input {
                        background-color: transparent;
                        border: 0px;
                        font-size: 14px;
                        outline: none;
                        flex-grow: 1;
                    }

                    .passengers-selected {
                        padding: 5px;
                        display: flex;
                        flex-direction: row;
                        border-radius: 5px;
                        align-items: center;
                        background-color: $primary;
                        margin-bottom: 5px;
                        img {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            margin-right: 10px;
                        }

                        p {
                            margin-bottom: 0px;
                            color: white;
                            font-weight: 600;
                            margin-right: 5px;
                        }

                        i {
                            color: $white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }

            table.passenger-table {
                width: 100%;

                tbody {
                    tr {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        border-bottom: 1px solid lighten($color: $primary, $amount: 35);

                        &:last-child {
                            border: 0px;
                        }

                        td {
                            flex: 1;
                            display: flex;
                            align-items: center;

                            img {
                                width: 25px;
                                height: 25px;
                                border-radius: 50%;
                                margin-right: 10px;
                            }

                            b {
                                font-size: 14px;
                            }
                        }
                    }
                }
            }
        }

        .guest-form {
            width: 100%;
            overflow: scroll;
            transition: all .35s ease;
            p {
                font-size: 14px;
            }

            &.guest-modal-open {
                height: 250px;
            }

            &.guest-modal-close {
                height: 0;
            }
        }

    }

</style>