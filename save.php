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

// Загрузка содержимого основного JSON-файла
$jsonData = file_get_contents('data.json');
$dataArray = json_decode($jsonData, true);

// Загрузка содержимого файла с подарками
$presentsData = file_get_contents('presents.json');
$presentsArray = json_decode($presentsData, true);

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

// Обновление счетчиков в `presents.json`
if ($type == "Online-подписка") {
    $presentsArray[0]['online']+=1;
} elseif ($type == "Offline") {
    if ($country == 'Казахстан') {
        $presentsArray[0]['kz']+=1;
    } elseif ($country == 'Узбекистан') {
        $presentsArray[0]['uz']+=1;
    }
}

// Преобразование массивов обратно в JSON
$newJsonData = json_encode($dataArray, JSON_PRETTY_PRINT);
$newPresentsData = json_encode($presentsArray, JSON_PRETTY_PRINT);

// Запись обновленных данных обратно в файлы
file_put_contents('data.json', $newJsonData);
file_put_contents('presents.json', $newPresentsData);

// Отправка ответа клиенту
echo "saved";
?>
