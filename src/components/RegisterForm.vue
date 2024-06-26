<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useApiStore, pinia } from '../store/api';
import {jwtDecode} from 'jwt-decode';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

function proveExistingUser(values: any) {
    fetchPostUser(values);
    handleReset();
    handleDateReset();
}

// Home
const router = useRouter();
const navigateToHome = async () => {
    router.push({ name: 'store' });
    setTimeout(() => {
        window.location.reload();
    }, 10);
};

// Clean datefield when registered
const handleDateReset = () => {
    const text = document.querySelector("#textDateField") as HTMLInputElement | HTMLTextAreaElement | null;
    if (text !== null) {
        text.value = "";
    }
};

const fetchPostUser = async (values: any) => {
    try {
        const userDTO = {
            name: values.name,
            surname: values.surname,
            password: values.passwd,
            age: values.age,
            email: values.email,
            registerDate: values.registeredDate,
            role: "user"
        };

        const token = await useApiStore(pinia).fetchPostRegisterUser(userDTO);

        if (token === 'User already exists') {
            alert(token);
        } else {
            localStorage.setItem('jwtToken', token!);
            localStorage.setItem('messageLiked', '');
            await postUpdateTables();
            alert('User registered correctly');
            setTimeout(() => {
                navigateToHome();
            }, 1000);
        }
    } catch (err) {
        console.error(err);
    }
};

const postUpdateTables = async () => {
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(token) as { id: number };
    await postLibraryCart(decodedToken.id);
    await updateUserIds(decodedToken.id);
};

async function postLibraryCart(userId: any) {
    const libraryUserDTO = {
        addedDate: Date.now,
        userID: userId
    };
    const cartUserDTO = {
        userID: userId,
        total : 0,
        fechaCreacion : new Date().toISOString()
    };
  await  useApiStore(pinia).fetchPostLibraryGameUser(libraryUserDTO);
  await  useApiStore(pinia).fetchPostShoppingCart(cartUserDTO);
}

async function updateUserIds(userId: any) {
    const objectIds = {
        libraryGameUserID: userId
    };
   await useApiStore(pinia).fetchUpdateUser(userId, objectIds);
}

const fetchGetUser = async (values: any) => {
    try {
        proveExistingUser(values);
    } catch (err) {
        console.error(err);
    }
};

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        name(value: any) {
            if (value?.length >= 2) return true;
            return 'Name needs to be at least 2 characters.';
        },
        surname(value: any) {
            if (value?.length >= 2) return true;
            return 'Surname needs to be at least 2 characters.';
        },
        birthDate(value: any) {
            return true;
        },
        email(value: any) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;
            return 'Must be a valid e-mail.';
        },
        checkbox(value: any) {
            if (value === '1') return true;
            return 'Must be checked.';
        },
        passwd(value: any) {
            if (/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s])/.test(value) && value.length >= 7) return true;
            return 'Password must contain at least 1 number, 1 letter, 1 symbol & have more than 7 characters';
        },
    },
});

const name = useField('name');
const surname = useField('surname');
const email = useField('email');
const checkbox = useField('checkbox');
const passwd = useField('passwd');
const visible = ref(false);

const birthDate = ref<Date | null>(null);
const formattedDate = ref<string | null>(null);
const menu = ref(false);

const maxDate = computed(() => {
    const today = new Date();
    const maxYear = today.getFullYear() - 12;
    const maxMonth = today.getMonth() + 1;
    const maxDay = today.getDate();
    return `${maxYear}-${maxMonth < 10 ? '0' + maxMonth : maxMonth}-${maxDay < 10 ? '0' + maxDay : maxDay}`;
});

const minDate = computed(() => {
    const today = new Date();
    const minYear = today.getFullYear() - 100;
    const minMonth = today.getMonth() + 1;
    const minDay = today.getDate();
    return `${minYear}-${minMonth < 10 ? '0' + minMonth : minMonth}-${minDay < 10 ? '0' + minDay : minDay}`;
});

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

