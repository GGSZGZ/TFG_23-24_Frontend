<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';

const user = ref(null);
const token = localStorage.getItem('jwtToken');
const decodedToken = jwtDecode(token!) as { id: number };

onMounted(async () => {
  try {
    const userData = await useApiStore(pinia).fetchUser(decodedToken.id);
    user.value = userData;
    name.value = userData.name;
    surname.value = userData.surname;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
});

const valid = ref(false);
const cardNumber = ref('');
const expirationDate = ref('');
const securityNumber = ref('');
const name = ref('');
const surname = ref('');
const location = ref('');
const billingAddress = ref('');
const postalCode = ref('');
const country = ref('');
const phoneNumber = ref('');
const countries = ref([]);

async function loadCountries() {
  try {
    const response = await fetch('/src/assets/countries.json');
    if (!response.ok) {
      throw new Error('Error al cargar las categorías: ' + response.statusText);
    }
    const data = await response.json();
    countries.value = data.countries;
  } catch (error) {
    console.error(error);
  }
}

const cardNumberRules = [
  (v: string) => !!v || 'Card Number is required',
  (v: string) => /^\d{16}$/.test(v) || 'Card Number must be 16 digits',
];

const expirationDateRules = [
  (v: string) => !!v || 'Expiration Date is required',
  (v: string) => /^\d{2}\/\d{2}$/.test(v) || 'Expiration Date must be in MM/YY format',
];

const securityNumberRules = [
  (v: string) => !!v || 'Security Number is required',
  (v: string) => /^\d{3,4}$/.test(v) || 'Security Number must be 3 or 4 digits',
];

const nameRules = [
  (v: string) => !!v || 'Name is required',
];

const surnameRules = [
  (v: string) => !!v || 'Surname is required',
];

const locationRules = [
  (v: string) => !!v || 'Location is required',
];

const billingAddressRules = [
  (v: string) => !!v || 'Billing Address is required',
];

const postalCodeRules = [
  (v: string) => !!v || 'Postal Code is required',
  (v: string) => /^\d{5}$/.test(v) || 'Postal Code must be 5 digits',
];

const countryRules = [
  (v: string) => !!v || 'Country is required',
];

const phoneNumberRules = [
  (v: string) => !!v || 'Phone Number is required',
  (v: string) => /^\d{10}$/.test(v) || 'Phone Number must be 10 digits',
];

loadCountries();

async function saveUserGames() {
  let games = await useApiStore(pinia).fetchGamesShoppingCart(decodedToken.id);

  for (const gameCart of games) {
    try {
      await useApiStore(pinia).fetchPostGameLibraryGameUser(decodedToken.id, gameCart.gameID );
      await useApiStore(pinia).fetchDeleteGameShoppingCart(decodedToken.id, gameCart.gameID);
    } catch (error) {
      console.error('Error processing game:', error);
    }
  }
  alert('Congratulations payment accepted');
  navigateToHome();
}

const router = useRouter();
const navigateToHome = async () => {
  console.log('llevame a home');
  await router.push({ name: 'store' });
};


function confirmAndPay() {
  if (valid.value) {
    saveUserGames();
  } else {
    alert('Missing fields')
  }
}
</script>

<template>
  <div class="payment-container">
    <v-form v-model="valid" @submit.prevent>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="cardNumber"
              :counter="16"
              :rules="cardNumberRules"
              label="Card Number"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="expirationDate"
              :counter="5"
              :rules="expirationDateRules"
              label="Expiration Date(Ej: 11/26)"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="securityNumber"
              :counter="4"
              :rules="securityNumberRules"
              label="Security Number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <div class="title-form">Billing Information</div>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="surname"
              :rules="surnameRules"
              label="Surname"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="location"
              :rules="locationRules"
              label="Location"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="billingAddress"
              :rules="billingAddressRules"
              label="Billing Address"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="postalCode"
              :rules="postalCodeRules"
              label="Postal Code"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-select
                v-model="country"
                :items="countries"
                :rules="countryRules"
                label="Country"
                required
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="phoneNumber"
              :rules="phoneNumberRules"
              label="Phone Number"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row class="d-flex justify-content-end">
          <button class="continue" @click="confirmAndPay">Confirm and Pay</button>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

  
  <style scoped>
  .title-form {
    font-weight: bold;
    font-size: 30px;
    margin-left: 20px;
    font-family: var(--font-archivo-black);
  }
  .payment-container {
    background-color: var(--color-blue);
    margin-left: 22px;
    margin-right: 10px;
    border-radius: 10px;
  }

  .continue{
    background-color: var(--color-yellow);
    font-family: var(--font-roboto);
    padding: 10px;
    margin-left: 70%;
    width: 200px;
    margin-right: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  </style>