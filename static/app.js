//Populate demo div
function populateDemoInfo(sample){
    var panel = d3.select('#sample-metadata');
    panel.html('');
    Object.entries(sample).forEach(([key, value]) => {
        panel.append('p').attr('style', 'font-weight:bold; font-size:11x').text(`${key}: ${value}`)
    });
}
//Barchart
function plotBar(sample){
    sample_values = sample['otu_ids'].slice(0,10).map(value => 'OTU ' + value)
    otu_ids = sample['sample_values'].slice(0, 10);
    otu_labels = sample['otu_labels'].slice(0, 10);

    var data = [{
            type: 'bar',
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            orientation: 'h'
        }];
    
    var layout = {
        yaxis:{
            categoryorder: 'max ascending'
        }
    }

    Plotly.newPlot('bar', data, layout);
}
//Bubble
function plotBubble(sample){
    var trace = [{
        x: sample['otu_ids'],
        y: sample['sample_values'],
        text:  sample['otu_labels'],
        mode: 'markers',
        marker: {
          size: sample['sample_values'],
          color: sample['otu_ids'],
          colorscale: 'Viridis',
        }
      }];;
      
      Plotly.newPlot('bubble', trace);
}

async function optionChanged(id){
    var data = await d3.json("samples.json");
    var metaData = data.metadata.filter(item => item.id == id)
    var sample = data.samples.filter(item => item.id ==  id)
    populateDemoInfo(metaData[0]);
    plotBar(sample[0]);
    plotBubble(sample[0]);
}

(async function(){
    var data = await d3.json("samples.json");
    var names = data.names;

    var select = d3.select('#selDataset');    
    select.selectAll('option')
    .data(names)
    .enter().append('option')
    .attr('value', d => { return d; })
    .text(d => { return d; });

    //Calls function against first item in select list. Decided to default first item.
    optionChanged(select.node().value);
})()






