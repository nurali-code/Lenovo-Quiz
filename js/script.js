$(document).ready(function () {
    $(document).on('change', '[data-target-class], select[name="u_type"]', function () {
        const $this = $(this);
        if ($this.is('[data-target-class]')) {
            const targetClass = $this.attr('data-target-class');
            $(`.${targetClass}`).val($this.val());
        }
        if ($this.is('select[name="u_type"]')) {
            const selectedValue = $this.val();
            const isOnlineSubscription = selectedValue === 'Online-подписка';
            $('input[name="u_address"], input[name="u_time"]').prop('disabled', isOnlineSubscription);
        }
    });

    function endedQuiz(ter) {
        $('.quiz-thanks').find('h3').text('Викторина окончена!');
        $('.quiz-thanks').find('p').text('Спасибо за участие!');
        $('.quiz-thanks').find('img').hide();
        $('.quiz-tab').removeClass('active');
        $('.quiz-thanks').addClass('active');
    }

    function onlyOnline() {
        $('select[name="u_type"]').val('Online-подписка')
        $('select[name="u_type"]').addClass('disabled')
        $('input[name="u_address"], input[name="u_time"]').remove();
    }

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

        if (formCountry.val() !== 'Казахстан' && formCountry.val() !== 'Узбекистан') {
            onlyOnline();
            if (window.stat.online) { endedQuiz('online'); }
        }
        else if (formCountry.val() == 'Казахстан' && window.stat.kz) { onlyOnline(); }
        else if (formCountry.val() == 'Узбекистан' && window.stat.uz) { onlyOnline(); }
        if (window.stat.online) { $('select[name="u_type"]').val('Offline').addClass('disabled') }

        $('body').addClass('white')
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
                } else { nextTab(formParet); }

            },
            error: function (error) { console.error('Произошла ошибка:', error); }
        });
    });

    const answers = { q1: 1, q2: 1, q3: 1, q4: 1, q5: 3, q6: 3, q7: 2, q8: 5, q9: 3, q10: 4, q11: 2, q12: 2, q13: 1, q14: 1, q15: 2, q16: 2, q17: 2, q18: 1, q19: 4, q20: 1 };

    $('.quiz-next').on('click', function (e) {
        var selectedRadio = $(this).parent().find('input[type=radio]:checked');
        var allRadios = $(this).parent().find('input[type=radio]');

        if (selectedRadio.length > 0) {
            var name = selectedRadio.attr('name');
            var value = selectedRadio.val();
            if (answers[name] == value) { selectedRadio.closest(".inp-rad").addClass("ok"); }
            else { selectedRadio.closest(".inp-rad").addClass("err"); }
            $(allRadios).attr('disabled', 'disabled')
            $(this).attr('disabled', 'disabled')
            setTimeout(() => {
                $('html, body').animate({ scrollTop: 0 }, 300,)
                nextTab($(this).parents('.quiz-tab'));
                if ($(this).hasClass('quiz-finish')) { quizFinish() }
            }, Math.floor(Math.random() * (1500 - 600 + 1)) + 600);
        } else { alert('Пожалуйста, выберите хотя бы один вариант ответа.'); }

    });

    function quizFinish() {
        $('body').removeClass('white')
        var percentage = Math.floor(($('.ok').length / Object.keys(answers).length) * 100);
        percentage += 100;
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
        setTimeout(() => { $('.quiz-range__item').css('width', percentage + '%'); }, 500);
    }

    function nextTab(quizTab) {
        $('.quiz-tab').removeClass('active');
        quizTab.next('.quiz-tab').addClass('active');
    }

    $('.dropdown-btn').on('click', function (e) {
        $(this).toggleClass('active').next('.dropdown-content').slideToggle(250);
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
            error: function (error) { console.error('Произошла ошибка:', error); }
        });

        var googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbyDpoY7YrW-9kjTzuGpA9qBk5GdqiFxjs2lsN5u7ceHFF5KZ11CKZU7JespEP2U_vRj/exec';
        $.ajax({
            type: 'POST',
            url: googleAppsScriptUrl,
            data: formData,
            success: function (response) {
                $(formParet).find('.btn').removeAttr('disabled');
                nextTab(formParet);
            },
            error: function (error) { console.error('Произошла ошибка:', error); }
        });

    })

});