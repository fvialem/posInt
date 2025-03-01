//FUNCION ELIMINAR ITEM DE LA TABLA
function eliminarProd(){
	
	$(".btnEliminarProd").click(function(){
		$(this).parents("tr").fadeOut("normal", function(){ //efecto para eliminar con un fadeout
		
			var indice = $(this).index(); //Obtener el índice del elemento a eliminar para eliminarlo de los arreglos 
			for(i=indice-1;i<tablaProdNum.length;i++){ //Ciclo para sobreescribir los valores de las posiciones siguientes
				tablaProdNum[i] = tablaProdNum[i+1];
				tablaProdALU[i] = tablaProdALU[i+1];
				tablaProdDesc[i] = tablaProdDesc[i+1];
				tablaProdMarca[i] = tablaProdMarca[i+1];
				tablaProdCantidad[i] = tablaProdCantidad[i+1];
				tablaProdDscto[i] = tablaProdDscto[i+1];
				tablaProdVOrig[i] = tablaProdVOrig[i+1];
				tablaProdVFinal[i] = tablaProdVFinal[i+1];
				tablaProdVendedor[i] = tablaProdVendedor[i+1];
				tablaProdIDPreventa[i] = tablaProdIDPreventa[i+1];
			}
			var valorRestar = $(this).find("td").eq(8).html(); //obtener el valor que se va a restar al total
			var totalActual = $("#total").val(); //guardar el valor total actual para restarlo y obtener el resultado de la resta
			$("#total").val(totalActual-valorRestar); //asignar al input #total el valor de la resta
			$("#totalMPago").val($("#total").val()); //asignar el valor del input #total al input hidden #totalMPago para enviarlo a medio de pago
			tablaProdNum.pop();		//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdALU.pop();		//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdDesc.pop();	//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdMarca.pop();	//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdCantidad.pop();//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdDscto.pop();	//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdVOrig.pop();	//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdVFinal.pop();	//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdVendedor.pop();//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
			tablaProdIDPreventa.pop();//Eliminar el último valor del arreglo (repetido debido al proceso de sobreescribir la celda anterior)
           	$(this).remove(); //eliminar elemento de la tabla
			$("#numItems").val(parseInt($("#numItems").val()) - 1);
		});
		$("#codigo").focus(); //volver al campo de entrada de código
	});
	
};
//FIN ELIMINAR ITEM

