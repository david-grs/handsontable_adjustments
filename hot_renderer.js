$(document).ready(function ()
{    
    var tick = 0.10;
    
    var cols = ["Price", "Date", "1D Chg", "YTD Chg", "Vol BTC"];
    var rawValues = [[1.0, "01/01/1988", 2, 3, 4],
                     [1.23, "01/01/1988", 0.33, 2, 4.4],
                     [11.11, "01/01/1988", 20.239, 3.3, 1]];
    var adjustments = [];
    var rows = [];
    
    for (var i = 0; i < rawValues.length; ++i)
        adjustments.push(Array.apply(null, Array(cols.length)).map(Number.prototype.valueOf, 0));
    
    var onAdjustment = function(event, row, col)
    {
        if (event.which != 1 && event.which != 3)
            return;
        
        // left or right click: adding or subtracting a tick.
        var adj = adjustments[row][col] + (event.which == 1 ? tick : -tick);
        adj = Math.round(adj * 100) / 100;
        
        adjustments[row][col] = adj;
        hot.setDataAtCell(row, col, adj);
    };
    
    var adjRenderer = function(instance, td, row, col, prop, value, cellProperties) 
    {
        while (td.firstChild)
            td.removeChild(td.firstChild);

        var adjustment = adjustments[row][col];
        var adjValue = Math.round((rawValues[row][col] + adjustment) * 100) / 100;
        td.appendChild(document.createTextNode(adjValue));
        
        if (adjustment != 0.0)
        {
            var sign = adjustment > 0.0 ? "+" : "";
            var text = document.createTextNode(" (" + sign + adjustment + ")");
            
            var adjElem = document.createElement("span");
            adjElem.setAttribute("class", adjustment > 0.0 ? "text-success" : "text-danger");
            adjElem.appendChild(text);
            
            td.appendChild(adjElem);
        }
    };

    var hot = new Handsontable(document.getElementById("hot_renderer"), {
        data: adjustments,
        colHeaders: cols,
        rowHeaders: true,
        sortIndicator: false,
        columnSorting: false,
        contextMenu: false,
        afterOnCellMouseDown: function(event, coords, TD) { if (coords.row >= 0 && coords.col >= 0) onAdjustment(event, coords.row, coords.col) },
        columns: [
        {type: 'numeric', format: '$0,0.00'},
        {type: 'date', dateFormat: 'DD/MM/YYYY', correctFormat: true},
        {type: 'numeric', format: '0.00', renderer: adjRenderer},
        {type: 'numeric', format: '0.00'},
        {type: 'numeric', format: '0.00'}
        ]
    });
    
    // Disabling right click on the grid, and double left click shouldnt go to edit mode
    $("#hot_renderer").bind("contextmenu", function(e) { return false; });
    hot.view.wt.update("onCellDblClick", function() {});
});