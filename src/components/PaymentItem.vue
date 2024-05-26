  <script setup lang="ts">
  import { ref } from 'vue';
  
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

  const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Austrian Empire*', 'Azerbaijan', 'Baden*', 'Bahamas, The', 'Bahrain',
  'Bangladesh', 'Barbados', 'Bavaria*', 'Belarus', 'Belgium', 'Belize', 'Benin (Dahomey)', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Brunswick and Lüneburg*', 'Bulgaria',
  'Burkina Faso (Upper Volta)', 'Burma', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
  'Cayman Islands, The', 'Central African Republic', 'Central American Federation*', 'Chad', 'Chile',
  'China', 'Colombia', 'Comoros', 'Congo Free State, The*', 'Costa Rica', 'Cote d’Ivoire (Ivory Coast)',
  'Croatia', 'Cuba', 'Cyprus', 'Czechia', 'Czechoslovakia*', 'Democratic Republic of the Congo',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Duchy of Parma, The*', 'East Germany (German Democratic Republic)*',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Federal Government of Germany (1848-49)*', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The',
  'Georgia', 'Germany', 'Ghana', 'Grand Duchy of Tuscany, The*', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
  'Guinea-Bissau', 'Guyana', 'Haiti', 'Hanover*', 'Hanseatic Republics*', 'Hawaii*', 'Hesse*', 'Holy See',
  'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kingdom of Serbia/Yugoslavia*', 'Kiribati',
  'Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Lew Chew (Loochoo)*',
  'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mecklenburg-Schwerin*',
  'Mecklenburg-Strelitz*', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
  'Mozambique', 'Namibia', 'Nassau*', 'Nauru', 'Nepal', 'Netherlands, The', 'New Zealand', 'Nicaragua',
  'Niger', 'Nigeria', 'North German Confederation*', 'North German Union*', 'North Macedonia', 'Norway',
  'Oldenburg*', 'Oman', 'Orange Free State*', 'Pakistan', 'Palau', 'Panama', 'Papal States*', 'Papua New Guinea',
  'Paraguay', 'Peru', 'Philippines', 'Piedmont-Sardinia*', 'Poland', 'Portugal', 'Qatar', 'Republic of Genoa*',
  'Republic of Korea (South Korea)', 'Republic of the Congo', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis',
  'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
  'Schaumburg-Lippe*', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
  'Solomon Islands, The', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden',
  'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Texas*', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga',
  'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Two Sicilies*', 'Uganda', 'Ukraine',
  'Union of Soviet Socialist Republics*', 'United Arab Emirates, The', 'United Kingdom, The', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Venezuela', 'Vietnam', 'Württemberg*', 'Yemen', 'Zambia', 'Zimbabwe'
];
  
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
  </script>
<template>
    <div class="payment-container">
      <v-form v-model="valid">
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
                <!-- <v-col md="8"></v-col> -->
                <button class="continue">Continue with the Payment</button>
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