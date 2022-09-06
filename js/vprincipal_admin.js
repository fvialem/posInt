/*Arreglos de tabla de productos*/
	var tablaProdNum = [];
	var tablaProdALU = [];
	var tablaProdDesc = [];
	var tablaProdMarca = [];
	var tablaProdCantidad = [];
	var tablaProdDscto = [];
	var tablaProdVOrig = [];
	var tablaProdVFinal = [];
	var tablaProdVendedor = [];
	var tablaProdIDPreventa = [];
/*Fin arreglo de tablas de productos*/
/*Variables para nota de credito*/
	var numeroDoctoNC;
	var bodegaNC;
	var workstationNC;
/*Fin Variables para nota de credito*/

//Funcion para cargar cliente 
function cargarCliente(){
	var rut = $("#vpRut").val();
	$.post('script/buscarUsuario.php', {rut:rut}, function(res){
		var usuario = $.parseJSON(res);
		if(usuario['nombres'] != null){
			$("#vpNombre").val(usuario['nombres']);
			$("#vpNombre").attr('disabled',true);
			$("#agregarUsuario").hide();
			$("#vpRut").css('width','100%');
			$("#codigo").focus();
		}else{
			$("#vpNombre").val();
			$("#agregarUsuario").show();
			$("#vpRut").css('width','83%');
			$("#vpNombre").val('');
		}
	});
};
//Fin funcion cargar cliente

//FUNCION PARA RECIBIR VALORES DE NOTA DE CRÉDITO Y ACTUALIZAR Arreglos
function notaCreditoValores(numeroDocto, bodega, workstation, tipoDocto){
	var acumTotal = 0;
	$.post('script/obtenerNotaCredito.php', {numeroDocto:numeroDocto, bodega:bodega, workstation:workstation, tipoDocto:tipoDocto}, function(res){
		var resNC = $.parseJSON(res);
		if(resNC == null){
			alert("Los datos de venta ingresados no coinciden con ninguna venta realizada, por favor reviselos y vuelva a ingresarlos.");
		}else{
			for(i=0;i<resNC.length;i++){
				tablaProdNum.push(resNC[i]['RecNumber']);
				tablaProdALU.push(resNC[i]['ALU']);
				tablaProdDesc.push(resNC[i]['DESC2']);
				tablaProdMarca.push(resNC[i]['DESC3']);
				tablaProdCantidad.push(resNC[i]['Cantidad']);
				tablaProdDscto.push(resNC[i]['Descuento']);
				tablaProdVOrig.push(resNC[i]['PrecioFinal']);
				tablaProdVFinal.push(resNC[i]['PrecioExtendido']);
				tablaProdVendedor.push(resNC[i]['Vendedor']);
				tablaProdIDPreventa.push('');
				$("#fechaDoctoRef").val(resNC[i]['FechaDocto']);
				var descPorcentaje = parseInt(((resNC[i]['Descuento'] * 100) / resNC[i]['PrecioFinal'])); // Calculo de % de descuento de la linea
				
				$("#tabla tr:last").after('<tr>'+
									'<td>'+resNC[i]['RecNumber']+'</td>'+ //Número de artículo
									'<td>'+resNC[i]['ALU']+'</td>'+ //Código de barras
									'<td>'+resNC[i]['DESC2']+'</td>'+ //Descripción completa del producto
									'<td>'+resNC[i]['DESC3']+'</td>'+ //Marca del producto
									'<td>'+resNC[i]['Cantidad']+'</td>'+ //Cantidad a comprar
									'<td>'+resNC[i]['Descuento']+'</td>'+ //Descuento Pesos $
									'<td>'+descPorcentaje+'</td>'+ //Descuento Porcentaje %
									'<td>'+resNC[i]['PrecioFinal']+'</td>'+ //Precio Original
									'<td>'+resNC[i]['PrecioExtendido']+'</td>'+ //Precio con descuento
									'<td>'+resNC[i]['Vendedor']+'</td>'+ //Vendedor
									'<td><input class="btn btn-danger btnEliminarProd" type="button" value="X"/></td>'+ //Botón eliminar
								'</tr>');
				acumTotal = acumTotal + resNC[i]['PrecioExtendido'];
			}
			$("#totalMPago").val(acumTotal); //asignar el valor de la variable total al input hidden #totalMPago para enviarlo a medio de pago
			console.log($("#totalMPago").val());
			$("#total").val(acumTotal);
			
			numeroDoctoNC = numeroDocto;
			bodegaNC = bodega;
			workstationNC = workstation;
			
			$("#numeroDoctoNC").val(numeroDoctoNC);
			$("#bodegaNC").val(bodegaNC);
			$("#workstationNC").val(workstationNC);	
			$("#tipoDoctoNC").val(tipoDocto);
		}
	});
};
//FIN FUNCION NOTAS DE CREDITO
/*FUCION PARA OBTENER Y ACTUALIZAR HORA*/
var intervalo; //variable utilizada para la función setInterval

