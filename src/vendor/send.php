<?php
$name = $_POST['name'];
$name = str_replace(['(',')','{','}','[', ']', '+', '=', '$', '_', '<', '>', '/', '/\/'], '', $name );

$phone = $_POST['tel'];
$phone = str_replace(['(',')','-','+',' '], '', $phone );

$message = $_POST['message'];
$message = str_replace(['(',')','{','}','[', ']', '+', '=', '$', '_', '<', '>', '/', '/\/'], '', $message );

$rand = mt_rand();
$today = date("Y.m.d h:i:s G");

$token = "";
$chat_id = "";

$arr = array(
	'👀 ЗАЯВКА С ФОРМЫ № ' => $rand,
	'от ' => $today . '%0A',
	'Имя: ' => $name,
	'Телефон: ' => $phone,
	'Сообщение: ' => $message
);

foreach($arr as $key => $value) {
    $txt .= "<b>".$key."</b>".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if (!$sendToTelegram) {
    $message = 'Что-то пошло не так и ничего не отправилось...';
} else {
    $message = 'Ваша заявка отправлена!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);