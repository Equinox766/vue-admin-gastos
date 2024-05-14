<script setup>
    import { formatearCantidad, dateFormated } from '../helpers';

    import IconoAhorro from '../assets/img/icono_ahorro.svg'
    import IconoCasa from '../assets/img/icono_casa.svg'
    import IconoComida from '../assets/img/icono_comida.svg'
    import IconoGastos from '../assets/img/icono_gastos.svg'
    import IconoOcio from '../assets/img/icono_ocio.svg'
    import IconoSalud from '../assets/img/icono_salud.svg'
    import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

    const diccionarioIcons = {
        ahorro: IconoAhorro,
        comida: IconoComida,
        casa: IconoCasa,
        gastos: IconoGastos,
        ocio: IconoOcio,
        salud: IconoSalud,
        suscripciones: IconoSuscripciones
    }
    
    const props = defineProps({
        gasto: {
            type: Object,
            required: true
        }
    })

    defineEmits(['select-gasto'])
</script>

<template>
    <div class="gasto sombra">
        <div class="contenido">
            <img 
            :src="diccionarioIcons[gasto.categoria]" 
            alt="Icono Gasto"
            class="icon"
            />
            <div class="details">
                <p class="categoria">{{ gasto.categoria }}</p>
                <p 
                    class="nombre"
                    @click="$emit('select-gasto', gasto.id)"
                >
                    {{ gasto.nombre }}
                </p>
                <p class="date"> Fecha:
                    <span>{{  dateFormated(gasto.fecha) }}</span>
                </p>
            </div>
        </div>
        <p class="cantidad"> {{  formatearCantidad(gasto.cantidad) }}</p>
    </div>
</template>

<style>
    .gasto {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .contenido {
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .icon {
        width: 5rem;
    }

    .details p {
        margin: 0, 0, 1rem, 0;
    }

    .categoria {
        color: var(--gray);
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: 900;
    }

    .nombre {
        color: var(--gray-hot);
        font-size: 2.4rem;
        font-weight: 700;
        cursor: pointer;
    }

    .fecha {
        font-size: 1.6rem;
        font-weight: 900;
    }

    .fecha span {
        font-weight: 400;
    }

    .cantidad {
        font-size: 3rem;
        font-weight: 900;
        margin: 0;
    }

</style>
