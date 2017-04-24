'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:HojasDeVidaSeleccionCtrl
 * @description
 * # HojasDeVidaSeleccionCtrl
 * Controller of the clienteApp
 */
angular.module('clienteApp')
  .controller('HojasDeVidaSeleccionCtrl', function (contratacion_request,contratacion_mid_request,hojas_de_vida_request,$scope,$mdDialog) {
    
    var self = this;

  	contratacion_request.getAll("informacion_persona_natural","limit=0").then(function(response){
      self.datosPersonas.data=response.data;
      self.datosPersonas.data.forEach(function(row){
        row.getNombreCompleto = function(){
          return this.PrimerNombre + ' ' + this.SegundoNombre + ' ' + this.PrimerApellido + ' ' + this.SegundoApellido;
        }
      });
    });

    self.datosPersonas = {
      enableFiltering : true,
      enableSorting : true,
      showGridFooter: true,
      showColumnFooter: true,
      treeRowHeaderAlwaysVisible : false,
      showTreeExpandNoChildren: false,
      enableRowSelection: true,
      enableSelectAll: true,
      columnDefs : [
        {field: 'getNombreCompleto()', width: '25%', displayName: 'NOMBRE'},
        {
            field: 'InformacíonPersonal', displayName: 'INFORMACIÓN PERSONAL', enableFiltering: false,
            cellTemplate: '<button class="form-control" ng-click="grid.appScope.verInformacionPersonal(row)">Ver</button>'
        },
        {
            field: 'HistoriaLaboral', displayName: 'HISTORIA LABORAL', enableFiltering: false,
            cellTemplate: '<button class="form-control" ng-click="grid.appScope.verHistoriaLaboral(row)">Ver</button>'
        },
        {
            field: 'FormacionAcademica', displayName: 'FORMACIÓN ACADÉMICA', enableFiltering: false,
            cellTemplate: '<button class="form-control" ng-click="grid.appScope.verFormacionAcademica(row)">Ver</button>'
        },
        {
            field: 'Investigacion', displayName: 'INVESTIGACIÓN', enableFiltering: false,
            cellTemplate: '<button class="form-control" ng-click="grid.appScope.verInvestigacion(row)">Ver</button>'
        },
        {
            field: 'GenerarContrato', displayName: 'AGREGAR CONTRATO', enableFiltering: false,
            cellTemplate: '<button class="form-control" ng-click="grid.appScope.verAgregarContrato(row)">Contratar</button>'
        }
      ]
    };

    $scope.verInformacionPersonal = function(row){
       self.selectedItem=row.entity.Id;
       $scope.ventanaInformacionPersonal(row.entity.id)
    };

    $scope.ventanaInformacionPersonal = function() {
	    $mdDialog.show({
	      controller: InformacionPersonalController,
	      templateUrl: 'views/persona_natural_detalle.html',
	      parent: angular.element(document.body),
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen
	    })	  };

	 function InformacionPersonalController($scope, $mdDialog) {
	 	 contratacion_request.getOne("informacion_persona_natural",self.selectedItem).then(function(response){
        $scope.persona=response.data;
	    });
	    
	    $scope.hide = function() {
	      $mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      $mdDialog.cancel();
	    };
	  }


    $scope.verHistoriaLaboral = function(row){
       self.selectedItem=row.entity.Id;
       $scope.ventanaHistoriaLaboral(row.entity.id)
    };

    $scope.ventanaHistoriaLaboral = function() {
      $mdDialog.show({
        controller: HistoriaLaboralController,
        templateUrl: 'views/experiencia_laboral_detalle.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })    };

   function HistoriaLaboralController($scope, $mdDialog) {

     hojas_de_vida_request.getAll("experiencia_docente").then(function(response){
        $scope.experienciasLaborales=response.data;
        $scope.experienciasLaborales.forEach(function(experiencia){
          hojas_de_vida_request.getOne("institucion",experiencia.InstitucionId.Id).then(function(response){
            experiencia.institucion=response.data;
          });
          hojas_de_vida_request.getOne("tipo_dedicacion",experiencia.TipoDedicacionId.Id).then(function(response){
            experiencia.tipoDedicacion=response.data;
          });
        });
      });

     $scope.getNumeros = function(objeto) {
        var numeros=[];
        if(objeto){
          for(var i = 0; i<objeto.length; i++){
            numeros.push(i);
          }
        }
        return numeros;
      }
      
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }

    $scope.verFormacionAcademica = function(row){
       self.selectedItem=row.entity.Id;
       $scope.ventanaFormacionAcademica(row.entity.id)
    };

    $scope.ventanaFormacionAcademica = function() {
      $mdDialog.show({
        controller: FormacionAcademicaController,
        templateUrl: 'views/formacion_academica_detalle.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })    };

   function FormacionAcademicaController($scope, $mdDialog) {

     hojas_de_vida_request.getAll("formacion_academica").then(function(response){
        $scope.estudios=response.data;
        $scope.estudios.forEach(function(estudio){
          hojas_de_vida_request.getOne("institucion",estudio.InstitucionId.Id).then(function(response){
            estudio.institucion=response.data;
          });
          hojas_de_vida_request.getOne("titulo",estudio.Titulo.Id).then(function(response){
            estudio.titulo=response.data;
          });
        });
      });

     $scope.getNumeros = function(objeto) {
        var numeros=[];
        if(objeto){
          for(var i = 0; i<objeto.length; i++){
            numeros.push(i);
          }
        }
        return numeros;
      }
      
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }

    $scope.verInvestigacion = function(row){
       self.selectedItem=row.entity.Id;
       $scope.ventanaInvestigacion(row.entity.id)
    };

    $scope.ventanaInvestigacion = function() {
      $mdDialog.show({
        controller: InvestigacionController,
        templateUrl: 'views/trabajos_investigacion_detalle.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })    };

   function InvestigacionController($scope, $mdDialog) {

     hojas_de_vida_request.getAll("investigacion").then(function(response){
        $scope.investigaciones=response.data;
        $scope.investigaciones.forEach(function(investigacion){
          hojas_de_vida_request.getOne("institucion",investigacion.InstitucionId.Id).then(function(response){
            investigacion.institucion=response.data;
          });
          hojas_de_vida_request.getOne("tipo_investigacion",investigacion.TipoInvestigacionId.Id).then(function(response){
            investigacion.tipoInvestigacion=response.data;
          });
        });
      });

     $scope.getNumeros = function(objeto) {
        var numeros=[];
        if(objeto){
          for(var i = 0; i<objeto.length; i++){
            numeros.push(i);
          }
        }
        return numeros;
      }
      
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }

    $scope.verAgregarContrato = function(row){
       self.selectedItem=row.entity.Id;
       $scope.ventanaAgregarContrato(row.entity.id)
    };

    $scope.ventanaAgregarContrato = function() {
      $mdDialog.show({
        controller: AgregarContratoController,
        templateUrl: 'views/contrato_registro.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })    };

   function AgregarContratoController($scope, $mdDialog) {

      $scope.verificarContrato = function(){
        contratacion_mid_request.post("clasificar/"+self.selectedItem+"/"+$scope.datosValor.NumSemanas+"/"+$scope.datosValor.NumHorasSemanales+"/asociado/"+$scope.datosValor.dedicacion).then(function(response){
          swal({
            title: "Confirmación",
            text: "Valor del contrato: "+response.data,
            type: "info",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
          });
        });
      }

    }

  });