watch(birthDate, (newVal) => {
    if (newVal) {
        formattedDate.value = formatDate(newVal);
    }
});

function calcAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const age = ref<number | null>(null);

const submit = handleSubmit((values) => {
    localStorage.setItem('studioLogged', JSON.stringify(null));
    if (birthDate.value) {
        formattedDate.value = formatDate(birthDate.value);
        age.value = calcAge(birthDate.value);
        values.age = age.value;
        values.registeredDate = formattedDate.value;
        fetchGetUser(values);
    }
    
    if(!birthDate.value){
      alert('Date of birth field is missing');
    }
});

const openMenu = () => {
    menu.value = true;
};

const closeMenu = () => {
    menu.value = false;
};

const saveDate = () => {
    if (birthDate.value) {
        formattedDate.value = formatDate(birthDate.value);
    }
    menu.value = false;
};

const resetFields = () => {
    birthDate.value = null;
    formattedDate.value = null;
    age.value = null;
    visible.value = false;
    menu.value = false;
};

const handleClear = () => {
    resetFields();
    handleReset();
};

submit;
</script>



<template>
  <form @submit.prevent="submit">
      <label for="chk" aria-hidden="true">Register</label>
      <v-text-field
          v-model="name.value.value"
          :counter="10"
          :error-messages="name.errorMessage.value"
          label="Name"
          placeholder="Paco"
      ></v-text-field>

      <v-text-field
          v-model="surname.value.value"
          :counter="40"
          :error-messages="surname.errorMessage.value"
          label="Surname"
          placeholder="Fernandez Domingo"
      ></v-text-field>

      <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Email"
          placeholder="email@example.com"
      ></v-text-field>

      <v-text-field
          v-model="passwd.value.value"
          :error-messages="passwd.errorMessage.value"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="Password"
          placeholder="Introduce your password"
          @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y>
          <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="formattedDate"
                  label="Date of birth"
                  readonly
                  id="textDateField"
                  v-bind="attrs"
                  v-on="on"
                  @click="openMenu"
              ></v-text-field>
          </template>
          <v-date-picker v-model="birthDate" :max="maxDate" :min="minDate" color="secondary">
              <template v-slot:actions>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="saveDate">OK</v-btn>
              </template>
          </v-date-picker>
      </v-menu>

      <v-checkbox
          v-model="checkbox.value.value"
          :error-messages="checkbox.errorMessage.value"
          value="1"
          label="Accept the Terms of Policy and Privacy"
          type="checkbox"
      ></v-checkbox>

      <div class="buttons">
          <v-btn class="me-4" type="submit">Register</v-btn>
          <v-btn @click="handleClear" class="clear" id="regClear">Clear</v-btn>
      </div>
      <RouterLink to="/studioRegister" class="custom-link">Are you a Studio?</RouterLink>
  </form>
</template>

<style scoped>
form {
    margin-bottom: 20px;
    width: 500px;
    max-width: 400px;
    padding: 20px;
    background-image: linear-gradient(var(--color-yellow), var(--color-dark-blue));
    color: white;
    height: 700px;
}

label {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    color: var(--neutral-colors-white);
    font-size: var(--font-size-25xl);
    font-family: var(--font-orbitron);
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
}

.buttons {
    display: flex;
    justify-content: center;
}

.me-4 {
    background: linear-gradient(to right, #ecfe94, #56ccf2);
    color: black;
}

.clear {
    background: linear-gradient(to right, #450054, #db0606);
    color: white;
}

::v-deep .v-selection-control__input input {
    opacity: 1;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
}

.v-date-picker {
    width: 400px;
    margin-left: 100%;
    margin-top: 50%;
}

.centered-menu {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.custom-link {
    font-style: italic;
    display: block;
    text-align: center;
    margin-top: 10px;
    color: var(--color-blue);
}
</style>
