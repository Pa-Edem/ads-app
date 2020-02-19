<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="text--secondary mb-3">Create new ad</h1>
				<v-form ref="form" v-model="valid" validation class="mb-3">
					<v-text-field
						label="Ad title"
						name="title"
						type="text"
						required
						v-model="title"
						:rules="[v => !!v || 'Title is required']"
					></v-text-field>
					<v-textarea
						label="Ad description"
						name="description"
						type="text"
						v-model="description"
						:rules="[v => !!v || 'Discription is required']"
					></v-textarea>
				</v-form>
				<v-layout row mb-3>
					<v-flex xs12>
						<v-btn class="warning" @click="triggerUpload">
							Upload image
							<v-icon right dark>cloud_upload</v-icon>
						</v-btn>
						<input
							ref="fileInput"
							type="file"
							style="display: none;"
							accept="image/*"
							@change="onFileChange"
						/>
					</v-flex>
				</v-layout>
				<v-layout row>
					<v-flex xs12>
						<img v-if="imgSrc" :src="imgSrc" height="100" />
					</v-flex>
				</v-layout>
				<v-layout row>
					<v-flex xs12>
						<v-switch
							color="primary"
							v-model="promo"
							label="Add to promo?"
						></v-switch>
					</v-flex>
				</v-layout>
				<v-layout row>
					<v-flex xs12>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								class="success"
								:loading="loading"
								:disabled="!valid || !image || loading"
								@click="createAd"
								>Create ad</v-btn
							>
						</v-card-actions>
					</v-flex>
				</v-layout>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			description: '',
			promo: false,
			valid: false,
			image: null,
			imgSrc: ''
		};
	},
	computed: {
		loading() {
			return this.$store.getters.loading;
		}
	},
	methods: {
		createAd() {
			if (this.$refs.form.validate() && this.image) {
				const ad = {
					title: this.title,
					description: this.description,
					promo: this.promo,
					image: this.image
				};
				this.$store
					.dispatch('createAd', ad)
					.then(() => {
						this.$router.push('/list');
					})
					.catch(() => {});
			}
		},
		triggerUpload() {
			this.$refs.fileInput.click();
		},
		onFileChange(event) {
			const file = event.target.files[0];

			const reader = new FileReader();
			reader.onload = () => {
				this.imgSrc = reader.result;
			};
			reader.readAsDataURL(file);
			this.image = file;
		}
	}
};
</script>
