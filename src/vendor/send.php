<?php
$name = $_POST['name'];
$name = str_replace(['(',')','{','}','[', ']', '+', '=', '$', '_', '<', '>', '/', '/\/'], '', $name );

$phone = $_POST['tel'];
$phone = str_replace(['(',')','-','+',' '], '', $phone );

$totalData = $_POST['totalData'];
$productList = $_POST['productList'];
$totalData = json_decode($totalData, true);
$productList = json_decode($productList, true);

$totalCurrentString = $totalData['totalCurrent'];
$totalSumString = $totalData['totalSum'];
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

$rand = mt_rand(10000, 99999);
$today = date("d.m.Y");
$time = date("H:i");

$token = "5897585110:AAEF-Rxg4jyhUe8CbFJZk-9NI99YitZbO1c";
$chat_id = "-1001833268569";

$arr = array(
	'👀 ЗАЯВКА С ФОРМЫ № ' => $rand,
	'от ' => $today . ' ' . $time . '%0A',
	'👽 Имя: ' => $name,
	'📞 Телефон: ' => $phone,
	'%0A' . '🛒 Содержимое корзины '. '%0A' . 'Общее кол-во: ' => $totalCurrentString,
	'Общее сумма: ' => $totalSumString . "руб.",
	'%0A' . 'Список блюд '. '%0A' => $productListString,
);

$txt = '';

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b>".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if (!$sendToTelegram) {
    $message = 'Что-то пошло не так <br> и ничего не отправилось :(';
} else {
	$message = json_encode(['rand' => $rand, 'today' => $today, 'time' => $time]);
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);