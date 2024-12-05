$(document).ready(function () {
    $('[data-target-class]').on('change', function (e) {
        const targetClass = $(this).attr('data-target-class');
        $(`.${targetClass}`).val($(this).val());
    });

    $('fieldset').each(function () {
        $(this).find('input[type=radio]').each(function (index) {
            $(this).val(index + 1);
        });
    });

    function addError(parent, elem, mess) {
        parent.find('.error').removeClass("error");
        parent.find(".error__text").remove();
        elem.addClass("error");
        elem.after("<span class='error__text'>" + mess + "</span>");
    }

    $('#first_form').on('submit', function (e) {
        e.preventDefault();
        $(this).find('.btn').attr('disabled', 'disabled')

        const formParet = $(this).parents('.quiz-tab');
        const formEmail = $(this).find('input[name="u_email"]');
        const formCompany = $(this).find('input[name="u_company"]');
        const formCountry = $(this).find('select[name="u_country"]');

        if (formCountry.val() !== 'Кыргызстан' && formCountry.val() !== 'Узбекистан') {
            console.log($('select[name="u_type"]'));
            $('select[name="u_type"]').val('Online-подписка')
            $('select[name="u_type"], input[name="u_address"], input[name="u_time"]').prop('disabled', true);
        } else { }

        nextTab(formParet); // delete

        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'checker.php',
            data: formData,
            success: function (response) {

                $(formParet).find('.btn').removeAttr('disabled');
                if (response === "company_false ") {
                    addError(formParet, formCompany, 'Превышен лимит участников из вашей компании');
                } else if (response === "email_false") {
                    addError(formParet, formEmail, 'Почта уже существует');
                } else if (response === "company_false email_false") {
                    addError(formParet, formEmail, 'Почта уже существует');
                    addError(formParet, formCompany, 'Превышен лимит участников из вашей компании');
                } else {
                    nextTab(formParet);
                }

            },
            error: function (error) { console.error('Произошла ошибка:', error); }
        });
    });

    const answers = { q1: 1, q2: 1, q3: 1, q4: 1, q5: 3, q6: 3, q7: 2, q8: 5, q9: 3, q10: 4, q11: 2, q12: 2, q13: 1, q14: 1, q15: 2, q16: 1, q17: 2, q18: 1, q19: 4, q20: 1 };

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
        if (percentage < 90) {
            $('.quiz-resoult .quiz-form').hide()
            $('#resoult__heading').html('К сожалению вы набрали <span> всего ' + percentage + ' балов </span>')
            $('#resoult__text').html('Для получения подарка, <span>требуется 90</span>')
        } else {
            $('.quiz-faild').hide()
            $('#resoult__heading').html('Поздравляем!')
            $('#resoult__text').html('Вы прошли викторину, и набрали <span>' + percentage + ' балов </span>')
            $('.quiz-resoult .quiz-form').show()
        }
        if (percentage < 30) { $('.quiz-range__item').css('background-color', 'red') }
        else if (percentage < 95) { $('.quiz-range__item').css('background-color', '#ffcd29b3') }
        else { $('.quiz-range__item').css('background-color', '#6fbe47') }
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

    $('#last_form').on('submit', function (e) {
        e.preventDefault();
        $(this).find('.btn').attr('disabled', 'disabled')

        const formParet = $(this).parents('.quiz-tab');

        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'save.php',
            data: formData,
            success: function (response) { console.log(response); },
            error: function (error) { console.error('Произошла ошибка:', error); }
        });

        var googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzX5394ys2G27i2nbNCymFjm_1XhIHgvk-6uiqLMLx4n0MX-5dfB-Vcqe2KXqVGpxOa/exec';
        $.ajax({
            type: 'POST',
            url: googleAppsScriptUrl,
            data: formData,
            success: function (response) {
                $(formParet).find('.btn').removeAttr('disabled');
                nextTab(formParet);
                console.log(response);
            },
            error: function (error) { console.error('Произошла ошибка:', error); }
        });

    })

});