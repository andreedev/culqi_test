<?php
// Incluir librerías Requests y CulqiPHP
require_once 'libraries/Requests/library/Requests.php';
Requests::register_autoloader();
require_once 'libraries/culqi-php/lib/culqi.php';

//Guarda los datos enviados en la DB
$precio = $_POST['precio'];
$descripcion = $_POST['descripcion'];
$email = $_POST['email'];
$token = $_POST['token'];

try {
	$SECRET_KEY = "sk_test_67522cbd45b8c4b7";
	$culqi = new Culqi\Culqi(array('api_key' => $SECRET_KEY));
	$charge = $culqi->Charges->create(
	array(
		"amount" => $precio,
		"capture" => true,
		"currency_code" => "PEN",
		"description" => $descripcion,
		"installments" => 0,
		"email" => $email,
		"source_id" => $token,
		)
	);
	
	header('Content-type: application/json; charset=utf-8');
	echo json_encode($charge);
} catch (Exception $e) {
	echo $e->getMessage();
}