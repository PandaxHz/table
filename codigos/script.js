google.charts.load('current', {packages:["orgchart"]});
google.charts.setOnLoadCallback(drawChart);

function Arvore( valor,galhoPai = null ){
    this.galhoEsquerdo = null;
    this.galhoDireito = null;
    this.galhoPai = galhoPai;
    this.valor = valor;
}

Arvore.prototype.add = function(valor){
    if(valor == this.valor) return;
    const vaiParaDireita = this.valor < valor;
    
    if (vaiParaDireita) {
        if (!this.galhoDireito){
            this.galhoDireito = new Arvore(valor, this);
            return;
        } 
            this.galhoDireito.add(valor);
            return;
    } 

    if (!this.galhoEsquerdo){
        this.galhoEsquerdo = new Arvore(valor, this);
        return;
    } 
        this.galhoEsquerdo.add(valor);
        return;

}

Arvore.prototype.ler = function(){

    let arvore = [];

    if(this.galhoDireito){
        arvore = arvore.concat(this.galhoDireito.ler());
    }

    arvore.push([
        this.valor, 
        this.galhoPai ? this.galhoPai.valor : '',
        ''
    ]);

    if(this.galhoEsquerdo){
        arvore = arvore.concat(this.galhoEsquerdo.ler())
    }

    return arvore;

}

function drawChart() {
    const data = new google.visualization.DataTable();
    const valor = document.getElementById('valor');
    const form = document.getElementById('form');
    const arvore = new Arvore(null,null);


    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows([]);

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {'allowHtml':true});



    form.addEventListener('submit', (event) => {
        event.preventDefault();

        if(!arvore.valor){
            arvore.valor = valor.value;
        } else {
            arvore.add(valor.value);
        }

        valor.value = '';

        try{
            data.removeRows(0, data.getNumberOfRows())
        }finally{
            data.addRows(arvore.ler());
            chart.draw(data, {'allowHtml':true});
        }

    })
}


