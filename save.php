<?php
// Получение данных из формы
$name = isset($_POST['u_name']) ? $_POST['u_name'] : '';
$surname = isset($_POST['u_surname']) ? $_POST['u_surname'] : '';
$email = isset($_POST['u_email']) ? $_POST['u_email'] : '';
$company = isset($_POST['u_company']) ? $_POST['u_company'] : '';
$country = isset($_POST['u_country']) ? $_POST['u_country'] : '';
$city = isset($_POST['u_city']) ? $_POST['u_city'] : '';
$phone = isset($_POST['u_phone']) ? $_POST['u_phone'] : '';
$type = isset($_POST['u_type']) ? $_POST['u_type'] : '';
$address = isset($_POST['u_address']) ? $_POST['u_address'] : '';
$time = isset($_POST['u_time']) ? $_POST['u_time'] : '';

// Загрузка содержимого JSON-файла
$jsonData = file_get_contents('data.json');

// Преобразование JSON в массив
$dataArray = json_decode($jsonData, true);

// Создание нового объекта с данными из формы
$newData = [
    'u_name' => $name,
    'u_surname' => $surname,
    'u_email' => $email,
    'u_company' => $company,
    'u_country' => $country,
    'u_city' => $city,
    'u_type' => $type,
    'u_phone' => $phone,
    'u_address' => $address,
    'u_time' => $time
];

// Добавление новых данных в массив
$dataArray[] = $newData;

// Преобразование массива обратно в формат JSON
$newJsonData = json_encode($dataArray, JSON_PRETTY_PRINT);

// Запись обновленных данных обратно в JSON-файл
file_put_contents('data.json', $newJsonData);

// Отправка ответа клиенту
echo "saved";
?>