/*FUNCION PADRE PARA RECIBIR DESCUENTO*/
function recibirDescuento(descuento, valorDescuento, indice){
	if(descuento == 0){
		var acumTotal = 0;
		var cantidad = $("#tabla tbody tr:eq("+indice+")").find("td").eq(4).html();
		var valorOriginal = $("#tabla tbody tr:eq("+indice+")").find("td").eq(7).html();
		var total = $("#total").val();
		var descuentoActual = $("#tabla tbody tr:eq("+indice+")").find("td").eq(5).html();
		var valorFinal = (parseInt(valorOriginal) * parseInt(cantidad)) - (parseInt(0) * parseInt(cantidad));
		$("#tabla tbody tr:eq("+indice+")").find("td").eq(5).html(0);
		$("#tabla tbody tr:eq("+indice+")").find("td").eq(6).html(0);
		
		$("#tabla tbody tr:eq("+indice+")").find("td").eq(8).html(valorFinal);
		
		var tamTabla = $("#tabla tbody tr").length;
		for(i=1;i<tamTabla;i++){
			acumTotal = parseInt(acumTotal) + parseInt($("#tabla tbody tr:eq("+i+")").find("td").eq(8).html());
		}
		
		$("#total").val(acumTotal);
		$("#totalMPago").val(acumTotal);
		
		tablaProdDscto[indice-1] = 0;		//Valor descuento (porcentaje) por cantidad			
		tablaProdVFinal[indice-1] = parseInt(valorFinal); //valor final operado por la multiplicación de las cantidades ()
	}else{
		//Función para redondear el descuento y cuadrarlo a 0
		var acumTotal = 0;
		$("#tabla tbody tr:eq("+indice+")").find("td").eq(6).html(descuento);
		var valorDescuentoString = valorDescuento.toString(); 
		var valorDescuentoSplit = valorDescuentoString.split('');
		console.log(valorDescuentoSplit.length);
		valorDescuentoSplit[(valorDescuentoSplit.length - 1)] = 0;
		var cantidad = $("#tabla tbody tr:eq("+indice+")").find("td").eq(4).html();
		var descuentoActual = $("#tabla tbody tr:eq("+indice+")").find("td").eq(5).html();
		
		var valorOriginal = $("#tabla tbody tr:eq("+indice+")").find("td").eq(7).html();
		var valorDescuentoJoin = valorDescuentoSplit.join(''); //Valor unificado del descuento
		$("#tabla tbody tr:eq("+indice+")").find("td").eq(5).html(parseInt(valorDescuentoJoin) * parseInt(cantidad));
		var valorFinal = (parseInt(valorOriginal) * parseInt(cantidad)) - (parseInt(valorDescuentoJoin) * parseInt(cantidad)); //Valor calculado del valor original - descuento (por cantidad)
		$("#tabla tbody tr:eq("+indice+")").find("td").eq(8).html(valorFinal);
		//Fin función redondeo y cuadre
		//Restar valor de descuento al total ya que el total se define al momento de cargar el o los artículos
		var total = parseInt($("#total").val());
		
		var tamTabla = $("#tabla tbody tr").length;
		for(i=1;i<tamTabla;i++){
			acumTotal = parseInt(acumTotal) + parseInt($("#tabla tbody tr:eq("+i+")").find("td").eq(8).html());
		}
		$("#total").val(acumTotal);
		$("#totalMPago").val(acumTotal);
		//Re ajustar valores en los vectores
		tablaProdDscto[indice-1] = parseInt(valorDescuentoJoin) * parseInt(cantidad);		//Valor descuento (porcentaje) por cantidad			
		tablaProdVFinal[indice-1] = parseInt(valorFinal); //valor final operado por la multiplicación de las cantidades ()
		console.log(tablaProdDscto[indice-1]);
		console.log(tablaProdVFinal[indice-1]);
	}
	
};
/*FUN FUNCION DESCUENTO*/

/*CAMBIO PRECIO*/
function cambioPrecio(){
	$('.precioExtendido').popover({ 
		placement: 'left',
        //title: 'Cambio precio',
        html:true,
        content: $('#formCambioPrecio').html()
		
	});
	
	$("#precio").keydown(function(e){
		var code = e.keyCode || e.which;  
		if(code == 13){
			return false;
		}
	});
};
/*FIN CAMBIO PRECIO*/
/*FUNCION CAMBIO DE CANTIDAD*/
function cambioCantidad(){
	$('.cantidad').popover({ 
		placement: 'left',
        //title: 'Cambio precio',
        html:true,
        content: $('#formCambioCantidad').html()
	});
};
/*FIN CAMBIO CANTIDAD*/
/*FUNCION CAMBIO PRECIO FINAL*/
function cambioPrecioFinal(){
	$('.precioFinal').popover({ 
		placement: 'left',
        //title: 'Cambio precio',
        html:true,
        content: $('#formCambioPrecioFinal').html()
	});
};
/*FIN CAMBIO PRECIO FINAL*/
//FUNCIÓN PARA VER SI EL PRODUCTO ESCANEADO YA SE ENCUENTRA EN LA TABLA
function comprobarListaProducto(codigo, vendedor){
	var indice = 0;
	$('#tabla tbody tr').each(function (index2){ 
		var ALU = $(this).find("td").eq(1).html(); //Comprobar si el código del producto enviado se repite en la columna ALU
		var vend = $(this).find("td").eq(9).html();
		if ((codigo == ALU) && (vendedor == vend)){ //si hay coincidencia
			indice = index2;
		}
	});
	return indice; //devolver indice
}
//FIN FUNCION PARA COMPROBACIÓN DE PRODUCTO ESCANEADO

