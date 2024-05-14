<script setup>
  import { ref, reactive, watch, computed, onMounted } from 'vue'
  import Presupuesto from './components/Presupuesto.vue'
  import ControlPresupuesto from './components/ControlPresupuesto.vue'
  import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'
  import Modal from './components/Modal.vue'
  import Filter from './components/Filter.vue'
  import Gasto from './components/Gasto.vue'
  import { generateId } from './helpers'

  const modal = reactive({
    mostrar: false,
    animar: false
  })

  const presupuesto = ref(0);
  const disponible = ref(0);
  const gastado = ref(0);
  const filter = ref('')

  const gasto = reactive({
    nombre: '',
    cantidad: '',
    categoria: '',
    id: null,
    fecha: Date.now()
  })

  const gastos = ref([])

  watch(gastos, () => {
    const totalGastado = gastos.value.reduce((total, gasto) => gasto.cantidad + total, 0)
    gastado.value = totalGastado
    disponible.value = presupuesto.value - totalGastado
    localStorage.setItem('gastos', JSON.stringify(gastos.value))
  }, {
    deep: true
  })

  watch(modal, () => {
    if (!modal.mostrar) {
      resetStateGasto()
    }
  }, {
    deep: true
  })

  watch(presupuesto, () => {
   localStorage.setItem('presupuesto', presupuesto.value) 
  })

  onMounted(() => {
    const presupuestoStorage = localStorage.getItem('presupuesto')
    const gastosStorage = localStorage.getItem('gastos')

    if(presupuestoStorage) {
      presupuesto.value = Number(presupuestoStorage)
      disponible.value = Number(presupuestoStorage)
    }

    if(gastosStorage) {
      gastos.value = JSON.parse(gastosStorage)
    }
  })

  const definirPresupuesto = (cantidad) => {
    presupuesto.value = cantidad
    disponible.value = cantidad
  }

  const showModal = () => {
    modal.mostrar = true
    setTimeout(() => {
      modal.animar = true
    }, 300)
  }

  const closeModal = () => {
    modal.animar = false
    setTimeout(() => {
      modal.mostrar = false
    }, 300)
  }

  const saveGasto = () => {
    if(gasto.id) {
      const { id } = gasto
      const i = gastos.value.findIndex(gasto => gasto.id === id)
      gastos.value[i] = {...gasto}
    } else {
      gastos.value.push({
        ...gasto,
        id: generateId(),
      })
    }

    closeModal()
    resetStateGasto()
  }

  const resetStateGasto = () => {
    Object.assign(gasto, {
        nombre: '',
        cantidad: '',
        categoria: '',
        id: null,
        fecha: Date.now()
      })
  }

  const selectGasto = id => {
    const gastoEdit = gastos.value.filter(gasto => gasto.id === id)[0]
    Object.assign(gasto, gastoEdit)
    showModal()
  }

  const deleteGasto = () => {
    gastos.value = gastos.value.filter(gastoState => gastoState.id !== gasto.id)
    closeModal()
  }

  const gastosFilters = computed(() => {
    
    if(filter.value) {
      return gastos.value.filter(gasto => gasto.categoria === filter.value)
    }

    return gastos.value

  })

  const resetApp = () => {
    if (confirm('¿Deseas reiniciar el presuouesto de gastos?')) {
      gastos.value = []
      presupuesto.value = 0
    }
  }
</script>

<template>
  <div 
    :class="{fijar: modal.mostrar}"
  >
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="container-header container shadow">
        <Presupuesto
            v-if="presupuesto === 0"
            @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto
            v-else
            :presupuesto="presupuesto"
            :disponible="disponible"
            :gastado="gastado"
            @reset-app="resetApp"
        />
      </div>
    </header>

    <main v-if="presupuesto > 0">
      <Filter 
        v-model:filter="filter"
      />
      <div class="container list-gasto">
        <h2>{{ gastos.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>
        <Gasto 
          v-for="gasto in gastosFilters"
          :key="gasto.id"
          :gasto="gasto"
          @select-gasto="selectGasto"
        />
      
      </div>

      <div class="crear-gasto">
        <img
          :src="iconoNuevoGasto"
          alt="icono nuevo gasto"
          @click="showModal"
        />
      </div>

      <Modal
          v-if="modal.mostrar"
          @close-modal="closeModal"
          @save-gasto="saveGasto"
          @delete-gasto="deleteGasto"
          :modal="modal"
          :id="gasto.id"
          :disponible="disponible"
          v-model:nombre="gasto.nombre"
          v-model:cantidad="gasto.cantidad"
          v-model:categoria="gasto.categoria"
      />
    </main>
  </div>
</template>

<style>
  :root {
    --blue: #3b82f6;
    --white: #fff;
    --gray-soft: #f5f5f5;
    --gray: #94a3b8;
    --gray-hot: #64748b;
    --black: #000;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    font-family: "Lato", sans-serif;
    background-color: var(--gray-soft);
  }

  h1 {
    font-size: 4rem;
  }

  h2 {
    font-size: 3rem;
  }

  header {
    background-color: var(--blue);
  }

  header h1 {
    padding: 3rem 0;
    margin: 0;
    color: var(--white);
    text-align: center;
  }

  .container {
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }

  .container-header {
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }

  .shadow {
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    background-color: var(--white);
    border-radius: 1.2rem;
    padding: 5rem;
  }

  .crear-gasto {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
  }

  .crear-gasto img {
    width: 5rem;
    cursor: pointer;
  }

  .list-gasto {
    margin-top: 10rem;
  }
  
  .list-gasto h2{
    font-weight: 900;
    color: var(--gray-hot);
  }

  .fijar {
    overflow: hidden;
    height: 100vh;
  }
</style>
