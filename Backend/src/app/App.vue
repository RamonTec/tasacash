<template>
    <div>
         <nav class="navbar fixed-top navbar-light bg-light navbar-expand-md" style="box-shadow: 0 0 1px 1px rgba(31, 147, 255,.4)">
            <a class="navbar-brand ml-5" href="#" style="font-size: 1.6em">
            <img src="/img/logo.svg" width="45" height="45" class="d-inline-block align-top" alt="">
            Tasa
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class="jumbotron jumbotron-fluid" style="background: url('img/img-header.svg') no-repeat;
        background-size:cover;box-shadow: 0 0 5px 2px rgba(0,0,0,.4)">
            <div class="container-fluid">
                <div class="row" style="max-height:50vh;">
                    <div class="col-sm-12 col-md-8 col-lg-7 text-center">
                        <div class="row mt-5">
                            <div class="col-md-3 hidden-sm"></div>
                            <div class="col-sm-12 col-md-8 card card-body p-5 mt-5">
                                    <ul class="nav nav-tabs" id="pills-tab" style="border-color:rgb(31, 147, 255) " role=tablist>
                                        <li class="nav-item">
                                            <a class="nav-link active" id="compra-tab" data-toggle="tab" href="#compra" role="tab" aria-controls="compra" aria-selected="true">Compra</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="venta-tab" data-toggle="tab" href="#venta" role="tab" aria-controls="venta" aria-selected="false">Venta</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content" id="calculadoraContent">
                                        <div class="tab-pane fade show active" id="compra" role="tabpanel" aria-labelledby="compra-tab">
                                            <form>
                                                <div class="input-group mt-5 inline">
                                                    <div class="input-group-prepend">
                                                        <select class="btn btn-outline-secondary">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                    <input type="text" class="form-control">
                                                    <div class="input-group-prepend ml-5">
                                                        <select class="btn btn-outline-secondary">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                    <input type="text" class="form-control">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="tab-pane fade" id="venta" role="tabpanel" aria-labelledby="venta-tab">
                                            <form>
                                                <div class="input-group mt-5 inline">
                                                    <div class="input-group-prepend">
                                                        <select class="btn btn-outline-secondary">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                    <input type="text" class="form-control">
                                                    <div class="input-group-prepend ml-5">
                                                        <select class="btn btn-outline-secondary">
                                                            <option value=""></option>
                                                            <option value=""></option>
                                                        </select>
                                                    </div>
                                                    <input type="text" class="form-control">
                                                </div>
                                            </form>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hidden-sm col-md-4 col-lg-5">
                        <img class="img-header mt-2" src="img/mapa.svg" alt="" style="max-width: 100%;">
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid bg-cards p-5">
            <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-sm-12 col-lg-8">
                            <div class="row">
                                <div class="col-sm-3 alert bg-primary text-white">
                                <span class="alert-heading h5">Bitcoin/USD</span>
                                <hr>
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                            <div class="col-md-1"></div>
                            <div class="col-sm-3 alert bg-primary text-white">
                                <span class="alert-heading h5">Volumen(24h)</span>
                                <hr>
                                <p>Lorem ipsum dolor sit.</p>
                            </div>
                            <div class="col-md-1"></div>
                            <div class="col-sm-3 alert bg-primary text-white">
                                <div class="alert-heading"><select v-for="coin in coins" :key='coin' class="form-control text-white" style="border: 2px solid #ffffff50; background:transparent">
                                    <option class="text-dark" value="">{{coin}}</option>
                                    </select>
                                    
                                    </div>
                                <hr>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png" alt="" class="my-lg-2 mx-lg-2">
                                    </div>
                                    <div class="col-sm-8"><p>Lorem ipsum dolor sit.</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <tabla/>

    </div>
</template>
<script>
import tabla from './components/tablaFiat'

export default {
  name: 'App',
  components: {
    tabla
  },
  data(){
        return {
            coins:['USD', 'VES', 'AUD', 'EUR'],
            fiats:[],
            volumenFiats:[],
            url: "prueba"
        }
    },
    created(){
        this.getApiCurencies();
        this.getApiVolumen();
        this.coins();
    },
    methods: {
        coins(){
            console.log(this.coins)
        },
       getApiCurencies(){
        axios.get('/prueba/')
        .then(data => {
            const monedas = data.data
            this.fiats.push(monedas)
            console.log(this.fiats)   
        })
        },
        getApiVolumen(){
            axios.get('/volumen/')
            .then(data => {
                const volumen = data.data
                this.volumenFiats.push(volumen)
                console.log(this.volumenFiats)
            })
        }
    }
}
</script>
<script>
</script>