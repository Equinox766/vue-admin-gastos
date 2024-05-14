export const formatearCantidad = cantidad => {
    const simboloMoneda = 'Gs.';
    const cantidadSinDecimales = Math.floor(cantidad);
    const cantidadFormateada = cantidadSinDecimales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return simboloMoneda + ' ' + cantidadFormateada;
}

export const generateId = () => {
    const date = Date.now().toString(36)
    const random = Math.random().toString(36)

    return date + random
}

export const dateFormated = date => {
    const newDate = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return newDate.toLocaleDateString('es-ES', options)
}