// System Settings
// ===============
// Display and Modify FreeNAS GUI and OS settings.

"use strict";

import React from "react";
import TWBS from "react-bootstrap";
import _ from "lodash";

import SM from "../../../flux/middleware/SystemMiddleware";
import SS from "../../../flux/stores/SystemStore";

const languageChoices =
  [ "English"
  , "Afrikaans"
  , "Azerbaijani"
  , "Belarusian"
  , "Bengali"
  , "Breton"
  , "Bosnian"
  , "Catalan"
  , "Czech"
  , "Welsh"
  , "Danish"
  , "German"
  , "Greek"
  , "British English"
  , "Esperanto"
  , "Spanish"
  , "Argentinian Spanish"
  , "Mexican Spanish"
  , "Nicaraguan Spanish"
  , "Venezuelan Spanish"
  , "Estonian"
  , "Basque"
  , "Persian"
  , "Finnish"
  , "French"
  , "Frisian"
  , "Irish"
  , "Galician"
  , "Hebrew"
  , "Hindi"
  , "Croatian"
  , "Hungarian"
  , "Interlingua"
  , "Indonesian"
  , "Icelandic"
  , "Italian"
  , "Japanese"
  , "Georgian"
  , "Kazach"
  , "Khmer"
  , "Kannada"
  , "Korean"
  , "Luxembourish"
  , "Lithuanian"
  , "Latvian"
  , "Macedonian"
  , "Malayan"
  , "Mongolian"
  , "Burmese"
  , "Norwegian Bokmal"
  , "Nepali"
  , "Dutch"
  , "Norwegian Nyorsk"
  , "Ossetic"
  , "Punjabi"
  , "Polish"
  , "Portuguese"
  , "Brazilian Portuguese"
  , "Romanian"
  , "Russian"
  , "Slovak"
  , "Slovenian"
  , "Albanian"
  , "Serbian"
  , "Serbian Latin"
  , "Swedish"
  , "Swahili"
  , "Tamil"
  , "Telugu"
  , "Thai"
  , "Turkish"
  , "Tatar"
  , "Udmurt"
  , "Urdu"
  , "Vietnamese"
  , "Simplified Chinese"
  , "Traditional Chinese"
  ]

function getSystemUIConfig () {
  return SS.systemUIConfig;
}

function createOptions ( optionsArray ) {
  var options =
    _.map( optionsArray
         , function mapOptions ( optionValue, index ) {
           return (
             <option
               value = { optionValue }
               key = { index }>
               { optionValue }
             </option>
             );
         }
         );
  return options;
}

// All settings in this panel are from system.advanced
const HardwareSettings = React.createClass(
  { getDefaultProps () {
    return { console_screensaver: null
           , serial_console: null
           , serial_port: null
           , serial_speed: null
           };
  }

  , render () {
    return (
      <TWBS.Panel>
        <h4>Hardware</h4>
      </TWBS.Panel>
    );
  }
});

const LocalizationSettings = React.createClass(
  { getDefaultProps () {
    return { language: "English"
           , timezone: "America/Los_Angeles"
           , console_keymap: "us.iso"
           };
  }

  , handleChange( key, event ) {
    var language = "";
    var timezone = "";
    var console_keymap = "";

    switch ( key ) {
      case "language":
        this.setState( { language: event.target.value } );
        break;
      case "timezone":
        this.setState( { timezone: event.target.value } );
        break;
      case "console_keymap":
        this.setState( { console_keymap: event.target.value } );
        break;
    }
  }

  , render () {
    var language = null;
    var languageValue = this.props[ "language" ];
    var timezone = null;
    var timezoneValue = this.props[ "timezone" ];
    var console_keymap = null;
    var console_keymapValue = this.props[ "console_keymap" ];

    if ( _.has( this, [ "state", "language" ] ) ) {
      languageValue = this.state.language;
    }
    language =
      <TWBS.Input
        type = "select"
        label = "Language"
        value = { languageValue }
        onChange = { this.handleChange.bind( this, "language" ) }>
        { createOptions( languageChoices ) }
      </TWBS.Input>;

    if ( _.has( this, [ "state", "timezone" ] ) ) {
      timezoneValue = this.state.language;
    }
    timezone =
      <TWBS.Input
        type = "select"
        label = "Timezone"
        value = { timezoneValue }
        onChange = { this.handleChange.bind( this, "timezone" ) }>
      </TWBS.Input>;

    if ( _.has( this, [ "state", "console_keymap" ] ) ) {
      console_keymapValue = this.state.language;
    }
    console_keymap =
      <TWBS.Input
        type = "select"
        label = "Console Keymap"
        value = { console_keymapValue }
        onChange = { this.handleChange.bind( this, "console" ) }>
      </TWBS.Input>

    return (
      <TWBS.Panel>
        <h4>Localization</h4>
        <form>
         { language }
         { timezone }
         { console_keymap }
        </form>
      </TWBS.Panel>
    );
  }
});

const OSSettings = React.createClass(
  { render () {
    return (
      <TWBS.Panel>
        <h4>Operating System </h4>
      </TWBS.Panel>
    );
  }
});

const Tuneables = React.createClass(
  { render () {
    return (
      <TWBS.Panel>
        <h4>Tuneables</h4>
      </TWBS.Panel>
    );
  }
});

const UISettings = React.createClass(
  { getDefaultProps () {
    return { systemUIConfig:
             { webui_protocol: "HTTP"
             , webui_http_port: 80
             , webui_http_redirect_https: false
             , webui_https_certificate: null
             , webui_listen: [ "0.0.0.0"
                             , "::"
                             ]
             , webui_https_port: null
             }
           };
  }

  , render () {
    return (
      <TWBS.Panel>
        <h4>Webapp</h4>
      </TWBS.Panel>
    );
  }
});

const System = React.createClass(
  { render () {
    return (
      <TWBS.Grid>
        <TWBS.Row>
          <TWBS.Col xs = {4}>
            <UISettings/>
          </TWBS.Col>
          <TWBS.Col xs = {4}>
            <OSSettings/>
          </TWBS.Col>
          <TWBS.Col xs = {4}>
            <LocalizationSettings/>
          </TWBS.Col>
        </TWBS.Row>
        <TWBS.Row>
          <TWBS.Col xs = {4}>
            <HardwareSettings/>
          </TWBS.Col>
          <TWBS.Col xs = {8}>
            <Tuneables/>
          </TWBS.Col>
        </TWBS.Row>
      </TWBS.Grid>
    );
  }
});

export default System;
