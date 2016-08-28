$(document).ready(function ()
{
    var onAdjustment = function(row, col)
    {

    };

    var hot = new Handsontable(document.getElementById("hot"), {
        data: [[1.0, "01/01/1988", 2, 3, 4]],
        colHeaders: ["Price", "Date", "1D Chg", "YTD Chg", "Vol BTC"],
        rowHeaders: true,
        sortIndicator: true,
        columnSorting: true,
        contextMenu: true,
        afterOnCellMouseDown: function(event, coords, TD) { onAdjustment(coords.row, coords.col) },
        columns: [
        {type: 'numeric', format: '$0,0.00'},
        {type: 'date', dateFormat: 'DD/MM/YYYY', correctFormat: true},
        {type: 'numeric', format: '0.00%'},
        {type: 'numeric', format: '0.00%'},
        {type: 'numeric', format: '0.00'}
        ]
    });
});