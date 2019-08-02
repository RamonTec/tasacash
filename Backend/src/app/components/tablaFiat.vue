<template>
    <div class="container">
        <div class="table-responsive">
    <table class="table">
    <caption>Lista de Monedas</caption>
        <thead>
            <tr>
                <th scope="col">Siglas</th>
                <th scope="col">Moneda</th>
                <th scope="col">Precio</th>
                <th scope="col">Precio(24h)</th>
                <th scope="col">Volumen(24h)</th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for='fiat in fiats' :key='fiat'>
                <th scope="row">{{fiat}}</th>
                <td>{{name}}</td>
                <td>{{ratesLast}}</td>
                <td>{{avg24}}</td>
                <td>{{volumenBtc}}</td>
            </tr>
        </tbody>
    </table>
    </div>
    </div>
</template>

<script>
export default {
  name: 'tabla',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
