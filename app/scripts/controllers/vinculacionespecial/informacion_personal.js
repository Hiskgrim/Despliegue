'use strict';

/**
 * @ngdoc function
 * @name clienteApp.controller:InformacionPersonalCtrl
 * @description
 * # InformacionPersonalCtrl
 * Controller of the clienteApp
 */
angular.module('contractualClienteApp')
  .controller('InformacionPersonalCtrl', function (contratacion_request,$scope,$mdDialog,idPersona) {
    
    var self = this;
    self.idPersona=idPersona;

    contratacion_request.getOne("informacion_persona_natural",self.idPersona).then(function(response){
    	self.persona=response.data;
    	self.persona.FechaExpedicionDocumento = new Date(self.persona.FechaExpedicionDocumento).toLocaleDateString('es');
    	contratacion_request.getOne("pais",self.persona.IdPaisNacimiento.Id).then(function(response){
	    	self.persona.Pais=response.data.NombrePais;
	    })
    })

  });
