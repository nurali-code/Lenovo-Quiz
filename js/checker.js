$(document).ready(function () {
    window.stat = { kz: false, uz: false, online: false };
    function activateQuiz() {
        $('.quiz-form.quiz-tab').addClass('active')
        $('.main-loader').remove()
    }
    function endedQuiz() {
        $('.quiz-thanks').find('h3').text('Викторина окончена!');
        $('.quiz-thanks').find('p').text('Спасибо за участие!');
        $('.quiz-thanks').find('img').hide();
        $('.quiz-thanks').addClass('active');
        $('.main-loader').remove()
    }
    $.ajax({
        type: 'GET',
        url: 'checkerPresents.php',
        dataType: 'text',
        success: function (response) {
            response = response.trim();
            console.log(response);
            if (response === "FINISHED.") { endedQuiz() }
            else if (response === "ALL") { activateQuiz() } else if (response.startsWith("Status:")) {
                let statuses = response.replace("Status: ", "").split(". ");
                statuses.forEach(function (status) {
                    activateQuiz()
                    if (status.includes("KZ")) { window.stat.kz = true; }
                    if (status.includes("UZ")) { window.stat.uz = true; }
                    if (status.includes("ONLINE")) { window.stat.online = true; }
                });
            } else {
                console.error("Ошибка от PHP: " + response);
                alert("Произошла ошибка при чтении данных. Попробуйте позже.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Произошла ошибка AJAX-запроса:", status, error);
            alert("Ошибка соединения. Попробуйте еще раз.");
        }
    });
});
