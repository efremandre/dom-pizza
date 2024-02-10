<?php


$name = $_POST['name'];
$name = str_replace(['(',')','{','}','[', ']', '+', '=', '$', '_', '<', '>', '/', '/\/'], '', $name );

$phone = $_POST['tel'];
$phone = str_replace(['(',')','-','+',' '], '', $phone );

$productList = $_POST['productList'];
$productList = json_decode($productList, true);



$productListString = '';

foreach ($productList as $product) {
    
    $productListString .= 
        "ID: " . $product['productId']. "%0A" .
        "Название: " . $product['productName'] . "%0A" .
        "Количество: " . $product['productCurrent'] . "%0A" .
        "Цена шт.: " . $product['productPriceNum'] . " руб." . "%0A" .
        "Общая цена: " . $product['productPriceSummNum'] . " руб." . "%0A" .
        "__________" . "%0A %0A";
}

$rand = mt_rand();
$today = date("Y.m.d h:i:s G");

$token = "5897585110:AAEF-Rxg4jyhUe8CbFJZk-9NI99YitZbO1c";
$chat_id = "-1001833268569";

$arr = array(
	'👀 ЗАЯВКА С ФОРМЫ № ' => $rand,
	'от ' => $today . '%0A',
	'📞 Имя: ' => $name,
	'👽 Телефон: ' => $phone,
	'%0A' . '🛒 Заказ '. '%0A' => $productListString,
);

$txt = '';

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b>".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if (!$sendToTelegram) {
    $message = 'Что-то пошло не так и ничего не отправилось...';
} else {
    $message = $rand . $today;
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);