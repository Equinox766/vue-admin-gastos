<script setup>
    import { ref } from 'vue'
    import Alert from './Alert.vue'
    import closeModal from '../assets/img/cerrar.svg'

    const error = ref('')
    const emit = defineEmits(['close-modal', 'save-gasto', 'update:nombre', 'update:cantidad', 'update:categoria'])
    const props = defineProps({
        modal: {
            type: Object,
            required: true
        },
        nombre: {
            type: Object,
            required: true
        },
        cantidad: {
            type: [String, Number],
            required: true
        },
        categoria: {
            type: String,
            required: true
        }

    })

    const addGasto = () => {
        const { cantidad, categoria, nombre } = props
        if([cantidad, categoria, nombre].includes('')) {
            error.value = 'Todos los campos son obligatorios.'
            setTimeout(() => {
                error.value = ''
            }, 3000)
            return
        }

        if(cantidad <= 0) {
            error.value = 'Cantidad no valida.'
            setTimeout(() => {
                error.value = ''
            }, 3000)
            return
        }

        emit('save-gasto')
    }

</script>

<template>
    <div class="modal">
        <div class="close-modal">
            <img
                :src="closeModal"
                @click="$emit('close-modal')"
            >
        </div>
        <div 
            class="container container-form"
            :class="[modal.animar ? 'animate' : 'close']"
        >
            <form 
                class="new-gasto"
                @submit.prevent="addGasto"
            >
                <legend>Añador Gasto</legend>

                <Alert v-if="error">{{ error }}</Alert>

                <div class="campo">
                    <label for="nombre">Nombre Gasto: </label>
                    <input
                        type="text"
                        id="nombre"
                        :value="nombre"
                        @input="$emit('update:nombre', $event.target.value)"
                        placeholder="Añade el nombre del gasto"
                    />
                </div>
                <div class="campo">
                    <label for="cantidad">Cantidad: </label>
                    <input
                        type="text"
                        id="cantidad"
                        :value="cantidad"
                        @input="$emit('update:cantidad', +$event.target.value)"
                        placeholder="Añade la cantidad del gasto"
                    />
                </div>
                <div class="campo">
                    <label for="categoria">Categoria: </label>
                    <select 
                        id="categoria"
                        :value="categoria"
                        @input="$emit('update:categoria', $event.target.value)"

                    > 
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="ocio">Ocio</option>
                        <option value="gastos">Gastos</option>
                        <option value="casa">Casa</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input 
                    type="submit" 
                    value="Añadir Gasto"
                >
            </form>
        </div>
    </div>
</template>
  
<style scoped>
    .modal {
        position: absolute;
        background-color: rgb(0 0 0 / 0.9);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }    
    .close-modal {        
        position: absolute;
        right: 3rem;
        top: 3rem;
    }

    .close-modal img {
        width: 3rem;
        cursor: pointer;
    }

    .container-form {
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;
    }

    .container-form.animate {
        opacity: 1;
    }

    .container-form.close {
        opacity: 0;
    }

    .new-gasto {
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
    }

    .new-gasto legend {
        text-align: center;
        color: var(--white);
        font-size: 3rem;
        font-weight: 700;
    }

    .campo {
        display: grid;
        gap: 2rem;
    }

    .new-gasto input,
    .new-gasto select {
        background-color: var(--gray-soft);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
    }

    .new-gasto label {
        color: var(--white);
        font-size: 3rem;
    }

    .new-gasto input[type="submit"] {
        background-color: var(--blue);
        color: var(--white);
        font-weight: 700;
        cursor: pointer;
    }
</style>