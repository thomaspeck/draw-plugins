Draw.loadPlugin(function(ui) {
    // Test: Add a simple menu item
    ui.actions.addAction('testPlugin', function() {
        ui.alert('Plugin loaded successfully!');
    });
    
    var menu = ui.menus.get('extras');
    menu.addItem(ui, 'Test Plugin', null, 'testPlugin');
    
    console.log('Minimal test plugin loaded!');
});
