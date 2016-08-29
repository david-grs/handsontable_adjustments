$(document).ready(function ()
{    
    var GetColHeaders = function()
    {
        var headers = [];
        for (var i = 0; i < showCols.length; ++i)
        {
            if (showCols[i])
                headers.push(cols[i]);
        }
        return headers;
    };
    
    var GetData = function()
    {
        var rows = [];
        for (var i = 0; i < data.length; ++i)
        {
            var row = [];
            for (var j = 0; j < data[i].length; ++j)
            {
                if (showCols[j])
                    row.push(data[i][j]);
            }
            rows.push(row);
        }
        return rows;
    };
    
    
    var showCols = [true, false, true, true];
    var cols = ["Vol", "Slope", "D2", "D4"];
    var data = [[1.0, 12.212, 2, 3, 4],
                 [1.23, 24.333, 0.33, 2, 4.4],
                 [11.11, 11.990, 20.239, 3.3, 1]];
    
    var InitCheckboxes = function()
    {
        for (var i = 0; i < showCols.length; ++i)
            if (showCols[i])
                $("#col_" + i).addClass("active");

    };
    
    InitCheckboxes();

    var hot = new Handsontable(document.getElementById("hot_hidden_cols"), 
    {
        data: GetData(),
        colHeaders: GetColHeaders(),
        rowHeaders: true,
        contextMenu: false
    });
    
    $("#col_chooser label").click(function(event)
    {
        var i = parseInt(this.id.substr(4));
        showCols[i] = !showCols[i];
        
        hot.updateSettings({colHeaders: GetColHeaders()});
        hot.loadData(GetData());
        
        $(this).removeClass("focus");
    });
});