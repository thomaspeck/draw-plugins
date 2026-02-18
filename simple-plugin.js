/**
Draw.loadPlugin(function(ui) {
    // Test: Add a simple menu item
    ui.actions.addAction('testPlugin', function() {
        ui.alert('Plugin loaded successfully!');
    });
    
    var menu = ui.menus.get('extras');
    menu.addItem(ui, 'Test Plugin', null, 'testPlugin');
    
    console.log('Minimal test plugin loaded!');
});
**/

Draw.loadPlugin(function(ui) {
  // Your custom plugin code goes here
  alert('My custom plugin is running!');

  // Example of adding a custom menu item
  var menu = ui.menus.get('plugins');
  menu.addItem('My Custom Action', null, function() {
    alert('Custom action triggered!');
  }, menu.div);
});
