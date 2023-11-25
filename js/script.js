$(document).ready(function () {

    $('.quiz-next').on('click', function (e) {
        var quizTab =$(this).parents('.quiz-tab')
        quizTab.removeClass('active')
        quizTab.next('.quiz-tab').addClass('active')
    })

    $('.dropdown-btn').on('click', function (e) {
        $(this).toggleClass('active');
        $(this).next('.dropdown-content').slideToggle();
    })

});

