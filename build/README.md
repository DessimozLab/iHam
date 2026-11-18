# Frozen iHam 1 bundles

These are the `build/` files of iHam v1.0.7, unchanged. They are not built from
this branch (iHam 2) and nothing updates them.

They are kept because pyham before 2.0.1 loads iHam from this branch through
jsDelivr (`cdn.jsdelivr.net/gh/DessimozLab/iHam@master/build/iHam.js` and
`iHam.css`), and HTML files it exported still do. Load iHam 1 by tag instead,
for example `@v1.0.7`; its source is on the `v1` branch.

This folder can be removed once pyham < 2.0.1 is no longer in use.