//FUNCIÓN PARA RETORNAR LA CANTIDAD ACTUAL EN CASO QUE SE ENCUENTRE EN LA LISTA
function comprobarCantidad(codigo, vendedor){
	var cantidad = 0;
	$('#tabla tbody tr').each(function (index2){ 
		var ALU = $(this).find("td").eq(1).html(); //Comprobar si el código del producto enviado se repite en la columna ALU
		var vend = $(this).find("td").eq(9).html();
		var cant = $(this).find("td").eq(4).html(); //Cantidad actual del en la lista
		if ((codigo == ALU)){ //devolver la cantidad del código independiente del vendedor.
			cantidad = cant;
		}
	});
	return cantidad; //devolver cantidad
}
//FIN FUNCION PARA RETORNAR LA CANTIDAD

function leerCodigo(codigo){
	/*FUNCION AGREGAR PRODUCTOS DESDE PREVENTA O PRODUCTO*/
	var rut = $("#vpRut").val();
	var bodega = $("#local").val();
	$.post('script/buscarCodigo_admin.php', {codigo:codigo, rut:rut, bodega:bodega}, function(res){
		 //Producto no encontrado
		var resProductos = $.parseJSON(res);
		//CONTROLAR VALOR CAMPO 'total', SI NO HAY NADA ASIGNAR UN 0 PARA QUE NO HAYA PROBLEMAS EN LA SUMA
		if($("#total").val() == ''){
			var total = 0; //Total es 0
		}else{
			var total = parseInt($("#total").val()); //Total es el valor actual del campo TOTAL
		}
		//FIN CONTROL
		if(!resProductos){ //SI NO ENCONTRÓ RESULTADOS EN LA BÚSQUEDA DE PREVENTAS
			alert("No se ha encontrado Preventa o Producto");
			window.resTabla = 0; // Cargar en la variable global resCodigo 0 porque no se encontró preventa o producto
			//alert(window.resCodigo);
		}else{
			var indiceCantEncontrado;
			var cantLotes = 0;
			for(i=0;i<resProductos.length;i++){
				var conteoTotal = 0;
				if(resProductos[i]['Vendedor'] == '' && $("#vendedor").val() == ''){
					alert("Primero debe ingresar un vendedor para agregar el producto a la venta.");
					return false;
				}else if(resProductos[i]['Vendedor'] == ''){
					var vendedor = $("#vendedor").val();
				}else{
					var vendedor = resProductos[i]['Vendedor'];
				}
				cantLotes = comprobarCantidad(resProductos[i]['ALU'], vendedor);
				if(resProductos[i]['CantidadLotes'] <= 0){ //Comprobar si lotesDisponibles es mayor a 0
					alert("No hay lotes disponibles");
				}else if((parseInt(cantLotes) + parseInt(resProductos[i]['Cantidad']))> resProductos[i]['CantidadLotes']){ //Comprobar si la cantidad encontrada + la cantidad del producto o preventa escaneado es mayor a lotesDisponibles
					alert("No hay suficientes lotes disponibles para la cantidad que se desea comprar");
				}else{
					indiceCantEncontrado = comprobarListaProducto(resProductos[i]['ALU'], vendedor); //función para comprobar si el o los productos ingresados ya se encuentran en la tabla
					if(indiceCantEncontrado > 0){
						//alert("#tabla tbody tr:eq("+indiceCantEncontrado+")");
						
						var cantAnterior = $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(4).html(); //obtener el valor de la cantidad existente
						var cantActual= parseInt(cantAnterior) + resProductos[i]['Cantidad']; //sumarle la cantidad que viene definida por la preventa (1 si es producto) a la cantidad existente
						$("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(4).html(cantActual); // actualizar la tabla con la nueva suma
						
						//var descActual = 0;
						//$("#totalItems").val(parseInt($("#totalItems").val()) + parseInt(cantActual));
						var cantProm = parseInt(resProductos[i]['cantPromocion']);
						if((parseInt(resProductos[i]['cantPromocion'])>1) && (cantActual % cantProm == 0)){
							var cantDescProm = cantActual / resProductos[i]['cantPromocion'];
							var promocion = resProductos[i]['Descuento'] * cantDescProm;
							var precioFinal = $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(8).html();
							var descActual = (cantActual * parseInt(resProductos[i]['PrecioExtendido'])) - promocion;
							total = total - precioFinal;
							total = total + promocion;
						
							
							$("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(8).html(promocion);
							$("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(5).html(descActual);
							//Modificar los arreglos de tabla de productos
							tablaProdCantidad[indiceCantEncontrado-1] = cantActual;
							tablaProdDscto[indiceCantEncontrado-1] = descActual;
							tablaProdVFinal[indiceCantEncontrado-1] = promocion;
							
						}else if(parseInt(resProductos[i]['cantPromocion']) == 1){
							var cantActual =  $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(4).html();
							var descAnterior = $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(5).html(); //obtener el valor del descuento $ existente
							var descActual= parseInt(descAnterior) + resProductos[i]['Descuento']; //sumarle lel descuento que viene definida por la preventa (0 si es producto) a la cantidad existente
							$("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(5).html(descActual); // actualizar la tabla con la nueva suma
							
							var precioOriginal = $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(7).html(); //obtener el valor de precio original existente
							var valorFinal = (cantActual * precioOriginal) - descActual;
							$("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(8).html(valorFinal); // actualizar el valor final con la operación anterior
							
							total = total + (valorFinal / cantActual);
							
							//Modificar los arreglos de tabla de productos
							tablaProdCantidad[indiceCantEncontrado-1] = cantActual;
							tablaProdDscto[indiceCantEncontrado-1] = descActual;
							tablaProdVFinal[indiceCantEncontrado-1] = valorFinal;
						}else{
							var precio = resProductos[i]['PrecioExtendido'];
							var precioFinalActual = $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(8).html();
							var valorFinal = parseInt(precioFinalActual) + parseInt(precio);
							var descActual = $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(5).html();
							var cantActual =  $("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(4).html();
							$("#tabla tbody tr:eq("+indiceCantEncontrado+")").find("td").eq(8).html(valorFinal);
							total = total + parseInt(precio);
							
							tablaProdCantidad[indiceCantEncontrado-1] = cantActual;
							tablaProdDscto[indiceCantEncontrado-1] = descActual;
							tablaProdVFinal[indiceCantEncontrado-1] = valorFinal;
						}
					}else{
						var descPorcentaje = parseInt(((resProductos[i]['Descuento'] * 100) / resProductos[i]['PrecioFinal'])); // Calculo de % de descuento de la linea
						if(resProductos[i]['Descuento'] > 0 && (resProductos[i]['cantPromocion'] != resProductos[i]['Cantidad'])){
							$("#tabla tr:last").after('<tr>'+
								'<td>'+resProductos[i]['RecNumber']+'</td>'+ //Número de artículo
								'<td>'+resProductos[i]['ALU']+'</td>'+ //Código de barras
								'<td>'+resProductos[i]['DESC2']+'</td>'+ //Descripción completa del producto
								'<td>'+resProductos[i]['DESC3']+'</td>'+ //Marca del producto
								'<td class="cantidad">'+resProductos[i]['Cantidad']+'</td>'+ //Cantidad a comprar
								'<td >0</td>'+ //Descuento Pesos $
								'<td class="descuento">'+descPorcentaje+'</td>'+ //Descuento Porcentaje %
								'<td class="precioExtendido">'+resProductos[i]['PrecioFinal']+'</td>'+ //Precio Original
								'<td class="precioFinal">'+resProductos[i]['PrecioExtendido']+'</td>'+ //Precio con descuento
								'<td>'+vendedor+'</td>'+ //Vendedor
								'<td><input class="btn btn-danger btnEliminarProd" type="button" value="X"/></td>'+ //Botón eliminar
							'</tr>');
							var descuento = 0;
						}else if(resProductos[i]['Descuento'] > 0 && resProductos[i]['cantPromocion'] >= 1){
							$("#tabla tr:last").after('<tr>'+
								'<td>'+resProductos[i]['RecNumber']+'</td>'+ //Número de artículo
								'<td>'+resProductos[i]['ALU']+'</td>'+ //Código de barras
								'<td>'+resProductos[i]['DESC2']+'</td>'+ //Descripción completa del producto
								'<td>'+resProductos[i]['DESC3']+'</td>'+ //Marca del producto
								'<td class="cantidad">'+resProductos[i]['Cantidad']+'</td>'+ //Cantidad a comprar
								'<td >'+resProductos[i]['Descuento']+'</td>'+ //Descuento Pesos $
								'<td class="descuento">'+descPorcentaje+'</td>'+ //Descuento Porcentaje %
								'<td class="precioExtendido">'+resProductos[i]['PrecioFinal']+'</td>'+ //Precio Original
								'<td class="precioFinal">'+resProductos[i]['PrecioExtendido']+'</td>'+ //Precio con descuento
								'<td>'+vendedor+'</td>'+ //Vendedor
								'<td><input class="btn btn-danger btnEliminarProd" type="button" value="X"/></td>'+ //Botón eliminar
							'</tr>');
							var descuento = resProductos[i]['Descuento'];
						}else{
							$("#tabla tr:last").after('<tr>'+
								'<td>'+resProductos[i]['RecNumber']+'</td>'+ //Número de artículo
								'<td>'+resProductos[i]['ALU']+'</td>'+ //Código de barras
								'<td>'+resProductos[i]['DESC2']+'</td>'+ //Descripción completa del producto
								'<td>'+resProductos[i]['DESC3']+'</td>'+ //Marca del producto
								'<td class="cantidad">'+resProductos[i]['Cantidad']+'</td>'+ //Cantidad a comprar
								'<td>'+0+'</td>'+ //Descuento Pesos $
								'<td class="descuento">'+0+'</td>'+ //Descuento Porcentaje %
								'<td class="precioExtendido">'+resProductos[i]['PrecioFinal']+'</td>'+ //Precio Original
								'<td class="precioFinal">'+resProductos[i]['PrecioFinal']+'</td>'+ //Precio con descuento
								'<td>'+vendedor+'</td>'+ //Vendedor
								'<td><input class="btn btn-danger btnEliminarProd" type="button" value="X"/></td>'+ //Botón eliminar
							'</tr>');
							//total = total + parseInt(resProductos[i]['PrecioExtendido']); //Acumulación del valor de suma total de la compra
							var descuento = 0;
						}
						
						cambioPrecio(); //Actualizar funcion con popover para cambio de valores de la tabla
						cambioPrecioFinal(); //Actualizar función con popover para cambio de precio final de la tabla
						eliminarProd(); //Actualizar función con los items agregados para poder eliminarlos
						cambioCantidad(); //Actualizar función con popover para cambio de cantidad de la tabla
						//descuentoProd(); //Actualizar función para agregar descuentos
						tablaProdNum.push(resProductos[i]['RecNumber']);
						tablaProdALU.push(resProductos[i]['ALU']);
						tablaProdDesc.push(resProductos[i]['DESC2']);
						tablaProdMarca.push(resProductos[i]['DESC3']);
						tablaProdCantidad.push(resProductos[i]['Cantidad']);
						tablaProdDscto.push(descuento);
						tablaProdVOrig.push(resProductos[i]['PrecioFinal']);
						tablaProdVFinal.push(resProductos[i]['PrecioExtendido']);
						tablaProdVendedor.push(vendedor);
						tablaProdIDPreventa.push(resProductos[i]['IDPreventa']);
						$("#numItems").val(parseInt($("#numItems").val()) + 1);
						//$("#totalItems").val(parseInt($("#totalItems").val()) + parseInt(resProductos[i]['Cantidad']));
						total = total + parseInt(resProductos[i]['PrecioExtendido']); //Acumulación del valor de suma total de la compra
					}
				}	
			}
			
			$("#totalMPago").val(total); //asignar el valor de la variable total al input hidden #totalMPago para enviarlo a medio de pago
			$("#total").val(total); //Asignar el valor sumado en el acumulador 'total' y asignarlo al campo TOTAL
			window.resTabla = 1;
		}
	});
	/*FIN AGREGAR PRODUCTOS PREVENTA O PRODUCTO*/
	return window.resTabla;
};