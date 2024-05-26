<script setup lang="ts">
import { ref } from 'vue';
    const items = ref([
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Austrian Empire*",
  "Azerbaijan",
  "Baden*",
  "Bahamas, The",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Bavaria*",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin (Dahomey)",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Brunswick and Lüneburg*",
  "Bulgaria",
  "Burkina Faso (Upper Volta)",
  "Burma",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands, The",
  "Central African Republic",
  "Central American Federation*",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo Free State, The*",
  "Costa Rica",
  "Cote d’Ivoire (Ivory Coast)",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Czechoslovakia*",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Duchy of Parma, The*",
  "East Germany (German Democratic Republic)*",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Federal Government of Germany (1848-49)*",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia, The",
  "Georgia",
  "Germany",
  "Ghana",
  "Grand Duchy of Tuscany, The*",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Hanover*",
  "Hanseatic Republics*",
  "Hawaii*",
  "Hesse*",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kingdom of Serbia/Yugoslavia*",
  "Kiribati",
  "Korea",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Lew Chew (Loochoo)*",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mecklenburg-Schwerin*",
  "Mecklenburg-Strelitz*",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nassau*",
  "Nauru",
  "Nepal",
  "Netherlands, The",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North German Confederation*",
  "North German Union*",
  "North Macedonia",
  "Norway",
  "Oldenburg*",
  "Oman",
  "Orange Free State*",
  "Pakistan",
  "Palau",
  "Panama",
  "Papal States*",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Piedmont-Sardinia*",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of Genoa*",
  "Republic of Korea (South Korea)",
  "Republic of the Congo",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Schaumburg-Lippe*",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands, The",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Texas*",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Two Sicilies*",
  "Uganda",
  "Ukraine",
  "Union of Soviet Socialist Republics*",
  "United Arab Emirates, The",
  "United Kingdom, The",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Württemberg*",
  "Yemen",
  "Zambia",
  "Zimbabwe"
]);

</script>

<template>
    <div class="card">
        <img src="/src/assets/cyber_site.jpg" alt="Descripción de la imagen" class="card-image">
        <div class="card-content">
            <div class="card-column">
                <div class="card-username">
                    <p class="username-title">Name</p>
                    <h2 class="username-subtitle">TStudios</h2>
                </div>
                <div class="card-name">
                    <p class="name-title">Fundation</p>
                    <h2 class="name-subtitle">23/04/1998</h2>
                </div>
                <div class="card-name">
                    <p class="name-title">Country</p>
                    <h2 class="name-subtitle">Spain</h2>
                </div>
                <div class="card-name">
                    <p class="name-title">Website</p>
                    <h2 class="name-subtitle">https://tstudios.com</h2>
                </div>
            </div>
            <div class="card-column">
                <div class="card-email">
                    <p class="email-title">Email-Contact</p>
                    <h2 class="email-subtitle">tstudios@gmail.com</h2>
                </div><div class="card-email">
                    <p class="email-title">Email-Login</p>
                    <h2 class="email-subtitle">admin@tstudios.com</h2>
                </div>
                <div class="card-phone">
                    <p class="phone-title">Password</p>
                    <h2 class="phone-subtitle">Contraseña</h2>
                </div>
            </div>
        </div>
        <button class="card-button">Cambiar Datos</button>
    </div>
</template>
<style scoped>
.card {
    position: relative;
    display: flex;
    align-items: flex-start; /* Alinea los elementos a la parte superior */
    width: 80%;
    height: 390px;
    left: 10%;
    margin-top: 40px;
    margin-bottom: 40px;
    background: linear-gradient(to right, var(--color-black), var(--color-dark-blue), var(--color-blue));
    border-radius: 20px;
    overflow: hidden; /* Oculta el botón si se desborda de la tarjeta */
}

.card-image {
    width: 20%; /* Ajusta el ancho de la imagen según tu preferencia */
    height: 60%;
    border-radius: 20px;
    margin-left: 3%;
    margin-top: 6%;
}

.card-content {
    display: flex;
    flex-direction: row; /* Coloca los elementos en una fila */
    justify-content: space-between; /* Distribuye espacio equitativamente */
    padding: 20px;
    flex-grow: 1; /* Permite que el contenedor crezca para ocupar el espacio disponible */
}

.card-column {
    display: flex;
    flex-direction: column; /* Coloca los elementos en una columna */
    justify-content: space-between;
    margin-right: 20px; /* Añade espacio entre las dos columnas */
}

.username-title,
.name-title,
.email-title,
.phone-title {
    margin-top: 20px;
    color: var(--color-gray);
    font-family: var(--font-orbitron);
}

.username-subtitle,
.name-subtitle,
.email-subtitle,
.phone-subtitle {
    margin: 0;
    color: var(--neutral-colors-white);
    font-family: var(--font-archivo-black);
}

.card-button {
    position: absolute; /* Posiciona el botón absolutamente */
    bottom: 20px; /* Ajusta la distancia desde la parte inferior */
    right: 20px; /* Ajusta la distancia desde la derecha */
    background-color: var(--color-black); /* Ajusta el color del botón según tu preferencia */
    color: var(--neutral-colors-white); /* Ajusta el color del texto del botón según tu preferencia */
    border: none;
    padding: 10px 20px; /* Ajusta según tu preferencia */
    border-radius: 5px; /* Ajusta según tu preferencia */
    cursor: pointer;
    outline: none;
    font-family: var(--font-roboto);
}
</style>
