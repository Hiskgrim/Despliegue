'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:ResolucionGeneracionCtrl
 * @description
 * # ResolucionGeneracionCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('ResolucionGeneracionCtrl', function (contratacion_request,academica_request,$mdDialog,$scope,$routeParams) {

  	var self=this;

    self.nivelCarrera=$routeParams.nivelCarrera;
    self.tipoDedicacion=$routeParams.tipoDedicacion;
    self.idFacultad=$routeParams.idFacultad;

    self.datosContratos=[];

    academica_request.getAll("proyecto_curricular","query=IdFacultad.id%3A"+self.idFacultad+"%2CIdTipoCarrera.Id%3A1&limit=0").then(function(response){
      self.proyectos=response.data;
    });

    contratacion_request.getAll("contrato_especial").then(function(response){
      self.contratosEspeciales=response.data;
    });

    contratacion_request.getAll("contratado").then(function(response){
      self.contratados=response.data;
    });

    $.getJSON("/resolucion.json", function(resolucion) {
        self.numero=resolucion["numero"];
    });

    $.getJSON("/resolucion.json", function(resolucion) {
        self.preambulo=resolucion["preambulo"];
    });

    $.getJSON("/resolucion.json", function(resolucion) {
        self.consideracion=resolucion["consideracion"];
    });
    
    $.getJSON("/resolucion.json", function(resolucion) {
        self.articulos=resolucion["articulos"];
    });
    
  self.agregarArticulo = function() {
    self.articulos.push({texto: '',
    paragrafo: null,
    asociado: false});  
  }

  self.eliminarArticulo = function(num) {
    self.articulos.splice(num,1);  
  }

  self.asociarTabla = function(num) {
    self.articulos.forEach(function(articulo){
      if(self.articulos[num]==articulo){
        articulo.asociado=true;
      }else{
        articulo.asociado=false;
      }
    })
  }

  self.verDocentesContratados = function() {
  	$scope.ventanaDocentesContratados();
  }

  $scope.ventanaDocentesContratados = function() {
	    $mdDialog.show({
	      controller: DocentesContratadosController,
	      templateUrl: 'views/contrato_resumen.html',
	      parent: angular.element(document.body),
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen
	    })	  };

	 function DocentesContratadosController($scope, $mdDialog) {
      $scope.proyectos=self.proyectos;

      $scope.contratados=self.contratados;
	    
      $scope.selectedIndex = 0;

	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };
	  }

  self.generarResolucion = function() {
    var documento=getDocumento(self);
    pdfMake.createPdf(documento).getDataUrl(function(outDoc){
      document.getElementById('vistaPDF').src = outDoc;
    });
    $("#resolucion").show();
  }

  self.getNumeros = function(objeto) {
  	var numeros=[];
    if(objeto){
    	for(var i = 0; i<objeto.length; i++){
    		numeros.push(i);
    	}
    }
    return numeros;
  }

  });