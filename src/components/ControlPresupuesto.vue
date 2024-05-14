<script setup>
  import { computed  } from 'vue';
  import CircleProgress from 'vue3-circle-progress'
  import "vue3-circle-progress/dist/circle-progress.css"
  import { formatearCantidad } from '../helpers'
  
  defineEmits(['reset-app'])

  const props = defineProps({
    presupuesto: {
      type: Number,
      required: true
    },
    disponible: {
      type: Number,
      required: true
    },
    gastado: {
      type: Number,
      required: true
    }
  })

  const percentaje = computed(() => {
    return parseInt(((props.presupuesto - props.disponible) / props.presupuesto) * 100)
  })

</script>

<template>
  <div class="two-columns">
    <div class="container-grafig">
      <div class="percentaje">
        {{ percentaje }} %
      </div>
      <CircleProgress
        :percent="percentaje"
        :size="250"
        :border-width="30"
        :border-bg-width="30"
        fill-color="#3b82f6"
        empty-color="#e1e1e1"
      />
    </div>
    <div class="container-presupuesto">
      <button
        class="reset-app"
        type="button"
        @click="$emit('reset-app')"
      >
        Resetear App
      </button>
      <p>
        <span>Presupuesto: </span>
        {{ formatearCantidad(presupuesto) }}
      </p>
      <p>
        <span>Disponble: </span>
        {{  formatearCantidad(disponible) }}
      </p>
      <p>
        <span>Gastado: </span>
        {{ formatearCantidad(gastado) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
  .two-columns {
    display: flex;
    flex-direction: column;
  }

  .two-columns > :first-child {
    margin-bottom: 4rem;
  }

  @media(min-width: 768px) {
    .two-columns {
      flex-direction: row;
      gap: 4rem;
      align-items: center;
    }
    .two-columns > :first-child {
      margin-bottom: 0;
    }

    .container-grafig {
      position: relative;
    }

    .percentaje {
      position: absolute;
      margin: auto;
      top: calc(50% - 1.5rem);
      right: 0;
      left: 0;
      text-align: center;
      z-index: 100;
      font-size: 3rem;
      font-weight: 900;
      color: var(--gray-hot);
    } 

    .reset-app {
      background-color: #DB2777;
      border: none;
      padding: 1rem;
      width: 100%;
      color: var(--white);
      font-weight: 900;
      text-transform: uppercase;
      border-radius: 1rem;
      transition-duration: 300ms;
    }

    .reset-app:hover {
      background-color: #840a41;
      cursor: pointer;
    }

    .container-presupuesto {
      width: 100%;

    }

    .container-presupuesto p {
      font-size: 2.4rem;
      text-align: center;
      color: var(--gray-hot);

    }

    @media (min-width: 768px) {
      .container-presupuesto p {
        text-align: left;
      } 
    }
    .container-presupuesto span{
      font-weight: 900;
      color: var(--blue);
    }
  }


</style>