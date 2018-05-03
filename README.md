# iHam

iHam (“interactive HOG Analysis Method’) is an interactive javascript tool based on the [TnT library](tntvis.github.io/tnt) to visualise the evolutionary history of a specific gene family (HOGs). It is used in the [OMA browser](http://omabrowser.org) and merely requires as input HOGs in the standard OrthoXML format (Schmitt et al. 2011), the underlying species tree in newick format and gene family information in JSON format (see below for examples).


## Installation

It can be installed using _yarn_ or _npm_:

    $ npm install --save iham
    $ yarn add iham

It is also possible to link directly to the latest release:


    <link rel="stylesheet" href="https://emepyc.github.io/iHam/iHam.css" />
    <script href="https://emepyc.github.io/iHam/iHam.js"></script>


# Configuration

iHam exposes several methods to set up the widget.

### Data input

#### newick

The tree corresponding to this HOG in newick format.

For example:

    ((((((((("Plasmodium falciparum (isolate 3D7)")"Plasmodium falciparum")"Plasmodium (Laverania)")"Plasmodium")"Haemosporida")"Aconoidasida")"Apicomplexa")"Alveolata",(((((((((("Schizosaccharomyces pombe (strain 972 / ATCC 24843)")"Schizosaccharomyces pombe")"Schizosaccharomyces")"Schizosaccharomycetaceae")"Schizosaccharomycetales")"Schizosaccharomycetes")"Taphrinomycotina",((((((("Ashbya gossypii (strain ATCC 10895 / CBS 109.51 / FGSC 9923 / NRRL Y-1056)")"Ashbya gossypii")"Eremothecium",(("Saccharomyces cerevisiae (strain ATCC 204508 / S288c)")"Saccharomyces cerevisiae")"Saccharomyces")"Saccharomycetaceae")"Saccharomycetales")"Saccharomycetes")"Saccharomycotina")"saccharomyceta")"Ascomycota")"Dikarya")"Fungi")"Opisthokonta")"Eukaryota")"LUCA";

#### orthoxml

The HOG data in orthoxml format. Examples of these files can be downloaded directly from the OMA Browser website. See for example the [orthoxml file corresponding to the NOX1 gene](https://omabrowser.org/oma/hogs/NOX1_HUMAN/orthoxml/)

#### fam_data

The description of the genes present in the HOG family. Examples of these files can be downloaded directly from the OMA Browser website. See for example the [family file corresponding to the NOX1 gene](https://omabrowser.org/oma/hogdata/NOX1_HUMAN/json)


#### Example:
    
    const iham = iHam()
        .newick(newick)
        .orthoxml(orthoxml)
        .fam_data(fam_data)


### Options

#### query_gene

This option is just used to highlight a gene in the visualisation. It accepts an object that must have an `id` property. This id has to correspond with the ids in the orthoxml file.

For example:

    const iham = iHam()
        .query_gene({id: 41434})


#### gene_colors

This method accepts a callback that will be executed every time a gene is displayed in the visualisation. This callback should return a color that will be used to display each of these genes. Internally, this callback is called with the information provided in the orthoxml file:

For example:

    const iham = iHam()
        .gene_colors(function (d) {
            return (d.id === 3965 ? "#27ae60" : "#95a5a6");
         });

#### coverage_threshold

This method can be used to set a coverage threshold for the genes in the visualisation. This threshold refers to the percentage of species (in the provided tree) the HOG is present in.

For example:

    const iham = iHam()
        .coverage_threshold(50); // Only HOGs having genes in at least 50% of the species will be shown
    
#### 