/**
 * Draw.io Custom Plugin
 * Creates a title page and data page with tables based on user input
 */

Draw.loadPlugin(function(ui) {
    
    // Add menu item to trigger the plugin
    ui.actions.addAction('customDocumentCreator', function() {
        
        // Create dialog HTML
        var dialogContent = document.createElement('div');
        dialogContent.style.padding = '20px';
        dialogContent.innerHTML = '<div style="margin-bottom: 15px;">' +
            '<label style="display: block; margin-bottom: 5px; font-weight: bold;">Document Title:</label>' +
            '<input type="text" id="docTitle" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter document title">' +
            '</div>' +
            '<div style="margin-bottom: 15px;">' +
            '<label style="display: block; margin-bottom: 5px; font-weight: bold;">Version:</label>' +
            '<input type="text" id="docVersion" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="e.g., 1.0">' +
            '</div>' +
            '<div style="margin-bottom: 15px;">' +
            '<label style="display: block; margin-bottom: 5px; font-weight: bold;">Date:</label>' +
            '<input type="date" id="docDate" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">' +
            '</div>' +
            '<div style="margin-bottom: 15px;">' +
            '<label style="display: block; margin-bottom: 5px; font-weight: bold;">Description:</label>' +
            '<textarea id="docDescription" rows="4" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter description"></textarea>' +
            '</div>';
        
        // Set default date to today
        setTimeout(function() {
            var today = new Date().toISOString().split('T')[0];
            document.getElementById('docDate').value = today;
        }, 100);
        
        // Create and show dialog
        var dlg = new CustomDialog(ui, 'Create Document', dialogContent, function() {
            // Get values from form
            var title = document.getElementById('docTitle').value || 'Untitled Document';
            var version = document.getElementById('docVersion').value || '1.0';
            var date = document.getElementById('docDate').value || new Date().toISOString().split('T')[0];
            var description = document.getElementById('docDescription').value || 'No description provided';
            
            // Create the pages and content
            createDocumentPages(ui, title, version, date, description);
        }, null, 'Create', 'Cancel');
        
        ui.showDialog(dlg.container, 450, 400, true, true);
    });
    
    // Add to menu
    ui.menus.get('extras').addItem(ui, 'Create Document from Template', null, 'customDocumentCreator');
    
    /**
     * Creates the document pages with tables
     */
    function createDocumentPages(ui, title, version, date, description) {
        var graph = ui.editor.graph;
        var model = graph.model;
        
        model.beginUpdate();
        try {
            // Create Title Page
            var titlePage = ui.createPage('Title Page');
            ui.insertPage(titlePage, 0);
            ui.selectPage(titlePage);
            
            // Add title text
            var titleCell = new mxCell(title, new mxGeometry(150, 100, 500, 60), 
                'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=28;fontStyle=1');
            titleCell.vertex = true;
            graph.addCell(titleCell);
            
            // Create version info table (3 columns, 2 rows - header + data)
            var tableX = 150;
            var tableY = 200;
            var colWidths = [150, 150, 400];
            var rowHeight = 40;
            
            // Table headers
            var headers = ['Version', 'Date', 'Description'];
            
            for (var i = 0; i < headers.length; i++) {
                var x = tableX + colWidths.slice(0, i).reduce(function(a, b) { return a + b; }, 0);
                var cell = new mxCell(headers[i], new mxGeometry(x, tableY, colWidths[i], rowHeight),
                    'shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=#d5e8d4;strokeColor=#82b366;top=0;left=0;bottom=0;right=0;align=center;verticalAlign=middle;fontStyle=1;fontSize=12;');
                cell.vertex = true;
                graph.addCell(cell);
            }
            
            // Table data row
            var dataValues = [version, date, description];
            
            for (var i = 0; i < dataValues.length; i++) {
                var x = tableX + colWidths.slice(0, i).reduce(function(a, b) { return a + b; }, 0);
                var cell = new mxCell(dataValues[i], new mxGeometry(x, tableY + rowHeight, colWidths[i], rowHeight),
                    'shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=#ffffff;strokeColor=#82b366;top=0;left=0;bottom=0;right=0;align=left;verticalAlign=middle;spacingLeft=10;fontSize=11;');
                cell.vertex = true;
                graph.addCell(cell);
            }
            
            // Create Data Page
            var dataPage = ui.createPage('Data Table');
            ui.insertPage(dataPage, 1);
            ui.selectPage(dataPage);
            
            // Create table with 2 columns and 20 rows
            var table2X = 100;
            var table2Y = 100;
            var col1Width = 300;
            var col2Width = 400;
            var table2RowHeight = 35;
            
            // Create all cells for the 20-row table
            for (var row = 0; row < 20; row++) {
                var fillColor = (row === 0) ? '#dae8fc' : '#ffffff';
                var strokeColor = (row === 0) ? '#6c8ebf' : '#6c8ebf';
                var fontStyle = (row === 0) ? '1' : '0';
                var content1 = (row === 0) ? 'Column 1' : 'Row ' + row;
                var content2 = (row === 0) ? 'Column 2' : '';
                
                // Column 1
                var cell1 = new mxCell(content1, 
                    new mxGeometry(table2X, table2Y + (row * table2RowHeight), col1Width, table2RowHeight),
                    'shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=' + fillColor + ';strokeColor=' + strokeColor + ';top=0;left=0;bottom=0;right=0;align=left;verticalAlign=middle;spacingLeft=10;fontStyle=' + fontStyle + ';fontSize=11;');
                cell1.vertex = true;
                graph.addCell(cell1);
                
                // Column 2
                var cell2 = new mxCell(content2, 
                    new mxGeometry(table2X + col1Width, table2Y + (row * table2RowHeight), col2Width, table2RowHeight),
                    'shape=partialRectangle;html=1;whiteSpace=wrap;connectable=0;fillColor=' + fillColor + ';strokeColor=' + strokeColor + ';top=0;left=0;bottom=0;right=0;align=left;verticalAlign=middle;spacingLeft=10;fontStyle=' + fontStyle + ';fontSize=11;');
                cell2.vertex = true;
                graph.addCell(cell2);
            }
            
            // Switch back to title page to show the result
            ui.selectPage(titlePage);
            
        } finally {
            model.endUpdate();
        }
        
        ui.alert('Document created successfully with Title Page and Data Table!');
    }
    
    /**
     * Custom Dialog Constructor
     */
    function CustomDialog(editorUi, title, content, okFn, cancelFn, okText, cancelText) {
        okText = okText || 'OK';
        cancelText = cancelText || 'Cancel';
        
        var div = document.createElement('div');
        div.style.textAlign = 'center';
        
        var innerDiv = document.createElement('div');
        innerDiv.style.padding = '0px';
        innerDiv.style.textAlign = 'left';
        innerDiv.appendChild(content);
        div.appendChild(innerDiv);
        
        var buttons = document.createElement('div');
        buttons.style.marginTop = '20px';
        buttons.style.textAlign = 'right';
        buttons.style.paddingTop = '20px';
        buttons.style.borderTop = '1px solid #ccc';
        
        var cancelBtn = mxUtils.button(cancelText, function() {
            editorUi.hideDialog();
            if (cancelFn != null) {
                cancelFn();
            }
        });
        cancelBtn.className = 'geBtn';
        cancelBtn.style.marginRight = '10px';
        
        var okBtn = mxUtils.button(okText, function() {
            editorUi.hideDialog();
            if (okFn != null) {
                okFn();
            }
        });
        okBtn.className = 'geBtn gePrimaryBtn';
        
        buttons.appendChild(cancelBtn);
        buttons.appendChild(okBtn);
        div.appendChild(buttons);
        
        this.container = div;
    }
});
