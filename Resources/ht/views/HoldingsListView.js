// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

(function() {
  // Local variables.
  var platformWidth = Ti.App.PLATFORMWIDTH;
  var win = Titanium.UI.currentWindow;
  var path = Ti.App.ABS_PATH;
  var styles = win.HT.View.properties;
  var accountsData = Ti.App.USER.accounts;
  var userHoldingsList = [];
  var holdingsSearchResultsList = [
    "VFSTX",
    "VWINX",
    "VBMFX",
    "MHP",
    "MMUSA"
  ];
  var holdingInstructionsText = (userHoldingsList.length) ? "Or edit an existing holding:" : "You have no holdings added yet. Use the above search field to find your first holding."
  
  /**
  Data Models
  ===========
  Any reusable view objects will be stored here.
  */
  var _symbolsList = Ti.App._popularServices;
  
  
  /**
  Global Views
  ============
  Any reusable view objects will be stored here.
  */
  
  var view = Titanium.UI.createView({
    width: platformWidth,
    height: 375,
    top: 0,
    left: 0,
    right: 0
  });
  
  // If there's no holdings, add this view
  var HoldingsListView = Titanium.UI.createView({
    width: platformWidth,
    height: 375,
    top: 0,
    left: 0,
    right: 0
  });
  
  // If there are holdings, populate this view.
  
  /**
  Windows
  =======
  Any windows go here
  */
  var secureTitleView = win.HT.View.secureTitle({title: "Add Account"});
  var EditHoldingsWindow = Titanium.UI.createWindow(
    win.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
      title: "Edit Holding",
      titleControl: secureTitleView,
      url: "/ht/views/HoldingsEditView.js",
      HT: win.HT
    })
  );
  
  /**
  Search
  ======
  The search field:
  */
  var SearchView = Titanium.UI.createSearchBar(win.HT.combine(styles.SearchBar, {
      hintText: "Enter a symbol to search for a holding",
      top: 0
    })
  );
  
  SearchView.addEventListener("focus", function(e) {
    NoHoldingsLabel.hide();
  });
  
  SearchView.addEventListener('change', function(e) {
    if (e.value === "") {
      NoHoldingsLabel.show();
      HoldingsButtonsView.hide();
    }
  });
  
  SearchView.addEventListener('return', function(e) {
    SearchView.blur();
    HoldingsButtonsView.show();
  });
  
  SearchView.addEventListener('cancel', function(e) {
    SearchView.blur();
    NoHoldingsLabel.show();
    HoldingsButtonsView.hide();
  });
  
  var ServicesScrollView = Titanium.UI.createScrollView(styles.SearchResultsScrollView);
  
  // Label for when there are no holdings added yet
  var NoHoldingsLabel = Titanium.UI.createLabel({
    text: holdingInstructionsText,
    width: platformWidth - 30,
    height: "auto",
    left: 15,
    color: "#998654",
    font: {fontSize: 12},
    textAlign: "center",
    shadowColor: "white",
    shadowOffset: {x: 0, y: 0.5}
  });
  
  var HoldingsButtonsView = Titanium.UI.createView({
    width: platformWidth,
    height: "auto",
    top: 42,
    left: 0,
    visible: false
  });
  
  for (var i=0, len=holdingsSearchResultsList.length; i < len; i++) {
      var _accountName = holdingsSearchResultsList[i];
      var HoldingsButton = Titanium.UI.createButton({
        title: _accountName,
        width: 290,
        height: 35,
        top: 45 * i,
        left: 15,
        color: "#0c0905",
        font: {
          fontSize: 12,
          fontWeight: "bold"
        },
        textAlign: "left",
        shadowColor: "white",
        shadowOffset: {x: 0, y: 1},
        backgroundImage: path + "images/btn_popular_service.png"
      });
      
      HoldingsButton.addEventListener('click', function(e) {
        var holdingName = e.source.title;
        EditHoldingsWindow._holdingName = holdingName;
        Titanium.UI.currentTab.open(EditHoldingsWindow);
        
        backButton.addEventListener('click', function() {
          AccountCredsWindow.close();
        });
      });
    
      HoldingsButtonsView.add(HoldingsButton);
    }
  
  
  
  var message = win.HT.View.createMessageView({text: "Visit Hivetrader.com for more information on security.", target: "someWindow"}).bar;
  
  ServicesScrollView.add(NoHoldingsLabel);
  ServicesScrollView.add(HoldingsButtonsView);
  view.add(ServicesScrollView);
  view.add(SearchView);
  view.add(message);
  
  win.add(view);
})();