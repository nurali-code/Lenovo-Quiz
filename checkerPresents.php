<?php
// Получение данных из формы
$company = $_POST['u_company'] ?? null;
$email = $_POST['u_email'] ?? null;

// Загрузка содержимого JSON-файла
$jsonData = file_get_contents('presents.json');
$dataArray = json_decode($jsonData, true);

// Проверка наличия данных
if ($dataArray !== null) {
    $kz = false;
    $uz = false;
    $online = false;

    foreach ($dataArray as $item) {
        if ($item['kz'] == $item['kz-tot']) {
            $kz = true;
        }

        if ($item['uz'] == $item['uz-tot']) {
            $uz = true;
        }

        if ($item['online'] == $item['online-tot']) {
            $online = true;
        }

        // Прерываем цикл, если все три условия выполнены
        if ($kz && $uz && $online) {
            break;
        }
    }

    // Вывод результата 
    if ($kz && $uz && $online) {
        echo "FINISHED.";
    } elseif (!$kz && !$uz && !$online) {
        echo "ALL";
    } else {
        echo "Status: ";
        echo $kz ? "KZ." : "";
        echo $uz ? "UZ." : "";
        echo $online ? "ONLINE." : "";
    }
} else {
    echo "Ошибка при чтении JSON-файла.";
} ?>