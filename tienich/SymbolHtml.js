
    $('.boxicons span').click(function () {
        let e = $(this);
        let entity = e.attr('data-entity');
        let code = e.attr('data-code');
        let unicode = e.attr('data-unicode');
        let hex = e.attr('data-hex');
        let css = e.attr('data-css');

        $('#show-entity').text(entity);
        $('#show-code').text(code);
        $('#show-unicode').text(unicode);
        $('#show-hex').text(hex);
        $('#show-css').text(css);
        $('#show-show').text(e.text());

        console.log(entity, code, unicode, hex, css);
    });
  
  $('#listchars a').click(function (e) {
        setTimeout(function () {
            window.scrollTo({top: 0, behavior: 'auto'});



            console.log('click');
        }, 1);
    });
