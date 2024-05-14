<script setup>
  import imagen from '../assets/img/grafico.jpg';
  import { formatearCantidad } from '../helpers';
  const props = defineProps({
    presupuesto: {
      type: Number,
      required: true
    },
    disponible: {
      type: Number,
      required: true
    }
  })
</script>

<template>
  <div class="two-columns">
    <div class="container-grafig">
      <img 
          :src="imagen"
      />
    </div>
    <div class="container-presupuesto">
      <button
        class="reset-app"
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
        Gs. 0
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