function actualizarHora() {
    intervalo = setInterval(obtenerHora, 1000); //establecer intervalo de tiempo de actualización de 1 segundo (1000 milisegundos) y llamada a la función de obtener Hora
}

function obtenerHora() {
	var d = new Date(); //obtener fecha y hora del host
	var hora = d.getHours(); //obtener hora
	var minuto = d.getMinutes(); //obtener minuto
	var segundo = d.getSeconds(); //obtener segundo
	var time = (hora<10 ? '0' : '') + hora + ":" + (minuto<10 ? '0' : '')+ minuto + ":" + (segundo<10 ? '0' : '') + segundo;
	$("#hora").val(time); //establecer variable time al input hora
}
/*FIN OBTENER Y ACTUALIZAR HORA*/
/*FUNCIÓN OBTENER INFO DE USUARIO AGREGADO*/
function actualizarInfoUsuario(rut, nombre){
	$("#vpRut").val(rut);
	$("#vpNombre").val(nombre);
	$("#vpRut").css('width','100%');
	$("#agregarUsuario").css('display','none');
	
	//Cargar valores a los input hidden para enviar a medioPago.js
	$("#clienteRut").val($("#vpRut").val());
	$("#clienteNombre").val($("#vpNombre").val());
	console.log($("#clienteRut").val());
	//Fin cargar valores
};
/*FIN OBTENER INFO DE USUARIO*/
/* FUNCIÓN HABILITAR BOTON AGREGAR USUARIO */
function agregarUsuario(){
	console.log($("#vpRut").val());
	if(($("#vpRut").val() == '1-9') || ($("#vpRut").val() == '')){
		$("#vpRut").css('width','83%'); //Ancho de campo vpRut para ajustar campo y botón en la misma línea
		$("#agregarUsuario").css('display','block');
		$("#agregarUsuario").click(function(){
			//Abrir ventana para agregar usuario
			$.post('mpagoui/usuario.php', function(data) { //función POST para enviar montoPorPagar a efectivo.php
			//var win=window.open('about:blank','',"width=247, height=500");
				var win=window.open('AgregarUsuario',"","width=800, height=650");
				with(win.document){
					open();
					write(data);
					close();
				}
			});
			//Fin ventana agregar usuario
		});
	}else{
		$("#vpRut").css('width','100%');
		$("#agregarUsuario").css('display','none');
	}
};
/*FIN BOTON AGREGAR USUARIO*/
/*FUNCIÓN PARA RESCATAR LOS ID DE PREVENTAS O PRODUCTOS AGREGADOS DESDE LA VENTANA medioPago.php*/
function rescatarID(){
	//Rescatar información de cliente
	$("#vpRut").val(clienteRutP);
	$("#vpNombre").val(clienteNombreP);
	//Fin rescatar información cliente 
	var arregloID = []; //arreglo que almacena los ID de preventa o codigos de producto
	var splitID = ID.split(","); //Separar los elementos del arreglo obtenido desde medioPago.php
	var idTam = splitID.length; //obtener tamaño del arreglo
	for(i=0;i<idTam;i++){
		if(splitID[i] != ""){
			cargarInfoPreventa(splitID[i]);
			leerCodigo(splitID[i]); //función de vprincipal_tabla.js para cargar los elementos nuevamente en la tabla
			arregloID.push(splitID[i]); //agregar los productos provenientes de medioPago.php en el arreglo para poder volver a recuperarlos
		}
	}
	
	$("#ID").val(""); //Devolver ID a '' para agregar los nuevos valores
	$("#ID").val(arregloID); //asignar los valores cargados al arregloID en #ID
};
/*FIN FUNCION RESCATAR LOS IDS*/

