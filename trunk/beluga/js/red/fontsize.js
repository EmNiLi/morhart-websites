    function fontsize_change(size) {
        f_normal  = "1.0em";
        f_large   = "1.17em";
        f_largest = "1.33em";
        l_normal  = "1.3em";
        l_large   = "1.5em";
        l_largest = "1.75em";
        if ( size == 'xl' ) {
            $('site').style.fontSize   = f_largest;
            $('site').style.lineHeight = l_largest;
            $('head').style.fontSize   = f_largest;
            $('font_size1').removeClassName('font_sel');
            $('font_size2').removeClassName('font_sel');
            $('font_size3').addClassName('font_sel');
        } else if ( size == 'l' ) {
            $('site').style.fontSize   = f_large;
            $('site').style.lineHeight = l_large;
            $('head').style.fontSize   = f_large;
            $('font_size1').removeClassName('font_sel');
            $('font_size2').addClassName('font_sel');
            $('font_size3').removeClassName('font_sel');
        } else if ( size == 'n' ) {
            $('site').style.fontSize   = f_normal;
            $('site').style.lineHeight = l_normal;
            $('head').style.fontSize   = f_normal;
            $('font_size1').addClassName('font_sel');
            $('font_size2').removeClassName('font_sel');
            $('font_size3').removeClassName('font_sel');
        }
    }