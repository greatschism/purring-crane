// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

(function() {
  var platformWidth = Ti.App.PLATFORMWIDTH;
  var win = Titanium.UI.currentWindow;
  var path = Ti.App.ABS_PATH;
  var styles = win.HT.View.properties;
  
  // View Data
  var accountsData= [
    {
      name: "thinkorswim - Investments",
      holder: "thinkorswim",
      numOfHoldings: 6,
      percentage: 12,
      value: "$2,704.19",
      priceChange: -101.23,
      status: "active",
      hasChild: true,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "32 minutes",
      url: "http://thinkorswim.com/"
    },
    {
      name: "E*Trade",
      holder: "E*Trade",
      numOfHoldings: 1,
      percentage: 45,
      value: "$23,791.27",
      priceChange: 10.20,
      status: "error",
      hasChild: true,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "13 minutes",
      url: "http://thinkorswim.com/"
    },
    {
      name: "Forex Capital Markets FXCM",
      holder: "Forex",
      numOfHoldings: 3,
      percentage: 2,
      value: "$1,503.92",
      priceChange: -1.12,
      status: "pending",
      hasChild: true,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "12 minutes",
      url: "http://thinkorswim.com/"
    }
  ];
  
  // Windows
  var HoldingsCardsWindow = Titanium.UI.createWindow(win.HT.combine(styles.BaseWindow, styles.CardsWindow, {
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
  
  var HomeRibbons = win.HT.View.createHeaderRibbons({
    leftLabel: "Accounts",
    leftValue: 3,
    rightLabel: "Total Balance",
    rightValue: "$27, 536.16"
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
  accountsTable.top = 52;
  accountsTable.height = 281;
  
  var accountsTableArray = [];
  for (var i = 0, len = accountsData.length; i < len; i++) {
    var data = accountsData[i];
    var title = data.holder;
    var value = data.value;
    var holdings = (data.numOfHoldings === 1) ? data.numOfHoldings + " Holding" : data.numOfHoldings + " Holdings";
    var percentage = data.percentage;
    var direction = data.priceChange;
    var imageFile = path + "images/flag_" + data.status + ".png";
    
    var cardFlag = {
      BG: (direction > 0) ? path + "images/bg_label_gain.png" : path + "images/bg_label_loss.png",
      shadowColor: (direction > 0) ? "#698634" : "#a14b25"
    };
    
    var row = Titanium.UI.createTableViewRow(styles.TableViewRow);
    
    var accountLabel = Titanium.UI.createLabel({
      width: 144,
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
    
    var numberOfHoldingsLabel = Titanium.UI.createLabel({
      width: 144,
      height: 15,
      bottom: 10,
      left: 15,
      text: holdings,
      color: "#959085",
      font: {
        fontSize: 15,
        fontWeight: "bold"
      },
      shadowColor: "white",
      shadowOffset: {x: 0, y: 0.5}
    });
    
    var HoldingAmountLabel = Titanium.UI.createLabel({
      width: "auto",
      height: 27,
      right: 45,
      text: value,
      color: "white",
      font: {
        fontSize: 17,
        fontWeight: "bold"
      },
      shadowColor: cardFlag.shadowColor,
      shadowOffset: {x:0, y: 1},
      backgroundPaddingRight: 10,
      backgroundPaddingLeft: 10,
      backgroundImage: cardFlag.BG
    });
    
    var HoldingPercentageLabel = Titanium.UI.createLabel({
      width: 65,
      right: (HoldingAmountLabel.size.width + 15 + 45),
      text: percentage + "%",
      anchorPoint: {y: 0.5},
      color: "#777165",
      font: {
        fontSize: 17,
        fontWeight: "bold"
      },
      textAlign: "right",
      shadowColor: "white",
      shadowOffset: {x: 0, y: 0.5}
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
    row.add(numberOfHoldingsLabel);
    row.add(HoldingAmountLabel);
    row.add(HoldingPercentageLabel);
    row.add(arrowImage);
    row.add(borderBottom);
    row.className = "tableRow";
    accountsTableArray.push(row);
  }
  
  accountsTable.data = accountsTableArray;
  tableScrollView.add(accountsTable);
  
  var backButton = win.HT.View.customBackButton({});
  
  var cards = win.HT.View.createHoldingsCards({
    data: accountsData,
    buttons: [
        {
          title: "View Holdings",
          icon: "btn_card_holdings.png",
          action: ""
        },
        {
          title: "View Chart",
          icon: "btn_card_chart.png",
          action: ""
        }
    ]
  });
  
  HoldingsCardsWindow.add(cards);
  
  accountsTable.addEventListener('click', function(e) {
    var idx = e.index;
    HoldingsCardsWindow.leftNavButton = backButton;
    cards.scrollToView(idx);
    Titanium.UI.currentTab.open(HoldingsCardsWindow);
    
    backButton.addEventListener('click', function(e) {
      HoldingsCardsWindow.close();
    });
  });
  
  var message = win.HT.View.createMessageView({text: "Balances as of Mar 28, 2011 at 10:50AM GMT+01:00"}).bar;
  
  view.add(HomeRibbons);
  view.add(tableScrollView);
  view.add(message);
  win.add(view);
})();