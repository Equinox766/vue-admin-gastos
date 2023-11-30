<script setup>
import { ref } from 'vue';
import Alert from './Alert.vue';

const presupuesto = ref(0);
const error = ref('');

const emit = defineEmits(['definir-presupuesto']);

const definirPresupuesto = () => {
  if (presupuesto.value <= 0 || presupuesto.value === '') {
    error.value = 'presupuesto no valido';
    setTimeout(() => {
      error.value = '';
    }, 3000);
    return;
  }
  emit('definir-presupuesto', presupuesto.value);
}
</script>

<template>
  <form
      class="presupuesto"
      @submit.prevent="definirPresupuesto"
  >
    <Alert v-if="error">
      {{ error }}
    </Alert>
    <div class="campo">
      <label for="nuevo-presupuesto">Definir Presupuesto</label>
      <input id="nuevo-presupuesto" type="number" class="nuevo-presupuesto" placeholder="Añade tu presupuesto" min="0"
             v-model.number="presupuesto"/>
    </div>
    <input type="submit" value="Definir Presupuesto"/>
  </form>
</template>

<style scoped>
.presupuesto {
  width: 100%;
}

.campo {
  display: grid;
  gap: 2rem;
}

.presupuesto label {
  font-size: 2.2rem;
  text-align: center;
  color: var(--blue);
}

.presupuesto input[type="number"] {
  background-color: var(--gray-soft);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
  text-align: center;
}

.presupuesto input[type="submit"] {
  background-color: var(--blue);
  border: none;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
  color: var(--white);
  font-weight: 900;
  width: 100%;
  transition: background-color 300ms ease;
}

.presupuesto input[type="submit"]:hover {
  background-color: #1048a4;
  cursor: pointer;
}

</style>