// -----------------------------------------------------------------------------------
//
//  getPageSize-Funktion stammt aus der Lightbox v2.03.3
//
//  die parameter 2 und 3 sind ganz hilfreich
//
//  Lightbox v2.03.3
//  by Lokesh Dhakar - http://www.huddletogether.com
//  5/21/06
//
//  For more information on this script, visit:
//  http://huddletogether.com/projects/lightbox2/
//
// -----------------------------------------------------------------------------------

LB_imitate = Class.create({
    
    initialize: function(element, options) {

        if ( options  ) {
            if ( options.top ) {
                this.pos_top = options.top;
            } else {
                this.pos_top = 1/3;
            }
            if ( options.duration ) {
                this.duration = options.duration;
            } else {
                this.duration = 0.4;
            }
            if ( options.opacity ) {
                if ( options.opacity >= 1 ) {
                    this.opacity = 0.99999;
                } else {
                    this.opacity = options.opacity;
                }
            } else {
                this.opacity = 0.8;
            }
        } else {
            this.pos_top = 1/3;
            this.duration = 0.4;
            this.opacity = 0.8;
        }

        this.section = $(element);
    },
    show: function() {
        this.create();
        Event.observe('vorhangOverlay','click',this.hide.bind(this) );
        new Effect.Parallel(
            [
                new Effect.Appear(this.section, { sync: true }),
                new Effect.Appear('vorhangOverlay', { sync: true, from: 0.0, to: this.opacity }),
                new Effect.ScrollTo('page', { sync: true })
            ],
            {
                duration: this.duration/*,
                sync: true*/
            }
        );
    },
    hide: function() {
        // nach oben scrollen und box und "vorhang" ausblenden
        new Effect.Parallel(
            [
                new Effect.ScrollTo('page', { sync: true }),
                new Effect.Fade(this.section,{
                        sync: true,
                        afterFinish: function() {
                            Event.stopObserving('vorhangOverlay', 'click');
                            $('vorhangOverlay').remove();
                        }
                    }
                ),
                new Effect.Fade('vorhangOverlay', { sync: true })
            ],
            {
                duration: this.duration/*,
                sync: true*/
            }
        );
    },
    create: function() {
        // fenstergroesse bestimmen (funktion ist in little_helper.js)
        var arrayPageSize = this.getPageSize();
        // box zentrieren
        var pos_x = ($('page').getWidth() - this.section.getWidth()) / 2;
        if ( pos_x < 0 ) {
            var pos_x = '100px';
        }
        this.section.style.left = pos_x + 'px';
        if ( this.pos_top > 1 ) {
            this.section.style.top = this.pos_top + 'px';
        } else {
            this.section.style.top = arrayPageSize[3]*this.pos_top + 'px';
        }
        // "vorhang" bauen
        var buildObjVorhang = Builder.node(
                            'div',
                            {
                                id:'vorhangOverlay',
                                style:'width:' + arrayPageSize[0] + 'px;height:' + arrayPageSize[1] + 'px;display:none;'
                            }
        );
        var objBody = $$('body')[0];
        objBody.insert(buildObjVorhang);
    },
    getPageSize: function() {
        var xScroll, yScroll;

        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
            xScroll = document.body.scrollWidth;
            yScroll = document.body.scrollHeight;
        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
            xScroll = document.body.offsetWidth;
            yScroll = document.body.offsetHeight;
        }

        var windowWidth, windowHeight;

        if (self.innerHeight) { // all except Explorer
            if(document.documentElement.clientWidth){
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = self.innerWidth;
            }
            windowHeight = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
            windowWidth = document.documentElement.clientWidth;
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) { // other Explorers
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // for small pages with total height less then height of the viewport
        if(yScroll < windowHeight){
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }

        // for small pages with total width less then width of the viewport
        if(xScroll < windowWidth){
            pageWidth = xScroll;
        } else {
            pageWidth = windowWidth;
        }
    //  console.log("pageWidth " + pageWidth)

        arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight)
        return arrayPageSize;
    }
});