/*FUNCIÓN PARA BUSCAR Y CARGAR INFORMACIÓN GENERAL DE LA PREVENTA*/
function cargarInfoPreventa(codigo){
	$.post('script/buscarInfoPreventa.php',{codigo:codigo},function(res){
		var resInfo = $.parseJSON(res);
		if(resInfo){
			if($("#vpRut").val() == '1-9'){
				$("#vpRut").val(resInfo['RutCliente']);
				$("#vpNombre").val(resInfo['Nombres']);
			}
			$("#vendedor").val(resInfo['Codigo']);
			
			//agregar valores a hidden para enviar a medio de pago
			if($("#vpRut").val() == '1-9'){
				$("#clienteRut").val($("#vpRut").val());
				$("#clienteNombre").val($("#vpNombre").val());
			}
			$("#vendedorNumero").val(resInfo['Codigo']);
			$("#vendedorNombre").val($("#vendedor").val());
		}		
	});
};
/*FIN FUNCIÓN PARA BUSCAR Y CARGAR INFO DE PREVENTA*/

//FINCTION PARA OBTENER CLASE
function hasClass(elem, className) {
	return elem.className.split(' ').indexOf(className) > -1;
}	
$(document).ready(function(){
	//ACTIVADOR DE EVENTOS DINÁMICOS
	document.addEventListener('click', function (e) {
		if (hasClass(e.target, 'descuento')) {
			var indice = $(e.target).parents('tr').index(); //e.target => $(this)
			var valorDescontar = $("#tabla tbody tr:eq("+indice+")").find("td").eq(7).html();
			$.post('mpagoui/descuento.php', {indice:indice, valorDescontar:valorDescontar}, function(data) { //función POST para enviar montoPorPagar a efectivo.php
				var win=window.open('MedioPagoEfectivo',"","width=600, height=200");
				with(win.document){
					open();
					write(data);
					close();
				}
			});
		}else if (hasClass(e.target, 'btnCambioPrecio')) {
			var nuevoValorOriginal = $("#precio").val();
			if(nuevoValorOriginal == ''){
				alert("Primero debe ingresar un valor para continuar.");
			}else{
				var acumTotal = 0;
				var indice = $(e.target).parents("tr").index();
				var cantidad = $("#tabla tbody tr:eq("+indice+")").find("td").eq(4).html();
				var valorActual = $("#tabla tbody tr:eq("+indice+")").find("td").eq(8).html();
				var nuevoValor = $("#precio").val() * parseInt(cantidad);
				var total = $("#total").val();
				var totalFinal = (parseInt(total) - parseInt(valorActual)) + parseInt(nuevoValor);
				$("#tabla tbody tr:eq("+indice+")").find("td").eq(7).html(nuevoValorOriginal);
				$("#tabla tbody tr:eq("+indice+")").find("td").eq(8).html(nuevoValor);
				
				var tamTabla = $("#tabla tbody tr").length;
				for(i=1;i<tamTabla;i++){
					acumTotal = parseInt(acumTotal) + parseInt($("#tabla tbody tr:eq("+i+")").find("td").eq(8).html());
				}
				
				$("#total").val(acumTotal); //Asignar resultado al campo total de vprincipal.php
				$("#totalMPago").val(acumTotal); //Asignar resultado al campo hidden totalMPago para enviar a medioPago.php
				tablaProdVFinal[indice-1] = nuevoValor; //Cambiar valor de vector de productos para que coincida en medioPago.php en XML
				tablaProdVOrig[indice-1] = nuevoValor / parseInt(cantidad);
				tablaProdDscto[indice-1] = 0;
				$('.precioExtendido').popover('hide');
			}
		}else if(hasClass(e.target, 'btnCambioCantidad')) {
			var nuevaCantidad = $("#cambioCantidad").val();
			if(nuevaCantidad == ''){
				alert("Primero debe ingresar un valor para continuar.");
			}else{
				var acumTotal = 0;
				var indice = $(e.target).parents("tr").index();
				var cantidadActual = $("#tabla tbody tr:eq("+indice+")").find("td").eq(4).html();
				var valorFinalActual = $("#tabla tbody tr:eq("+indice+")").find("td").eq(7).html();
				//CORREGIR CUANDO SE QUITA CANTIDAD Y EL PRODUCTO TIENE PROMOCION
				var descuento = $("#tabla tbody tr:eq("+indice+")").find("td").eq(5).html();
				var nuevoDescuento = parseInt(descuento) * parseInt(nuevaCantidad);
				$("#tabla tbody tr:eq("+indice+")").find("td").eq(5).html(nuevoDescuento);
				var nuevoValorFinal = (parseInt(valorFinalActual) * parseInt(nuevaCantidad))-(parseInt(descuento) * parseInt(nuevaCantidad));
				var total = $("#total").val();
				$("#tabla tbody tr:eq("+indice+")").find("td").eq(8).html(nuevoValorFinal);
				$("#tabla tbody tr:eq("+indice+")").find("td").eq(4).html(nuevaCantidad);
				
				var tamTabla = $("#tabla tbody tr").length;
				for(i=1;i<tamTabla;i++){
					acumTotal = parseInt(acumTotal) + parseInt($("#tabla tbody tr:eq("+i+")").find("td").eq(8).html());
				}
				
				$("#total").val(acumTotal); //Asignar resultado al campo total de vprincipal.php
				$("#totalMPago").val(acumTotal); //Asignar resultado al campo hidden totalMPago para enviar a medioPago.php
				
				tablaProdCantidad[indice-1] = nuevaCantidad;
				tablaProdVFinal[indice-1] = nuevoValorFinal;
				$('.cantidad').popover('hide');
			}
		}else if(hasClass(e.target, 'btnCambioPrecioFinal')) {
			var nuevoValorFinal = $("#precioFinal").val();
			if(nuevoValorFinal == ''){
				alert("Primero debe ingresar un valor para continuar.");
			}else{
				var acumTotal = 0;
				var indice = $(e.target).parents("tr").index();
				var cantidad = $("#tabla tbody tr:eq("+indice+")").find("td").eq(4).html();
				$("#tabla tbody tr:eq("+indice+")").find("td").eq(8).html(nuevoValorFinal);
				var tamTabla = $("#tabla tbody tr").length;
				for(i=1;i<tamTabla;i++){
					acumTotal = parseInt(acumTotal) + parseInt($("#tabla tbody tr:eq("+i+")").find("td").eq(8).html());
				}
				tablaProdVOrig[indice-1] = nuevoValorFinal / parseInt(cantidad);
				tablaProdDscto[indice-1] = 0;
				tablaProdVFinal[indice-1] = nuevoValorFinal;
				$("#total").val(acumTotal);
				$("#totalMPago").val(acumTotal);
				$('.precioFinal').popover('hide');
			}
		}else if(hasClass(e.target, 'btnCambioPrecioFinalCancelar')) {
			$('.precioFinal').popover('hide');
		}else if(hasClass(e.target, 'btnCambioCantidadCancelar')) {
			$('.cantidad').popover('hide');
		}else if(hasClass(e.target, 'btnCambioPrecioCancelar')) {
			$('.precioExtendido').popover('hide');
		}
	}, false);
	//FIN ACTIVADOR DE EVENTOS DINÁMICOS
	
	//Definir formato e idioma de DATEPICKER
	$.datepicker.regional['es'] = {
		closeText: 'Cerrar',
		dateFormat: 'dd-mm-yy',
		prevText: '<Ant',
		nextText: 'Sig>',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
		weekHeader: 'Sm',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
	
	//Agregar valores obtenidos desde login
	//Variables definidar por el usuario (bodega y workstation)
	var workstation = $("#caja").val();
	var bodega = $("#local").val();
	
	/*Activar Folio Manual para los casos Boleta Manual - Factura - Nota de crédito*/
	
	$("#tipoDocto").change(function(){
		var tipoDocto = $("#tipoDocto").val(); //variable tipoDocto para usar en función change del combobox
		if(tipoDocto == '1'){
			$("#tabla").find("td").each(function() {
				$(this).fadeOut("normal", function(){
				   $("#tabla").find("tr:gt(0)").remove();
				});
			});
			$("#codigo").prop('disabled',false);
			$("#codigo").focus();
			$("#total").val('');
		}else if(tipoDocto == '3'){
			$("#codigo").prop('disabled',true);
			$("#folioVP").prop('disabled',false);
			//Abrir POP UP para agregar información de la venta a anular
			$.post('mpagoui/notaCreditoBuscar.php', function(data) { //función POST para enviar montoPorPagar a efectivo.php
			//var win=window.open('about:blank','',"width=247, height=500");
				var win=window.open('MedioPagoEfectivo',"","width=400, height=570");
				with(win.document){
					open();
					write(data);
					close();
				}
			$("#tabla").find("td").each(function() {
				$(this).fadeOut("normal", function(){
				   $("#tabla").find("tr:gt(0)").remove();
				});
			});
			$("#codigo").focus();
			$("#total").val('');
			});
		}
	});
	
	$("#vendedor").select2(); //Inicializar select2 combobox Vendedores
	$("#cajero").select2(); //Inicializar select2 combobox Cajero
	
	//Cargar vendedores por módulo
	//$("#local").change(function(){
	$.post('script/obtenerVendedores_admin.php',function(res){
			var resVendedores = $.parseJSON(res);
			//alert(res);
			for(i=0;i<resVendedores.length;i++){
				$("#vendedor").append('<option value='+resVendedores[i]['slpCode']+'>'+resVendedores[i]['vendedor']+'</option>');
				$("#cajero").append('<option value='+resVendedores[i]['slpCode']+'>'+resVendedores[i]['vendedor']+'</option>');
			}
		});
	//});
	
	
	$("#cajero").val(nombre);
	//Fin valores obtenidos desde login
	
	$("#fecha").datepicker();
	
	agregarUsuario(); //agregar usuario si es necesario - Registro de usuario para venta 	
	//rescatarID(); //Rescatar el o los ID de preventa o productos al momento de volver de la ventana medioPago.php
	/*INICIO VALORES DEFINIDOS POR DEFECTO*/
	$("#vpRut").val('1-9');
	$("#vpNombre").val('CLIENTE GENERICO VICENCIO');
	/*FIN VALORES DEFINIDOS POR DEFECTO*/
	
	$("#codigo").focus();//Iniciar con el foco en campo de código para escanear
	
	/*FUNCION PARA CARGAR LA FECHA ACTUAL DEL EQUIPO*/
	var d = new Date(); //obtener fecha y hora del host
	var mes = d.getMonth()+1; //obtener mes actual
	var dia = d.getDate(); //obtener dia
	var fechaActual = (dia<10 ? '0' : '') + dia + '-' + (mes<10 ? '0' : '') + mes + '-' + d.getFullYear();
	$("#fecha").val(fechaActual);//establecer fechaActual al input fecha
	/*FIN CARGAR FECHA EQUIPO*/
	actualizarHora(); //functión para cargar y actualizar hora
	
	var arregloID = []; //arreglo que almacena los ID de preventa o codigos de producto
	
	var resCodigo;
	/*INICIO INTRODUCIR CÓDIGO PREVENTA O PRODUCTO*/
	$("#codigo").keydown(function(e){
		var code = e.keyCode || e.which;
		if(code == 13){			
			var codigo = $("#codigo").val(); // Cargar valor código de lectura
			/*INICIO FUNCION LEER Y CARGAR INFO GENERAL DE PREVENTA*/
			cargarInfoPreventa(codigo);
			/*FIN FUNCIÓN LEER Y CARGAR INFO GENERAL*/
			/*INICIO FUNCION LEER Y CARGAR PREVENTA O PRODUCTOS*/
			leerCodigo(codigo); //vprincipal_tabla.js
			//alert(resCodigo);
			var ID = $("#codigo").val(); //Obtener código de preventa o producto
			var IDActual = $("#ID").val(); //Guardar códigos anteriores en variale IDActual
			$("#ID").val(''); //Limpiar el #ID
			$("#ID").val(IDActual+','+ID); //Reasignar a #ID el valor del nuevo ingreso más los anteriores guardados
			console.log(IDActual+','+ID); //Mostrar por consola el valor del arreglo
			
			$("#codigo").val(""); //limpiar campo CODIGO dps de ingresar ticket o producto
			/*FIN FUNCION LEER Y CARGAR*/
		}
	});
	/*FIN INTRODUCIR CÓDIGO PREVENTA O PRODUCTO*/
	
	//INICIO TECLAS DE ACCESO RÁPIDO
	$(document).keydown(function(e){
		var code = e.keyCode || e.which;
		if(code == 116){ //BOTON F5
			return false; //return false; puede servir para las demás teclas definidas por el navegador, primer ejecutar código propio y 
						  //luego terminar antes de ejecutar la acción establecida, Ej. F11, F1, F6, entro otros.
		}		
	});
	//FIN TECLAS DE ACCESO RÁPIDO
	$("#medioPago").click(function(){
		//Variables definidar por el usuario (bodega y workstation)
		var workstation = $("#caja").val();
		var bodega = $("#local").val();		
		var contPrecioCero = 0;
		var tamTabla = $("#tabla tbody tr").length;
		for(i=1;i<tamTabla;i++){
			if($("#tabla tbody tr:eq("+i+")").find("td").eq(8).html() <= '0'){
				contPrecioCero++;
			}
		}
		if(contPrecioCero > 0){
			alert('No puede vender productos con valor final 0 o menor, por favor corrija antes de continuar.');
			return false;
		}else{
			if($("#total").val() == ""){
				alert("Para continuar con el pago debe agregar al menos un producto.")
				return false;
			}else if($("#total").val() <= 0){
				alert("El total de la venta no puede ser igual o inferior a 0")
				return false;
			}else{
				$("#clienteRut").val($("#vpRut").val());
				$("#clienteNombre").val($("#vpNombre").val());
				$("#fechaVP").val($("#fecha").val());
				$("#horaVP").val($("#hora").val());
				//Valores de vendedor
				$("#vendedorNumero").val($("#vendedor").val());
				var valorVendedor = $("#vendedor").val();
				var valorCajero = $("#cajero").val();
				var vendedorNombre = $("#vendedor option[value='"+valorVendedor+"']").text();
				var cajeroNombre = $("#cajero option[value='"+valorCajero+"']").text();
				$("#vendedorNombre").val(vendedorNombre);
				$("#vendedorNumero").val(valorVendedor);
				$("#cajeroNombre").val(cajeroNombre);
				$("#cajeroNumero").val(valorCajero);
				//Valores caja
				$("#bodega").val(bodega);
				$("#workstation").val(workstation);
				//Valor folio (tipo docto 2,3 y 4)
				var folioVP = $("#folioVP").val();
				$("#folioVPMedioPago").val(folioVP);
				for(i=0;i<tablaProdNum.length;i++){
					$("#tablaProdNum").val(tablaProdNum);
					$("#tablaProdALU").val(tablaProdALU);
					$("#tablaProdDesc").val(tablaProdDesc);
					$("#tablaProdMarca").val(tablaProdMarca);
					$("#tablaProdCantidad").val(tablaProdCantidad);
					$("#tablaProdDscto").val(tablaProdDscto);
					$("#tablaProdVOrig").val(tablaProdVOrig);
					$("#tablaProdVFinal").val(tablaProdVFinal);
					$("#tablaProdVendedor").val(tablaProdVendedor);
					$("#tablaProdIDPreventa").val(tablaProdIDPreventa);
					//Valores boleta
					$("#boletaTipoDocto").val($("#tipoDocto").val());
					//alert(tablaProdNum[i]+" "+tablaProdALU[i]+" "+tablaProdDesc[i]+" "+tablaProdMarca[i]+" "+tablaProdCantidad[i]+" "+tablaProdDscto[i]+" "+tablaProdVOrig[i]+" "+tablaProdVFinal[i]+" "+tablaProdVendedor[i]);
				}
			}
		}
	});
	
	$("#valorDolar").click(function(){
		$.post("script/obtenerMoneda.php",function(res){
			var dolar = parseFloat(res);
			alert("El Valor del Dolar del día de hoy es: $"+dolar.toFixed(2));
		});
	});
	
	//Cargar nombre de usuario si ya existe en la BD
	$("#vpRut").focusout(function(){
		cargarCliente();
	});
	
	//Cargar nombre de usuario su ya existe en la BD
	$("#vpRut").keydown(function(e){
		var code = e.keyCode || e.which;                               
		if(code == 13){       
			cargarCliente();
		}		
	});
	
	//Cerrar sesión
	$("#cerrarSesion").click(function(){
		var session_destroy = '<?php session_destroy();?>';
		location.href='index.php';
	});
});