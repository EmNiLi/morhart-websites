<?php
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $script_name = "$Id: linking.inc.php-dist 680 2007-08-13 18:02:51Z chaot $";
  $Script_desc = "webdesigner kann mit dieser datei das laden der templates beinflussen";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    eWeBuKi - a easy website building kit
    Copyright (C)2001-2007 Werner Ammon ( wa<at>chaos.de )

    This script is a part of eWeBuKi

    eWeBuKi is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    eWeBuKi is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with eWeBuKi; If you did not, you may download a copy at:

    URL:  http://www.gnu.org/licenses/gpl.txt

    You may also request a copy from:

    Free Software Foundation, Inc.
    59 Temple Place, Suite 330
    Boston, MA 02111-1307
    USA

    You may contact the author/development team at:

    Chaos Networks
    c/o Werner Ammon
    Lerchenstr. 11c

    86343 K�nigsbrunn

    URL: http://www.chaos.de
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if ( $debugging["html_enable"] ) $debugging["ausgabe"] .= "[ ** $script_name ** ]".$debugging["char"];
  if ( $debugging["html_enable"] ) $debugging["ausgabe"] .= "linking path: ".$linking_path.$debugging["char"];

  // mit diesem script kann anstatt der jeweiligen marke
  // abhaengig vom $environment["ebene"] und/oder $environment["kategorie"]
  // mit dem wert der variable $mapping["markenbezeichnung"]
  // jedes beliebige template und deren content geladen werden.
if ( strstr($environment["ebene"],"/admin")
    || ($environment["ebene"] == "/keywords" && strstr($environment["kategorie"],"edit") )
    /*|| $environment["kategorie"] == "sitemap"*/){
    $mapping["screen"] = "screen_admin";
    $mapping["navi"] = "leer";
    $mapping["foot"] = "leer";

}


    if ( $environment["ebene"] == "/wizard" ){
$mapping["screen"] = "screen_admin";
        $mapping["navi"] = "leer";
        $mapping["tools"] = "leer";
    }
  // beispiel 1:
  // der rechte bereich #{news} soll in der kategorie special
  // das template "meldung.tem.html" laden.
  #switch( $environment["kategorie"] ) {
  #  case "special":
  #    $mapping["news"] = "meldung";
  #    break;
  #}

  // beispiel 2:
  // in der ebene /cms soll im haupbereich ein script geladen werden
  // welches ueber die ganze breite der website geht.
  #switch( $environment["ebene"] ) {
  #  case "/cms":
  #    $mapping["screen"] = "cms";
  #    break;
  #}

  // besipiel 3:
  // natuerlich kann das ebenfalls gelichzeitig mit beiden werten gesteuert werden
  // so wird ueberall unterhalb von /bereich/seite.html
  // das template un der content von intern.tem.html geladen
  #if (  ( $environment["ebene"] == "/bereich" && $environment["kategorie"] == "seite" )
  #   || ( $environment["ebene"] == "/bereich/seite" ))
  #{
  #  $maping["screen"] = "intern";
  #}

  // bespiel 4:
  // eigene steuer variablen
  #if ( $debugging["html_enable"] ) $debugging["ausgabe"] .= "meine variable: ".$meine.$debugging["char"];
  #switch( $meine ) {
  #  case "wert1":
  #    $mapping["zusatz"] = "wert1";
  #    break;
  #}

  if ( $debugging["html_enable"] ) $debugging["ausgabe"] .= "[ ++ $script_name ++ ]".$debugging["char"];

//////////////////////////////////////////////////////////////////////////////////////
?>
