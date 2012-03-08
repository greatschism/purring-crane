// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

(function() {

// Builds a grid of large push buttons for the main tabs subsection
HT.View.createNavigationGrid = function(_args) {
  var buttons = _args;
  // var label = attr.label;
  var nav = Titanium.UI.createView();
  var buttonsArray = [];
  
  // TODO: Adjust this to dynamically layout the grid with 4+ items
  for (var i = 0, len = buttons.length; i < len; i++) {
    var accountsButton = HT.View.LargeMenuButton({label: buttons[i].label});
    if (i % 2 == 0) {
      accountsButton.left = 20;
    } else {
      accountsButton.right = 20;
    }
    
    if (i < 2) {
      accountsButton.top = 20;
    } else {
      accountsButton.top = 140;
    }
    
    buttonsArray.push(accountsButton);
  }
  
  return buttonsArray;
};

// The large menu view.
HT.View.LargeMenuButton = function(_args) {
  var path = Ti.App.ABS_PATH;
  var label = _args.label;
  var image = label.toLowerCase();
  
  var button = Titanium.UI.createView({
    width: 133,
    height: 100,
    backgroundImage: path + "images/button_large_bg.png"
  });
  
  var buttonGraphic = Titanium.UI.createImageView({
    width: 70,
    height: 45,
    top: 15,
    anchor: {x: 0.5, y: 0},
    image: path + "images/button_graphic_" + image + ".png"
  });
  
  var buttonLabel = Titanium.UI.createLabel({
    text: label,
    height: 13,
    top: 65,
    anchor: {x: 0.5, y: 0},
    textAlign: "center",
    font: {
      fontSize: 13,
      fontWeight: "bold"
    },
    shadowColor: "white",
    shadowOffset: {x: 0, y: -0.5}
  });
  
  button.add(buttonGraphic);
  button.add(buttonLabel);
  
  // Set up the push effect
  button.addEventListener('touchstart', function(e) {
    button.backgroundImage = path + "images/button_large_bg_down.png";
    buttonGraphic.top = 20;
    buttonLabel.top = 72;
  });

  button.addEventListener('touchend', function(e) {
    button.backgroundImage = path + "images/button_large_bg.png";
    buttonGraphic.top = 15;
    buttonLabel.top = 65;
  });
  
  button.addEventListener('touchcancel', function(e) {
    button.backgroundImage = path + "images/button_large_bg.png";
    buttonGraphic.top = 15;
    buttonLabel.top = 65;
  });

  return button;
};

})();