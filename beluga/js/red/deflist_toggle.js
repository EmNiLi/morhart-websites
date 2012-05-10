// -----------------------------------------------------------------------------------
//
//      Wandelt Definitionslisten (dl) in Ausklapp-Felder um, z.B. fuer FAQs
//
//      Wird auf alle Definitionslisten der Seite angewandt
//
//          duration:   zeitspanne fuer das ein-/ausblenden
//          klass:      falls nur dls mit einer bestimmten klasse
//                      bearbeitet werden sollen
//
// -----------------------------------------------------------------------------------

var duration = 0.3;
var klasse = '';

function dd_initialize() {
    // alle dt durchgehen
// alert('hallo');
    elName = 'dl';
    if ( klasse != '' ) elName = 'dl.' + klasse;
    $$(elName).each( function(el,i) {
            el.childElements('dt').each( function(sub) {
                    if ( sub.nodeName.toLowerCase() == 'dt' ) {
                        // onclick-event setzen
                        sub.onclick = function() {dd_show(this);};
                        // nachfolgendes dd ausblenden
                        sub.next('dd').setStyle({display:'none'});
                    }
                }
            )
        }
    );
}
function hallo() {
    alert('test');
}
function dd_show(element) {
// alert('hallo');
    var dl = element.up('dl');
    var dd = element.next('dd');
    // 1. zur dl hochspringen
    dl.childElements().each(function(tag){
        // 2. alle dd ausblenden
            if ( tag.nodeName.toLowerCase() == 'dd' ) {
                if ( tag == dd ) {
                    var dt = tag;
                } else {
                    Effect.BlindUp(tag,{duration:duration});
                    tag.previous('dt').removeClassName('sel');
                }
            }
        }
    );
    // 3. gewuenschtes dd toggeln
    if ( dd.style.display == 'none' ) {
        Effect.BlindDown(dd,{duration:duration});
        dd.previous('dt').addClassName('sel');
    } else {
        Effect.BlindUp(dd,{duration:duration});
        dd.previous('dt').removeClassName('sel');
    }

}
Event.observe(window, 'load', dd_initialize, false);