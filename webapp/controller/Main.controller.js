sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";
        var urlObject = library.URLHelper; 

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () { //onInit equivale ao INITIALIZATION no ABAP 
                
                let produto = {};
                let productModel = new JSONModel(produto);
                let view = this.getView();
                view.setModel(productModel, "ModeloProduto"); //Conceito de modelo é importante.

                //this no js = ME no ABAP (referencia a si mesmo)
            },
            onClickImage: function(oEvent) {
                urlObject.redirect(oEvent.getSource().getSrc(), true);
            },
            
            onPressBuscar: function() {
                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();
                //alert(valor);

                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method : "GET",
                    async : true,
                    crossDomain : true, 

                };
                //promise = quandi uma função retorna como parâmmetro de exportação, outra função
                $.ajax(parameters).done(function(response){ //chamada ajax nesse servidor com esses parâmetros (sucesso)
                    debugger
                    let oProdutoModel = this.getView().getModel("ModeloProduto");
                    //clear
                    oProdutoModel.setData({});
                    oProdutoModel.refresh();
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();

                }.bind(this)  ) //this = me -> Js tem contexto "Associe a função ao programa principal (esse)"
                .fail(function (){
                    debugger
                }.bind(this) ); // exception 


                // let material = "Água Mega";

                // let peso = 500;

                // let uom = 'ml';
                // //ponto flut
                // let qtdsodio = 15.66;
                // //abap_boolean
                // let conteudoliquido = true;

                // //internal table javascript - array
                // let composicao = ["bicarbonato", "magnesio", "sulfato", "brometo"]
                // //wa ou structure - tipo com várias propriedades = objeto

                // let produto = {
                //     descrição: "chá verde",
                //     peso: 130,
                //     marca: "quaker",
                //     uom: "g"

            }

        });
    }
);
