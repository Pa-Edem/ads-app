<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 mx-auto>
				<v-card v-if="!loading">
					<v-img :src="ad.imgSrc" height="400"></v-img>
					<v-card-title class="primary--text">{{ ad.title }}</v-card-title>
					<v-card-text class="subtitle-1">{{ ad.description }}</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<app-edit-ad-modal :ad="ad" v-if="isOwner"></app-edit-ad-modal>
						<app-buy-modal :ad="ad"></app-buy-modal>
					</v-card-actions>
				</v-card>
				<div v-else class="text-center pt-5">
					<v-progress-circular
						:size="100"
						:width="4"
						color="primary"
						indeterminate
						class="mt-5"
					></v-progress-circular>
				</div>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import EditAdModal from './EditAdModal';

export default {
	props: ['id'],
	computed: {
		ad() {
			const id = this.id;
			return this.$store.getters.adById(id);
		},
		loading() {
			return this.$store.getters.loading;
		},
		isOwner() {
			return this.ad.ownerId === this.$store.getters.user.id;
		}
	},
	components: {
		appEditAdModal: EditAdModal
	}
};
</script>
