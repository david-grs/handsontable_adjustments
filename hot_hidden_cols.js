$(document).ready(function ()
{    
    var tick = 0.10;
    
    var cols = ["Price", "Date", "1D Chg", "YTD Chg", "Vol BTC"];
    var data = [[1.0, "01/01/1988", 2, 3, 4],
                 [1.23, "01/01/1988", 0.33, 2, 4.4],
                 [11.11, "01/01/1988", 20.239, 3.3, 1]];

    var hot = new Handsontable(document.getElementById("hot_hidden_cols"), {
        data: data,
        colHeaders: cols,
        rowHeaders: true,
        contextMenu: false
    });
});