var myApp = angular.module("myApp",['ui.bootstrap']);
myApp.controller("appCtrl", function ($scope, $http) {
    $scope.paginaActual = 1;

    $scope.author = "Nahuel Piguillem";
    $scope.Choferes = [];
    $scope.Viajes = [];
    $scope.TitulosV = { A: '(Agregar)', M: '(Modificar)' }
    $scope.TitulosAccionABM = { V: '(Viajes)', CH: '(Choferes)', C: '(Contacto)', H: '(Home)' };
    $scope.AccionABM = 'V';
    $scope.Homear = function () { $scope.AccionABM = 'H' };
    $scope.ListarViajes = function () { $scope.AccionABM = 'V' };
    $scope.ListarChoferes = function () { $scope.AccionABM = 'CH' };
    $scope.Contactear = function () { $scope.AccionABM = 'C' };
    $scope.NuevoViaje = function () {
        $scope.Viaje = {
            id: '',
            fechaViaje: '',
            codChof: '',
            peso: '',
            origen: '',
            destino: '',
            descripcion: '',
            precio: '',
            vehiculo: '',
            acomp: ''
        };
        $scope.AccionV = 'A';

    };
    $scope.Modificar = function (vi) {
        $scope.Viaje = vi;
        $scope.AccionV = 'M';
    };

    $scope.cargarChoferes = function () {
        $http.get("/api/choferes").then(
            					function (response) {
            					    $scope.Choferes = response.data;
            					});
    };
    $scope.cargarChoferes();
    $scope.cargarViajes = function () {
        $http.get("/api/Viajes").then(
            					function (response) {
            					    $scope.Viajes = response.data;
            					});
    };
    $scope.cargarViajes();
    $scope.chofFunc = function chofFunc(codChof) {
        for (var llave = 0; llave < $scope.Choferes.length; llave++) {
            if ($scope.Choferes[llave].codChof = codChof) {
                return $scope.Choferes[llave].nombre;
            };
        };
    };
    $scope.guardarViaje = function () {
        if ($scope.AccionV == 'A') {
            $http.post("/api/Viajes", $scope.Viaje).then(
                				function (response) {
                				    // Elviaje se agregò con èxito
                				    $scope.cargarViajes();
                				    $scope.Viaje = [];
                				}
            						);
        }
        else {
            $http.put("/api/Viajes/" + $scope.viaje.id, $scope.viaje).then(
                				function (response) {
                				    // El viaje se actualizò con èxito
                				    $scope.cargarViajes();
                				    $scope.Viaje = [];
                				}
            						);

        }
    };
    $scope.choferes = [{ id: 1, nombre: "Ruben", apellido: "Ramirez", cuit: "1224-4" }, { id: 2, nombre: "Juanfra", apellido: "Quinteros", cuit: "1765-4" }, { id: 3, nombre: "Lucas", apellido: "Moura", cuit: "1887-1" }, { id: 4, nombre: "Nicolas", apellido: "Veggetti", cuit: "1994-7" }, { id: 5, nombre: "Jose", apellido: "Lopex", cuit: "1444-5"}];
    $scope.viajes = [{ id: 1, fecha: "01/01/2019", codChof: 1, peso: 3000, origen: "Cordoba", destino: "pilar", descripcion: "general", precio: "2500", veh: "h-100", acom: true }, { id: 2, fecha: "01/01/2018", codChof: 2, peso: 3000, origen: "pilar", destino: "cordoba", descripcion: "general", precio: "2500", veh: "h-100", acom: true}]
    $scope.RegistrosTotal = $scope.viajes.length;
    $scope.LimpiarForm = function () { $scope.frmViaje.$setUntouched(); $scope.frmViaje.$setPristine() };
    $scope.llenarModalViaje = $("#mdl3").on("show.bs.modal", function (e) {
        var button = $(e.relatedTarget)
        var recipient = button.data("id")
        var fecha = button.data("fecha")
        var chofer = button.data("chofer")
        var peso = button.data("peso")
        var descripcion = button.data("descripcion")
        var origen = button.data("origen")
        var destino = button.data("destino")
        var veh = button.data("veh")
        var precio = button.data("precio")
        var modal = $("#mdl3")
        var title = button.data("title")
        modal.find(".modal-title").text(title + ": " + recipient)
        modal.find("#btnfecha").val(fecha)
        modal.find("#btnchof").val(chofer)
        modal.find("#btnpeso").val(peso)
        modal.find("#btnorigen").val(origen)
        modal.find("#btndestino").val(destino)
        modal.find("#btndescripcion").val(descripcion)
        modal.find("#btnprecio").val(precio)
        modal.find("#btnveh").val(veh)
    });
    $scope.nombreFunc = function nombreFunc(codChof) {
        for (var llave = 0; llave < $scope.choferes.length; llave++) {
            if ($scope.choferes[llave].id == codChof) {
                return $scope.choferes[llave].nombre;
            }
        }
    };
    $scope.apellidoFunc = function apellidoFunc(codChof) {
        for (var llave = 0; llave < $scope.choferes.length; llave++) {
            if ($scope.choferes[llave].id == codChof) {
                return $scope.choferes[llave].apellido;
            }
        }
    };
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.options = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
      					mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };

    $scope.toggleMin = function () {
        $scope.options.minDate = $scope.options.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date(tomorrow);
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
    					{
    					    date: tomorrow,
    					    status: 'full'
    					},
    					{
    					    date: afterTomorrow,
    					    status: 'partially'
    					}
  						];

    function getDayClass(data) {
        var date = data.date,
    					mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
});
myApp.filter('filterChofer',function () {
			return function(input,chofId){
					var salida=[];
					angular.forEach(input,function(viaje) {
							if (viaje.codChof === chofId){
								salida.push(viaje)}			
										})
							return salida;

						}
	
					   });
