$(document).ready(function ()
{
    var rows = [[1.0, "01/01/1988", 2, 3, 4],
               [1.23, "01/01/1988", 0.33, 2, 4.4],
               [11.11, "01/01/1988", 20.239, 3.3, 1]];
    
    var onAdjustment = function(row, col)
    {

    };

    var hot = new Handsontable(document.getElementById("hot"), {
        data: rows,
        colHeaders: ["Price", "Date", "1D Chg", "YTD Chg", "Vol BTC"],
        rowHeaders: true,
        sortIndicator: true,
        columnSorting: true,
        contextMenu: true,
        afterOnCellMouseDown: function(event, coords, TD) { onAdjustment(coords.row, coords.col) },
        columns: [
        {type: 'numeric', format: '$0,0.00'},
        {type: 'date', dateFormat: 'DD/MM/YYYY', correctFormat: true},
        {type: 'numeric', format: '0.00'},
        {type: 'numeric', format: '0.00'},
        {type: 'numeric', format: '0.00'}
        ]
    });
});