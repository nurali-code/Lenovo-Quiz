$(document).ready(function () {
    $('[data-target-class]').on('input', function (e) {
        const targetClass = $(this).attr('data-target-class');
        $(`.${targetClass}`).val($(this).val());
    });

    $('#first_form').on('submit', function (e) {
        e.preventDefault(); // вызываем метод preventDefault(), чтобы остановить отправку формы
        nextTab($(this).parents('.quiz-tab'));
    });

    const answers = { q1: 2, q2: 3, q3: 1, q4: 4, q5: 1, q6: 2, q7: 5, q8: 4, q9: 4, q10: 2, q11: 2, q12: 2, q13: 1, q14: 2, q15: 3, q16: 2, q17: 1, q18: 2, q19: 2 };

    $('.quiz-next').on('click', function (e) {

        var selectedRadio = $(this).parent().find('input[type=radio]:checked');
        var allRadios = $(this).parent().find('input[type=radio]');

        if (selectedRadio.length > 0) {
            var name = selectedRadio.attr('name');
            var value = selectedRadio.val();
            if (answers[name] == value) {
                selectedRadio.closest(".inp-rad").addClass("ok");
            } else {
                selectedRadio.closest(".inp-rad").addClass("err");
            }
            $(allRadios).attr('disabled', 'disabled')
            $(this).attr('disabled', 'disabled')

            setTimeout(() => {
                nextTab($(this).parents('.quiz-tab'));
            }, Math.floor(Math.random() * (1500 - 600 + 1)) + 600);

        } else { alert('Пожалуйста, выберите хотя бы один вариант ответа.'); }

    });

    $('.quiz-finish').on('click', function (e) {
        var percentage = Math.floor(($('.ok').length / Object.keys(answers).length) * 100);
        percentage = 95;
        if (percentage < 90) {
            $('.quiz-resoult .quiz-form').hide()
            $('.quiz-resoult__heading').html('К сожалению вы набрали <span> всего ' + percentage + ' балов </span>')
            $('.quiz-resoult__text').html('Для получения подарка, <span>требуется 90</span>')
        } else {
            $('.quiz-faild').hide()
            $('.quiz-resoult__heading').html('Поздравляем!')
            $('.quiz-resoult__text').html('Вы прошли викторину, и набрали <span>' + percentage + ' балов </span>')
            $('.quiz-resoult .quiz-form').show()
        }
        setTimeout(() => { $('.quiz-range__item').css('width', percentage + '%'); }, 1500);
    });

    function nextTab(quizTab) {
        quizTab.removeClass('active');
        quizTab.next('.quiz-tab').addClass('active');
    }

    $('.dropdown-btn').on('click', function (e) {
        $(this).toggleClass('active');
        $(this).next('.dropdown-content').slideToggle();
    })

    $('input[name="u-phone"]').inputmask({ "mask": "8-(999)-999-99-99" });

    $('fieldset').each(function () {
        $(this).find('input[type=radio]').each(function (index) {
            $(this).val(index + 1);
        });
    });

});