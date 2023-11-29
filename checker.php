<?php
// Получение данных из формы
$company = $_POST['u_company'];
$email = $_POST['u_email'];

// Загрузка содержимого JSON-файла
$jsonData = file_get_contents('data.json');

// Преобразование JSON в массив
$dataArray = json_decode($jsonData, true);

// Проверка наличия данных
if ($dataArray !== null) {
    $companyExists = false;
    $emailExists = false;

    foreach ($dataArray as $item) {
        // Проверка существования компании
        if ($item['u_company'] === $company) {
            $companyExists = true;
        }

        // Проверка существования почты
        if ($item['u_email'] === $email) {
            $emailExists = true;
        }

        // Прерываем цикл, если оба условия уже выполнены
        if ($companyExists && $emailExists) {
            break;
        }
    }

    // Проверка количества компаний
    $countCompany = 0;
    foreach ($dataArray as $item) {
        if ($item['u_company'] === $company) {
            $countCompany++;
        }
    }

    // Вывод результата
    if ($emailExists) {
        echo "email_false";
    } else {
        if ($companyExists) {
            if ($countCompany == 3) {
                echo "company_false ";
            }
        }
    }

} else {
    // echo "Ошибка при чтении JSON-файла.";
}
?>