
    jQuery('.boxicons span').click(function () {
        let e = jQuery(this);
        let entity = e.attr('data-entity');
        let code = e.attr('data-code');
        let unicode = e.attr('data-unicode');
        let hex = e.attr('data-hex');
        let css = e.attr('data-css');

        jQuery('#show-entity').text(entity);
        jQuery('#show-code').text(code);
        jQuery('#show-unicode').text(unicode);
        jQuery('#show-hex').text(hex);
        jQuery('#show-css').text(css);
        jQuery('#show-show').text(e.text());

        console.log(entity, code, unicode, hex, css);
    });
  
  jQuery('#listchars a').click(function (e) {
        setTimeout(function () {
            window.scrollTo({top: 0, behavior: 'auto'});



            console.log('click');
        }, 1);
    });
