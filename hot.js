$(document).ready(function ()
{
    $("#hot").bind("contextmenu", function(e) { return false; });
    
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
        var adj = event.which == 1 ? tick : -tick;
        adjustments[row][col] += adj;
        
        console.log(adj);
    };

    var hot = new Handsontable(document.getElementById("hot"), {
        data: rawValues,
        colHeaders: cols,
        rowHeaders: true,
        sortIndicator: false,
        columnSorting: false,
        contextMenu: false,
        afterOnCellMouseDown: function(event, coords, TD) { if (coords.row >= 0 && coords.col >= 0) onAdjustment(event, coords.row, coords.col) },
        columns: [
        {type: 'numeric', format: '$0,0.00'},
        {type: 'date', dateFormat: 'DD/MM/YYYY', correctFormat: true},
        {type: 'numeric', format: '0.00'},
        {type: 'numeric', format: '0.00'},
        {type: 'numeric', format: '0.00'}
        ]
    });
});