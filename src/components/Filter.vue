<script setup>
    defineProps(['filter'])
    defineEmits(['update:filter'])
</script>

<template>
    <div class="filters shadow container">
        <form>
            <div class="campo">
                <label for="filtro">Filtrar Gastos</label>
                <select 
                    id="filtro"
                    :value="filter"
                    @input="$emit('update:filter', $event.target.value)"

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
        </form>
        
    </div>
</template>

<style scoped>
    .filters {
        margin-top: 10rem;
    }

    .filters .campo {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .filters label {
        font-size: 3rem;
        font-weight: 900;
        color: var(--gray-hot);
    }

    .filters select {
        flex: 1;
        padding: 1rem;
        border: none;
        border-radius: 1rem;
        background-color: var(--gray-soft);
        text-align: center;
    }
</style>