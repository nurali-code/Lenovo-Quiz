$(document).ready(function () {
    $('[data-target-class]').on('input', function (e) {
        const targetClass = $(this).attr('data-target-class');
        $(`.${targetClass}`).val($(this).val());
    });

    $('#first_form').on('submit', function (e) {
        e.preventDefault(); // вызываем метод preventDefault(), чтобы остановить отправку формы
        nextTab($(this).parents('.quiz-tab'));
    });

    $('.quiz-next').on('click', function (e) {
        nextTab($(this).parents('.quiz-tab'));
    });

    function nextTab(quizTab) {
        if (quizTab.find('input[type="radio"]:checked').length > 0 || quizTab.hasClass('quiz-form')) {
            quizTab.removeClass('active');
            quizTab.next('.quiz-tab').addClass('active');
        } else {
            alert('Пожалуйста, выберите хотя бы один вариант ответа.');
        }
    }


    $('.dropdown-btn').on('click', function (e) {
        $(this).toggleClass('active');
        $(this).next('.dropdown-content').slideToggle();
    })

    $('input[name="u-phone"]').inputmask({ "mask": "8-(999)-999-99-99" });


});