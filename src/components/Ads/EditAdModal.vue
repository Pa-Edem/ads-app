<template>
	<v-dialog width="400" v-model="modal">
		<template v-slot:activator="{ on }">
			<v-btn class="warning" v-on="on">Edit</v-btn>
		</template>
		<v-card>
			<v-container>
				<v-layout row>
					<v-flex xs12>
						<v-card-title class="display-1 primary--text">
							Edit Ad
						</v-card-title>
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
				<v-layout row>
					<v-flex xs12>
						<v-card-text>
							<v-text-field
								label="Title"
								name="title"
								type="text"
								v-model="editedTitle"
							></v-text-field>
							<v-textarea
								label="Description"
								name="description"
								type="text"
								v-model="editedDescription"
							></v-textarea>
						</v-card-text>
					</v-flex>
				</v-layout>
				<v-layout row>
					<v-flex xs12>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn @click="onCancel">Cancel</v-btn>
							<v-btn color="success" @click="onSave">Save</v-btn>
						</v-card-actions>
					</v-flex>
				</v-layout>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['ad'],
	data() {
		return {
			modal: false,
			editedTitle: this.ad.title,
			editedDescription: this.ad.description
		};
	},
	methods: {
		onCancel() {
			this.editedTitle = this.ad.title;
			this.editedDescription = this.ad.description;
			this.modal = false;
		},
		onSave() {
			if (this.editedDescription !== '' && this.editedTitle !== '') {
				this.$store.dispatch('updateAd', {
					title: this.editedTitle,
					description: this.editedDescription,
					id: this.ad.id
				});
				this.modal = false;
			}
		}
	}
};
</script>
