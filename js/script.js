$(document).ready(function () {
    $('[data-target-class]').on('input', function (e) {
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

    const answers = { q1: 2, q2: 3, q3: 1, q4: 4, q5: 1, q6: 2, q7: 5, q8: 3, q9: 4, q10: 2, q11: 2, q12: 2, q13: 1, q14: 2, q15: 3, q16: 2, q17: 1, q18: 2, q19: 2 };

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
        var percentage = Math.floor((($('.ok').length + 1) / Object.keys(answers).length) * 100);
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

    $('input[name="u_phone"]').inputmask({ "mask": "+7_(999)_999_99_99" });

    $('#last_form').on('submit', function (e) {
        e.preventDefault();
        $(this).find('.btn').attr('disabled', 'disabled')

        const formParet = $(this).parents('.quiz-tab');

        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'save.php',
            data: formData,
            success: function (response) {
                console.log(response);
            },
            error: function (error) { console.error('Произошла ошибка:', error); }
        });

        var googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbyWm-SRbKXOnJ8kCWVipf25Eq3qdUk_ILcDTfOQgan3S-8fWXa2uajRPk2QylE5wZLd/exec';
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