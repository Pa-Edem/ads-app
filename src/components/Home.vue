<template>
	<div>
		<div v-if="!loading">
			<v-container fluid>
				<v-layout row>
					<v-flex xs12>
						<v-carousel :cycle="true" :show-arrows="false">
							<v-carousel-item
								v-for="ad of promoAds"
								:key="ad.id"
								:src="ad.imgSrc"
							>
								<div class="carousel-link">
									<v-btn text outlined x-large :to="'/ad/' + ad.id">{{
										ad.title
									}}</v-btn>
								</div>
							</v-carousel-item>
						</v-carousel>
					</v-flex>
				</v-layout>
			</v-container>
			<v-container grid-list-lg>
				<v-layout row wrap>
					<v-flex xs12 sm6 md4 v-for="a of ads" :key="a.id">
						<v-card>
							<v-img :src="a.imgSrc" height="200px"></v-img>
							<v-card-title>{{ a.title }}</v-card-title>
							<v-card-text class="subtitle-1">{{ a.description }}</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn outlined :to="'/ad/' + a.id">Open</v-btn>
								<app-buy-modal :ad="a"></app-buy-modal>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
		<div v-else>
			<v-container>
				<v-layout row>
					<v-flex xs12 class="text-center pt-5">
						<v-progress-circular
							:size="100"
							:width="4"
							color="primary"
							indeterminate
							class="mt-5"
						></v-progress-circular>
					</v-flex>
				</v-layout>
			</v-container>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		ads() {
			return this.$store.getters.ads;
		},
		promoAds() {
			return this.$store.getters.promoAds;
		},
		loading() {
			return this.$store.getters.loading;
		}
	}
};
</script>

<style scoped>
.carousel-link {
	position: absolute;
	bottom: 75px;
	left: 50%;
	transform: translate(-50%, 0);
	background: rgba(0, 0, 0, 0.5);
}
</style>
