<?php
	session_start();
	$prueba = $_POST['ID'];
	echo $prueba;
?>;

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>LOGIN</title>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<link href="css/bootstrap.css" rel="stylesheet">
		<link href="css/vista.css" rel="stylesheet">
		
		<script src="js/jquery.min.js"></script>
		<script src="js/bootstrap.js"></script>
		<script src="js/datepicker.js"></script>
		<script src="js/mpago/descuentos.js"></script>
		
		<!-- SCRIPT ESPECIAL PARA OBTENER MONTO POR PAGAR DESDE VENTANA PADRE -->
		<script>
			<?php
				echo "var indice = '{$_POST['indice']}';";
				echo "var valorDescontar = '{$_POST['valorDescontar']}';";
				echo "var bodegaD = '{$_SESSION['bodega']}';";
			?>
		</script>
		<!-- FIN SCRIPT ESPECIAL -->
		
	</head>
	<body>
		<div class="contenedor">
			<!-- INICIO ROW ENCABEZADO -->
			<div class="row">
				<center><h2>Seleccionar % de descuento</h2></center>
			</div>
			<hr>
			<!-- FIN INO DEL LOCAL Y TOTAL -->
			<!-- INICIO MEDIOS DE PAGO -->
			<div class="row">
				<div class="col-md-12">
					<center>
						<button class="btn btn-default btnDescuento">0%</button>
						<button class="btn btn-default btnDescuento">10%</button>
						<button id ='20'class="btn btn-default btnDescuento" disabled>20%</button>
						<button id ='30'class="btn btn-default btnDescuento" disabled>30%</button>
						<button id ='40'class="btn btn-default btnDescuento" disabled>40%</button>
						<button id ='50'class="btn btn-default btnDescuento" disabled>50%</button>
					</center>
				</div>
				<br>
				<center>
					<button id="cancelar" class="btn btn-default">Cancelar</button>
				</center>
			</div>
			<!-- FIN MEDIOS DE PAGO -->
		</div>
	</body>
</html>