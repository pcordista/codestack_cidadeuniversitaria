$(document).ready(function () {
    geraGallery();
})

var navigation_html;
var number_of_pages;
var notFirst = false;
var notLast = true;

function geraGallery() {

    var filter = $('.filter-active').data('filter');
    var show_per_page = 4;

    switch (filter) {
        case 'all':
            var number_of_items = $('.galeria-imagens > div').length;
            $('.galeria-imagens').children().css('display', 'none');
            $('.galeria-imagens').children().slice(0, show_per_page).css('display', 'block')
            break;

        case 'apartamento':
            var number_of_items = $('.galeria-imagens > div[data-filter="apartamento"]').length;
            $('.galeria-imagens').children().css('display', 'none');
            $('.galeria-imagens').find(`[data-filter='apartamento']`).slice(0, show_per_page).css('display', 'block')
            break;

        case 'lazer':
            var number_of_items = $('.galeria-imagens > div[data-filter="lazer"]').length;
            $('.galeria-imagens').children().css('display', 'none');
            $('.galeria-imagens').find(`[data-filter='lazer']`).slice(0, show_per_page).css('display', 'block')
            break;

        case 'comercial':
            var number_of_items = $('.galeria-imagens > div[data-filter="comercial"]').length;
            $('.galeria-imagens').children().css('display', 'none');
            $('.galeria-imagens').find(`[data-filter='comercial']`).slice(0, show_per_page).css('display', 'block')
            break;

        default:
            var number_of_items = $('.galeria-imagens > div').length;
            $('.galeria-imagens').children().css('display', 'none');
            $('.galeria-imagens').children().slice(0, show_per_page).css('display', 'block')
            break;
    }

    number_of_pages = Math.ceil(number_of_items / show_per_page);

    $('.galeria-paginacao').html('<div class="controls-page"></div><input id="current_page" type="hidden"><input id="show_per_page" type="hidden">');
    $("#current_page").val(0);
    $("#show_per_page").val(show_per_page);

    if ($('#current_page').val() != '0') {
        navigation_html = '<a class="prev-page" onclick="previous()">Prev</a>';
    } else {
        navigation_html = '';
    }
    var current_link = 0;

    while (number_of_pages > current_link) {
        navigation_html += '<a class="page" onclick="go_to_page(' + current_link + ')" longdesc="' + current_link + '">' + (current_link + 1) + '</a>';
        current_link++;
    }
    navigation_html += '<a class="next-page" onclick="next()">Next</a>';

    $('.controls-page').html(navigation_html)
    $('.controls-page .page:first').addClass('active');

    // $('.galeria-imagens').children().css('display', 'none');
    // $('.galeria-imagens').children().slice(0, show_per_page).css('display', 'block')
    notFirst = false;
    notLast = true
}

function go_to_page(page_rum) {

    if (page_rum > 0 && notFirst == false) {
        $('.controls-page').html(navigation_html)
        navigation_html = '<a class="prev-page" onclick="previous()">Prev</a>' + navigation_html;
        $('.controls-page').html(navigation_html)
        notFirst = true
    } else if (page_rum == 0) {
        navigation_html = navigation_html.replace(`<a class="prev-page" onclick="previous()">Prev</a>`, '');
        $('.controls-page').html(navigation_html);
        notFirst = false

    }

    if ((page_rum + 1) == number_of_pages) {
        navigation_html = navigation_html.replace(`<a class="next-page" onclick="next()">Next</a>`, '');
        $('.controls-page').html(navigation_html);
        notLast = false;
    } else if (notLast == false) {
        $('.controls-page').append('<a class="next-page" onclick="next()">Next</a>');
        notLast = true;
    }
    
    var show_per_page = parseInt($('#show_per_page').val(), 0);

    start_from = page_rum * show_per_page;
    end_on = start_from + show_per_page;

    $('.galeria-imagens').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

    $('.page[longdesc=' + page_rum + ']').addClass('active').siblings('.active').removeClass('active');

    $('#current_page').val(page_rum)
}

function previous() {

    new_page = parseInt($('#current_page').val(), 0) - 1;
    //if there is an item before the current active link run the function
    if ($('.active').prev('.page').length == true) {
        go_to_page(new_page);
    }

}

function next() {
    new_page = parseInt($('#current_page').val(), 0) + 1;
    //if there is an item after the current active link run the function
    if ($('.active').next('.page').length == true) {
        go_to_page(new_page);
    }

}


$('.filter').click(function () {
    $('.filter').removeClass('filter-active');
    $(this).addClass('filter-active');
    geraGallery()
})