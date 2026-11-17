// Browser entry point (bundled to build/iHam.js as the global `iHam`).
//
// The tnt.* libraries and existing host pages (e.g. OMA's iHam template) use a
// global d3 v3. Older bundles exposed it implicitly (d3 3.0.0 leaked `d3` onto
// window); keep exposing it explicitly so behaviour is unchanged.
window.d3 = require("d3");

module.exports = require("./index.js");
