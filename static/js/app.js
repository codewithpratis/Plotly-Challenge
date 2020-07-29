function getID(id) {
    d3.json("https://raw.githubusercontent.com/codewithpratis/Plotly-Challenge/master/data/samples.json").then(importedData => {
        console.log(importedData);
        var id_data = importedData.samples[0].otu_ids;
        console.log(id_data);
        var samplevalues = importedData.samples[0].sample_values.slice(0, 10).reverse();
        console.log(samplevalues);
        var labels = importedData.samples[0].otu_labels.slice(0, 10);
        console.log(labels);
        var otu_best = (id_data.slice(0, 10)).reverse();
        var otu_id = otu_best.map(data => "OTU " + data);
        console.log(`OTU IDS: ${otu_id}`)
        var labels = importedData.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU_labels: ${labels}`)

        var trace = {
            x: samplevalues,
            y: otu_id,
            text: labels,
            marker: {
                color: 'black'},
            type: 'bar',
            orientation: 'h'
        };

        var data = [trace];

        var layout = {
            title: "Best 10 OTU's",
            height: 400,
            width: 962

        };
        // for Bar Graph
        Plotly.newPlot("bar", data, layout);

        // For Bubble Chart
        var bubble_trace = {
            x: importedData.samples[0].otu_ids,
            y: importedData.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: importedData.samples[0].sample_values,
                color: importedData.samples[0].otu_ids
            },
            text: importedData.samples[0].otu_labels

        };

        var margin = {top: 20, right: 30, bottom: 127, left: 430},
                        width = 1400 - margin.left - margin.right, 
                        height = 500 - margin.top - margin.bottom;

        // set the layout for the bubble plot
        var bubble_layout = {
            title: "Bubble Chart",
            xaxis: { title: "OTU ID's" },
            height: 600,
            width: 1200,
           
        };

        // creating data variable 
        var data = [bubble_trace];

        // create the bubble plot
        Plotly.newPlot("bubble", data, bubble_layout);

    });
}

function getdemographic(id) {
    d3.json("https://raw.githubusercontent.com/codewithpratis/Plotly-Challenge/master/data/samples.json").then((demodata) => {
        var metadata = demodata.metadata;
        console.log(metadata);

        var filter_metadata = metadata.filter(data => data.id.toString() === id)[0];
        var demographic = d3.select("#sample-metadata");
        demographic.html("");

        Object.entries(filter_metadata).forEach((key) => {   
            demographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    })
}


function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("https://raw.githubusercontent.com/codewithpratis/Plotly-Challenge/master/data/samples.json").then((data) => {
        console.log(data)

        // get the id data to the dropdwown menu
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        getID(data.names[0]);
        getdemographic(id);
    });
}
function optionChanged(id) {
    getID(id);
    getdemographic(id);
}
init();

