// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

(function() {
  var platformWidth = Ti.App.PLATFORMWIDTH;
  var win = Titanium.UI.currentWindow;
  var path = Ti.App.ABS_PATH;
  var styles = win.HT.View.properties;
  
  // Data
  var accountsData= [
    {
      name: "thinkorswim - Investments",
      holder: "thinkorswim",
      value: "$2,704.19",
      status: "active",
      hasChild: true,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "32 minutes",
      url: "http://thinkorswim.com/"
    },
    {
      name: "E*Trade",
      holder: "E*Trade",
      value: "$23,791.27",
      status: "error",
      hasChild: true,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "13 minutes",
      url: "http://thinkorswim.com/"
    },
    {
      name: "Forex Capital Markets FXCM",
      holder: "Forex",
      value: "$1,503.92",
      status: "pending",
      hasChild: true,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "12 minutes",
      url: "http://thinkorswim.com/"
    }
  ];
  
  var addButton = win.HT.View.createAddButton();
  
  addButton.addEventListener('click', function() {
    var backButton = win.HT.View.customBackButton({title: "Back"});
    
    var secureTitleView = win.HT.View.secureTitle({title: "Add Account"});
    
    var SearchAccountsWindow = Titanium.UI.createWindow(win.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
      title: "Add Account",
      url: "/ht/views/AccountsSearch.js",
      className: "base-window",
			HT: win.HT,
			titleControl: secureTitleView,
      leftNavButton: backButton
    }));
    Titanium.UI.currentTab.open(SearchAccountsWindow);
    backButton.addEventListener('click', function() {
      SearchAccountsWindow.close();
    });
  });
  
  var AccountsCardsWindow = Titanium.UI.createWindow(win.HT.combine(styles.BaseWindow, styles.CardsWindow, {
    title: "Accounts",
    HT: win.HT,
    rightNavButton: addButton
  }));
  
  var backButton = win.HT.View.customBackButton({});
  
  var view = Titanium.UI.createView({
    width: platformWidth,
    height: 375,
    top: 0,
    left: 0,
    right: 0
  });
  
  var tableScrollView = Titanium.UI.createScrollView({
    width: platformWidth,
    height: 333,
    top: 0,
    left: 0,
    right: 0,
    anchor: {x:0, y:0}
  });
  
  var accountsTable = Titanium.UI.createTableView(styles.TableView);
  var accountsTableArray = [];
  for (var i = 0, len = accountsData.length; i < len; i++) {
    var data = accountsData[i];
    var title = data.name;
    var total = data.value;
    var imageFile = path + "images/flag_" + data.status + ".png";
    
    var row = Titanium.UI.createTableViewRow(styles.TableViewRow);
    
    var accountLabel = Titanium.UI.createLabel({
      width: 235,
      height: 15,
      top: 15,
      left: 15,
      anchor: {x: 0, y: 0},
      text: title,
      color: "#0c0905",
      font: {
        fontSize: 15,
        fontWeight: "bold"
      },
      shadowColor: "white",
      shadowOffset: {x: 0, y: 0.5}
    });
    
    var accountWorthLabel = Titanium.UI.createLabel({
      width: 235,
      height: 15,
      bottom: 10,
      left: 15,
      text: total,
      color: "#959085",
      font: {
        fontSize: 15,
        fontWeight: "bold"
      },
      shadowColor: "white",
      shadowOffset: {x: 0, y: 0.5}
    });
    
    var flagImage = Titanium.UI.createImageView({
      width: 22,
      height: 17,
      anchorPoint: {y: 0.5},
      right: 38,
      image: imageFile
    });
    
    var arrowImage = Titanium.UI.createImageView({
      width: 6,
      height: 9,
      anchorPoint: {y: 0.5},
      right: 17,
      image: path + "images/tablerow_arrow.png"
    });
    
    var borderBottom = Titanium.UI.createView({
      width: platformWidth,
      height: 1,
      backgroundColor: "#c0baae",
      bottom: -1,
      left: 0,
      right: 0
    });
    
    row.add(accountLabel);
    row.add(accountWorthLabel);
    row.add(flagImage);
    row.add(arrowImage);
    row.add(borderBottom);
    row.className = "tableRow";
    accountsTableArray.push(row);
  }
  
  accountsTable.data = accountsTableArray;
  tableScrollView.add(accountsTable);
  
  var message = win.HT.View.createMessageView({text: "Balances as of Mar 28, 2011 at 10:50AM GMT+01:00"}).bar;
  
  var cards = win.HT.View.createAccountsCards({
    data: accountsData,
    buttons: [
      {
        title: "Visit Website",
        icon: "btn_card_website.png",
        action: ""
      },
      {
        title: "Disconnect",
        icon: "btn_card_disconnect.png",
        action: ""
      }
    ]
  });
  
  AccountsCardsWindow.add(cards);
  
  accountsTable.addEventListener('click', function(e) {
    var idx = e.index;
    AccountsCardsWindow.leftNavButton = backButton;
    cards.scrollToView(idx);
    
    Titanium.UI.currentTab.open(AccountsCardsWindow);
    
    backButton.addEventListener('click', function(e) {
      AccountsCardsWindow.close();
    });
  });
  
  view.add(message);
  view.add(tableScrollView);
  win.add(view);
})();