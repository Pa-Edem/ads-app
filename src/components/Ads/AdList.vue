<template>
	<v-container>
		<v-layout row v-if="!loading && myAds.length !== 0">
			<v-flex xs12 sm8 offset-sm2>
				<h1 class="primary--text mb-3">My ads</h1>
				<v-card class="elevation-10 mb-5" v-for="ad in myAds" :key="ad.id">
					<v-layout row py-1 px-4>
						<v-flex xs4>
							<v-img :src="ad.imgSrc" height="175"></v-img>
						</v-flex>
						<v-flex xs8>
							<v-card-title class="headline primary--text">
								{{ ad.title }}
							</v-card-title>
							<v-card-text class="subtitle-1">
								{{ ad.description }}
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="info" :to="'/ad/' + ad.id">Open</v-btn>
							</v-card-actions>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
		<v-layout row v-else-if="!loading && myAds.length === 0">
			<v-flex xs12 sm8 offset-sm2>
				<h1 class="primary--text mb-3">My ADS</h1>
			</v-flex>
		</v-layout>
		<v-layout row v-else>
			<div class="text-center pt-5">
				<v-progress-circular
					:size="100"
					:width="4"
					color="primary"
					indeterminate
					class="mt-5"
				></v-progress-circular>
			</div>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	computed: {
		myAds() {
			return this.$store.getters.myAds;
		},
		loading() {
			return this.$store.getters.loading;
		}
	}
};
</script>
