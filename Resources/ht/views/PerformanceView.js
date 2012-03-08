// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================
Ti.include('../vendor/underscore.js');
(function() {
  var platformWidth = Ti.App.PLATFORMWIDTH;
  var win = Titanium.UI.currentWindow;
  var path = Ti.App.ABS_PATH;
  var styles = win.HT.View.properties;
  var accountsData = Ti.App.USER.accounts;
  
  /**
  Models
  ======
  */
  var _holdingsList = Ti.App.USER.accounts;
  var positionsList = [];

  for (var j = 0, len = _holdingsList.length; j < len; j++) {
    var accountPositionsList = _holdingsList[j].positions;
    for (var k = 0, leng = accountPositionsList.length; k < leng; k++) {
      positionsList.push(accountPositionsList[k]);
    }
  }
  
  // Start by grabbing all the holdings data, to extract the positions from each.
  
  /**
  Section Windows
  ===============
  For organization's sake we'll keep all the windows we'll use in this section defined here.
  */
  var PerformanceCardsWindow = Titanium.UI.createWindow(win.HT.combine(styles.BaseWindow, styles.CardsWindow, {
    title: "Performance",
    HT: win.HT
  }));
  
  var PerformanceHoldingsWindow = Titanium.UI.createWindow(win.HT.combine(styles.BaseWindow, styles.CardsWindow, {
    title: "Holdings",
    HT: win.HT
  }));
  
  // Views
  var view = Titanium.UI.createView({
    width: platformWidth,
    height: 375,
    top: 0,
    left: 0,
    right: 0
  });
  
  var TableScrollView = Titanium.UI.createScrollView({
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
    var percentage = data.percentage;
    var accountValue = data.value;
    var ytd = data.ytd;
    var numberOfHoldings = data.positions.length;
    
    var cardFlag = {
      BG: (ytd > 0) ? path + "images/bg_label_gain_perf.png" : path + "images/bg_label_loss_perf.png",
      shadowColor: (ytd > 0) ? "#346e86" : "#9a2e49"
    };
    
    var row = Titanium.UI.createTableViewRow(styles.TableViewRow);
    
    var AccountLabel = Titanium.UI.createLabel({
      width: 126,
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
    
    var NumberOfHoldingsLabel = Titanium.UI.createLabel({
      width: 235,
      height: 15,
      bottom: 10,
      left: 15,
      text: accountsData[i].value,
      color: "#959085",
      font: {
        fontSize: 15,
        fontWeight: "bold"
      },
      shadowColor: "white",
      shadowOffset: {x: 0, y: 0.5}
    });
    
    var AccountPercentageLabel = Titanium.UI.createLabel({
      width: 63,
      height: 19,
      left: 125,
      text: percentage + "%",
      font: {
        fontSize: 17,
        fontWeight: "bold"
      },
      textAlign: "right",
      color: "#777165"
    });
    
    var PerformanceAmountLabel = Titanium.UI.createLabel({
      width: "auto",
      height: 27,
      right: 55,
      text: (ytd > 0) ? "+" + ytd + "%" : ytd + "%",
      color: "white",
      font: {
        fontSize: 17,
        fontWeight: "bold"
      },
      shadowColor: cardFlag.shadowColor,
      shadowOffset: {x:0, y: 1},
      backgroundPaddingRight: 10,
      backgroundPaddingLeft: 10,
      backgroundPaddingTop: 0,
      backgroundPaddingBottom: 0,
      backgroundImage: cardFlag.BG
    });
    
    var ArrowImage = Titanium.UI.createImageView({
      width: 6,
      height: 9,
      anchorPoint: {y: 0.5},
      right: 17,
      image: path + "images/tablerow_arrow.png"
    });
    
    var _border = Titanium.UI.createView({
      width: platformWidth,
      height: 1,
      backgroundColor: "#c0baae",
      bottom: -1,
      left: 0,
      right: 0
    });
    
    // Build the table row
    row.add(AccountLabel);
    row.add(NumberOfHoldingsLabel);
    row.add(PerformanceAmountLabel);
    row.add(ArrowImage);
    row.add(_border);
    row.className = "tableRow";
    
    // Push the row to an arry holding all the rows
    accountsTableArray.push(row);
  }
  
  accountsTable.data = accountsTableArray;
  TableScrollView.add(accountsTable);
  
  var PerformanceAccountsCards = win.HT.View.createPerformanceCards({
    data: accountsData,
    buttons: [
        {
          title: "View Holdings",
          icon: "btn_card_manage.png",
          action: ""
        },
        {
          title: "Change Interval",
          icon: "btn_card_manage.png",
          action: ""
        }
    ]
  });
  
  var PerformanceHoldingsCards = win.HT.View.createPerformanceHoldingsCards({
    data: positionsList,
    buttons: [
        {
          title: "Change Interval",
          icon: "btn_card_manage.png",
          action: ""
        }
    ]
  });

  // The Performance cards.
  PerformanceCardsWindow.add(PerformanceAccountsCards);
  
  accountsTable.addEventListener('click', function(e) {
    var idx = e.index;
    var BackButton = win.HT.View.customBackButton({});
    PerformanceCardsWindow.leftNavButton = BackButton;
    PerformanceAccountsCards.scrollToView(idx);
    Titanium.UI.currentTab.open(PerformanceCardsWindow);
    
    BackButton.addEventListener('click', function(e) {
      PerformanceCardsWindow.close();
    });
  });
  
  PerformanceHoldingsWindow.add(PerformanceHoldingsCards);
  
  // The Performance Holdings
  PerformanceAccountsCards.addEventListener("view_holdings", function() {
    var BackButton = win.HT.View.customBackButton({});
    PerformanceHoldingsWindow.leftNavButton = BackButton;
    Titanium.UI.currentTab.open(PerformanceHoldingsWindow);
    
    BackButton.addEventListener('click', function(e) {
      PerformanceHoldingsWindow.close();
    });
  });  
  
  var PerformanceLink = win.HT.View.createMessageView({text: "Learn more about Performance at Hivetrader.com"});
  var PerformanceLinkView = PerformanceLink.bar;
  
  view.add(TableScrollView);
  view.add(PerformanceLinkView);
  //alert("no performance calc'd yet amigo.");
  win.add(view);
})();