<template>
	<dir class="list-travelers pl-0">
		<div class="card-travelers" :key="index" v-for="(traveler, index) in travelers">
			<div class="card-body d-flex flex-row align-items-center">
				<figure class="traveler-picture" v-if="traveler.image == ''">
					<img src="@/assets/images/icons/user-default.svg" alt />
				</figure>
				<figure class="traveler-picture" v-else>
					<img :src="traveler.image" alt />
        </figure>
				<div class="traveler-profile">
					<p>{{ traveler.title ? traveler.title + ' ' : '' }}{{ traveler.name }}</p>
					<small
						style="text-transform: capitalize;"
					>{{ traveler.employee_number != null ? traveler.employee_number : traveler.age_type }}</small>
				</div>
				<div class="traveler-division">
					<p>{{ traveler.role ? traveler.division : traveler.note }}</p>
					<small>{{ traveler.division ? traveler.role : 'Guest' }}</small>
				</div>
				<div class="btn-delete ml-auto" style="cursor: pointer;" @click="deletePassenger(index)">
					<small class="text-danger">Delete</small>
				</div>
			</div>
		</div>
	</dir>
</template>

<script>
export default {
  name: "ListTravelers",
  props: ["travelers"],
  methods: {
    deletePassenger: function(index) {
      // if (confirm("Do you really want to delete this passenger?")) {
      //     if (travelerId) {
      //         $.request("bookings::onRemovePassengerFromBooking", {
      //             data: {
      //                 traveler_id: travelerId,
      //                 booking_id: {{ this.param.bookingId != 'new' ? this.param.bookingId : 'null' }}
      //             },
      //             success: response => {
      //                 if (index == null) return
      //                 this.travelers.splice(index, 1)
      //                 this.getPaxCount()
      //             }
      //         })
      //     } else {
      //         if (index == null) return
      //         this.travelers.splice(index, 1)
      //         this.getPaxCount()
      //     }
      // }
      this.travelers.splice(index, 1);
    }
  }
};
</script>