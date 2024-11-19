<script setup lang="ts">
import { ref } from 'vue';

	const form = ref({
		name: "",
		email: "",
		cpf: "",
		password: "",
		isPassenger: false
	});
	const accountId = ref("");
	const status = ref("");
	const message = ref("");

	function fill () {
		form.value.name = "John Doe";
        form.value.email = `john.doe${Math.random()}@gmail.com`;
        form.value.cpf = "97456321558";
        form.value.password = "123456";
        form.value.isPassenger = true;
	}

	async function signup () {
		const response = await fetch("http://localhost:3000/signup", {
			method: "POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(form.value)
		});
		const output = await response.json();
		if (output.accountId) {
			accountId.value = output.accountId;
			status.value = "success";
		} else {
			message.value = output.message;
			status.value = "error";
		}
		
		
	}
</script>

<template>
	<div>
		<input class="input-name" type="text" placeholder="Name" v-model="form.name"/>
	</div>
	<div>
		<input class="input-email" type="text" placeholder="Email" v-model="form.email"/>
	</div>
	<div>
		<input class="input-cpf" type="text" placeholder="Cpf" v-model="form.cpf"/>
	</div>
	<div>
		<input class="input-password" type="text" placeholder="Password" v-model="form.password"/>
	</div>
	<div>
		<input class="input-is-passenger" type="checkbox" v-model="form.isPassenger"/> Passenger
	</div>
	<br/>
	{{ form }}
	<br/>
	{{ accountId }}
	<br/>
	<span class="span-status">{{ status }}</span>
	<br/>
	<span class="span-message">{{ message }}</span>
	<br/>
	<div>
		<button class="button-signup" @click="signup()">Signup</button>
		<button @click="fill()">Fill</button>
	</div>
</template>

<style scoped>
</style>
