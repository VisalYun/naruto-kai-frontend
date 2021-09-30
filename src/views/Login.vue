<template>
  <div class="login">
    <div class="login-container">
      <base-section title="Login">
        <form @submit.prevent="login">
          <base-form-input label="Username:">
            <input type="text" v-model="username" />
          </base-form-input>
          <p v-if="username == ''">Username must not be empty</p>

          <base-form-input label="Password:">
            <input type="password" v-model="password" />
          </base-form-input>
          <p v-if="password == ''">Password must not be empty</p>

          <div class="action">
            <h4 v-if="error">{{ error }}</h4>
            <base-button v-if="!loading" :isLink="false" :width="10"
              >Login</base-button
            >
            <h4 v-else>Loading...</h4>
          </div>
        </form>
      </base-section>
    </div>
  </div>
</template>

<script>
import BaseFormInput from "../components/ui/BaseFormInput.vue";

export default {
  components: {
    BaseFormInput,
  },
  data() {
    return {
      username: null,
      password: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    validateInput() {
      if (
        !this.username ||
        this.username == "" ||
        !this.password ||
        this.password == ""
      ) {
          this.error = "Please fix the above input error!"
      }
      return;
    },
    async login() {
        this.loading = true
        this.error = null

        this.validateInput()
        if(this.error){
            return;
        }

        const user = {
            name: this.username,
            password: this.password
        }
        try{
            await this.$store.dispatch("users/login", user);
            this.loading = false
            this.$router.replace('/admin')
        }catch(ex){
            this.loading = false
            this.error = ex.message
        }
    },
  },
};
</script>

<style scoped>
.login {
  margin: 1em;
}
form {
  width: 75%;
  margin: 0 auto;
}
form .form-control input {
  flex: 10;
  font-size: 1.2em;
  padding: 0.2em;
  background-color: inherit;
  border: 1px solid #000;
  outline: none;
}
form p {
  color: #f00;
}
form .action {
  width: 75%;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 767px) {
  form {
    width: 100%;
  }
  form .form-control input {
    width: 100%;
  }
}
</style>