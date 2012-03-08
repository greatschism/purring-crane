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
  var cards = null;
  var _accounts = Ti.App.USER.accounts;
  var _firstRun = true;
  var tableTimer = null;
  var cardsTimer = null;
  
  // Pluck the symbols out of the _positions.
  // Loop through the list of user accounts and strip out the positions
  var _positions = [];
  var _globalPositions = [];
  var marketRowObjects = [];
  // Loop through and pluck the positions
  // TODO: Change this to a DB call when the positions are stored locally.
  for (var j = 0, len = _accounts.length; j < len; j++) {
    var account_positions = _accounts[j].positions;
    for (var k = 0, leng = account_positions.length; k < leng; k++) {
      _positions.push(account_positions[k]);
    }
  }
  
  // Some view wide view objects that we'll emply down the line
  var YQLLoadingIndicator = Titanium.UI.createActivityIndicator();
  var backButton = win.HT.View.customBackButton({});
  var accountsTable = Titanium.UI.createTableView(styles.TableView);
  var RefreshButton = Titanium.UI.createButton({
    top: 0,
    right: 0,
    width: 33,
    height: 30,
    image: path + "/images/icon_refresh.png",
    backgroundImage: path + "images/square_button.png"
  });
  
  /* PositionCalculator
   * An object that gets created with each new YQL request. Used when parsing YQL data.
   * @param {Number} change The PercentChange from YQL
   * @param {Number} buysell The local buy/sell type
   * @param {Number} prevClose The previous close price from YQL
   * @param {Number} bid The Bid price from YQL
   * @param {Number} ask The Ask price from YQL
   */
  function PositionCalculator(change, buysell, prevClose, bid, ask) {
    this.change = change;
    this.buysell = buysell;
    this.prevClose = prevClose;
    this.bid = bid;
    this.ask = ask;
  }

  PositionCalculator.prototype = {
    /* If there is no Bid or Ask price, use the PreviousClose
     * @param {Number} this.bid
     * @param {Number} this.ask
     * @param {Number} this.prevClose
     * @returns {String} Position Value
     */
    posValue: function() {
      var val = 0;
      if (this.bid === null || this.ask === null) {
        val = this.prevClose;
      } else {
        if (this.buysell === "BUY") {
          val = this.bid;
        } else {
          val = this.ask;
        }
      }
      return val;
    },
    /* Takes the change, and if it isn't a number, defer to calcChange
     * @return {Number}
     */
    getChange: function() {
      var num = parseFloat(this.change);
      var val = num;
      if (num == null) {
        val = this.calcChange();
      }
      return val;
    },
    /* Calculates the change if not supplied by YQL (Ask - Previous Close) / Previous Close
     * @param {Number} this.ask
     * @param {Number} this.prevClose
     * @return {Number}
     */
    calcChange: function() {
      var num = (this.ask - this.prevClose) / this.prevClose;
      return num;
    }
  };

  /**
   Models
   */
  var symbolsList = _.pluck(_positions, "symbol").join('","');
  var query = 'select * from yahoo.finance.quotes where symbol in ("' + symbolsList + '")';
  
  // YQL fetch method. Fires a fail event on the view object if something goes wrong.
  var fetchYQLData = function() {
    YQLLoadingIndicator.show();
    Ti.UI.currentWindow.setRightNavButton(YQLLoadingIndicator);
    
    Titanium.Yahoo.yql(query, function(e) {
      var responseData = e.data;

      // If it fails, alert the user.
      if (responseData == null) {
        view.fireEvent('markets:yqlfail');
        return;
      }
      
      var timestamp = new Date();
      MessageBar.message.text = "Last updated at " + String.formatTime(timestamp) + ' on ' + String.formatDate(timestamp, "long");
      
      for (var c = 0, len = responseData.quote.length; c < len; c++) {
        var _data = responseData.quote[c];
        var pos = _positions[c];
        var dayRange = _data.DaysRange;
        var valueObject = new PositionCalculator(_data.PercentChange, pos.status, _data.PreviousClose, _data.Bid, _data.Ask);
        var change = valueObject.getChange();
        var direction = (change > 0) ? "gain" : "loss";
        
        _globalPositions[c] = _.extend(responseData.quote[c], _positions[c]);
        _globalPositions[c].change = change;
        _globalPositions[c].value = valueObject.posValue();
        _globalPositions[c].imageFile = path + "images/flag_" + direction + ".png";
        _globalPositions[c].arrowImage = (change > 0) ? path + "images/arrow_up.png" : path + "images/arrow_down.png";
        _globalPositions[c].cardFlag = {
          BG: (change > 0) ? path + "images/bg_label_gain.png" : path + "images/bg_label_loss.png",
          shadowColor: (change > 0) ? "#6e8b38" : "#a14b25"
        };
        _globalPositions[c].lastUpdateTimestamp = "Last updated at " + String.formatTime(timestamp);
        
        if (dayRange.indexOf("N/A") >= 0) {
          _globalPositions[c].isIntraday = false;
        } else {
          _globalPositions[c].isIntraday = true;
        }
      }
      YQLLoadingIndicator.hide();
      view.fireEvent('markets:yqlsuccess');
    });
  };
  
  // Load on render
  fetchYQLData();
  
  // Update the table view only
  var updateMarketsTable = function() {
    // When we've merged all the objects into one master object, render the table rows and cards.
    _.each(_globalPositions, function(e, i) {
      marketRowObjects[i].amountLabel.text = e.value;
      marketRowObjects[i].arrow.image = e.arrowImage;
      marketRowObjects[i].percentLabel.text = e.change;
      marketRowObjects[i].amountLabel.shadowColor = e.cardFlag.shadowColor;
      marketRowObjects[i].amountLabel.backgroundImage = e.cardFlag.BG;
    });
  };
  
  // Update the market cards
  var updateMarketsCards = function () {
    _.each(_globalPositions, function(e, i) {
      var _card = cards.cardsViewObjects[i];
      _card.AccountValueLabel.text = e.change;
      _card.HiLoLabel.text = e.DaysRange.replace(/([0-9]*\.[0-9]+|[0-9]+) -/, "Hi: $1 - Lo: ");
      _card.LatestPriceLabel.text = "$" + e.LastTradePriceOnly;
      _card.LastRefresh.message.text = e.lastUpdateTimestamp;
      
      if (e.change > 0) {
        _card.HiLoLabel.shadowColor = "#9f4a25";
        _card.CurrentPositionsLabel.color = "#455f13";
        _card.CurrentPositionsLabel.shadowColor = "#c5da9d";
        _card.AccountValueLabel.shadowColor = "#6e8a38";
        _card.HiLoLabel.shadowColor = "#6e8a38"
        _card.LatestPriceHeaderLabel.color = "#455f13";
        _card.LatestPriceHeaderLabel.shadowColor = "#c5da9d";
        _card.LatestPriceLabel.color = "#d5fd86";
        _card.LatestPriceLabel.shadowColor = "#6e8a38";
        _card.CardRibbon.backgroundImage = path + "images/bg_card_market_gain.png";
      } else {
        _card.CurrentPositionsLabel.color = "#5f3713";
        _card.CurrentPositionsLabel.shadowColor = "#eea98d";
        _card.AccountValueLabel.shadowColor = "#9f4a25";
        _card.HiLoLabel.shadowColor = "#9f4a25;"
        _card.LatestPriceHeaderLabel.color = "#5f3713";
        _card.LatestPriceHeaderLabel.shadowColor = "#eea98d";
        _card.LatestPriceLabel.color = "#fecdac";
        _card.LatestPriceLabel.shadowColor = "#9f4a25";
        _card.CardRibbon.backgroundImage = path + "images/bg_card_market_loss.png";
      }
      
    });
  }
  
  /* Takes the YQL returned data and renders the table and cards
   * @param {Object} The YQL returned data from fetchYQLData()
   */
  var renderMarketsTable = function() {
    var accountsTableArray = [];
    var positionLabels = [];
    var positions = _globalPositions;
    
    for (var i = 0, len = positions.length; i < len; i++) {
      
      var row = Titanium.UI.createTableViewRow(styles.TableViewRow);

      var SymbolLabel = Titanium.UI.createLabel({
        width: 144,
        height: 15,
        top: 15,
        left: 15,
        anchor: {x: 0, y: 0},
        text: positions[i].symbol,
        color: "#0c0905",
        font: {
          fontSize: 15,
          fontWeight: "bold"
        },
        shadowColor: "white",
        shadowOffset: {
          x: 0,
          y: 0.5
        }
      });
      
      positionLabels.push(SymbolLabel);

      var RecommendationLabel = Titanium.UI.createLabel({
        width: "auto",
        height: 15,
        bottom: 10,
        left: 15,
        text: positions[i].status,
        color: "#959085",
        font: {
          fontSize: 15,
          fontWeight: "bold"
        },
        shadowColor: "white",
        shadowOffset: {
          x: 0,
          y: 0.5
        }
      });

      var SharesLabel = Titanium.UI.createLabel({
        width: 144,
        height: 15,
        bottom: 10,
        left: (RecommendationLabel.size.width + 20),
        text: positions[i].shares + " shares",
        color: "#959085",
        font: {
          fontSize: 15
        },
        shadowColor: "white",
        shadowOffset: {
          x: 0,
          y: 0.5
        }
      });
      
      var HoldingPercentageLabel = Titanium.UI.createLabel({
        width: 65,
        left: 115,
        text: positions[i].change,
        anchorPoint: {y: 0.5},
        color: "#777165",
        font: {
          fontSize: 17,
          fontWeight: "bold"
        },
        textAlign: "right",
        shadowColor: "white",
        shadowOffset: {
          x: 0,
          y: 0.5
        }
      });

      var ChangeArrowIcon = Titanium.UI.createImageView({
        width: 11,
        height: 15,
        anchorPoint: {y: 0.5},
        left: 185,
        image: positions[i].arrowImage
      });
      
      var HoldingAmountLabel = Titanium.UI.createLabel({
        width: "auto",
        height: 25,
        right: 50,
        text: positions[i].LastTradePriceOnly || "n/a",
        color: "white",
        font: {
          fontSize: 19,
          fontWeight: "bold"
        },
        shadowColor: positions[i].cardFlag.shadowColor,
        shadowOffset: {
          x:0,
          y: 1
        },
        backgroundPaddingRight: 10,
        backgroundPaddingLeft: 10,
        backgroundPaddingTop: 0,
        backgroundPaddingBottom: 0,
        backgroundImage: positions[i].cardFlag.BG
      });

      var arrowImage = Titanium.UI.createImageView({
        width: 6,
        height: 9,
        anchorPoint: {
          y: 0.5
        },
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

      row.add(SymbolLabel);
      row.add(RecommendationLabel);
      row.add(SharesLabel);
      row.add(HoldingAmountLabel);
      // If there's no change, don't bother with the arrow.
      if (positions[i].change !== 0) {
        row.add(ChangeArrowIcon);
      }

      row.add(HoldingPercentageLabel);
      row.add(arrowImage);
      row.add(borderBottom);
      row.className = "tableRow";
      accountsTableArray.push(row);
      
      // Store our updatable table row objects in an object
      var publicViewObjects = {
        amountLabel: HoldingAmountLabel,
        arrow: ChangeArrowIcon,
        percentLabel: HoldingPercentageLabel
      }
      
      // and push them to an accessible array.
      marketRowObjects.push(publicViewObjects);
    }
    
    // Call the market card function, return the card view.
    cards = win.HT.View.createMarketsCards({
      data: _globalPositions,
      buttons: [{
        title: "Manage",
        icon: "btn_card_manage.png",
        action: ""
      },{
        title: "View Chart",
        icon: "btn_card_chart.png",
        action: ""
      }
      ]
    });
    
    var CardsScrollView = Titanium.UI.createScrollableView(
      win.HT.combine(styles.CardScroller, {views: cards.positionCards})
    );
    
    MarketsCardsWindow.add(CardsScrollView);
    
    // When clicking a table row
    accountsTable.addEventListener('click', function(e) {
      var idx = e.index;
      MarketsCardsWindow.leftNavButton = backButton;
      CardsScrollView.scrollToView(idx);
      Titanium.UI.currentTab.open(MarketsCardsWindow);
      
      backButton.addEventListener('click', function(e) {
        MarketsCardsWindow.close();
      });
    });
    
    accountsTable.setData(accountsTableArray);
    accountsTable.top = 125;
    accountsTable.height = 208;
    TableScrollView.add(accountsTable);
  }

  // Homepage Quick Stats
  // TODO: Replace this with API calls
  var quickStatData = [{
    name: "Accounts",
    value: Ti.App.USER.accounts.length
  },{
    name: "Positions",
    value: 16
  },{
    name: "Positive",
    value: 13
  },{
    name: "Negative",
    value: 3
  }];

  // Windows
  var MarketsCardsWindow = Titanium.UI.createWindow(win.HT.combine(styles.BaseWindow, styles.CardsWindow, {
    title: "Market Positions",
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
  
  // Parent view YQL event listeners
  view.addEventListener('markets:yqlsuccess', function(e) {
    if (_firstRun) {
      renderMarketsTable();
      _firstRun = false;
    } else {
      updateMarketsTable();        
      updateMarketsCards();
    }
  });
  
  // Fire when something goes wrong.
  view.addEventListener('markets:yqlfail', function(e) {
    MessageBar.message.text = "Request failed.";
    YQLLoadingIndicator.hide();
    RefreshButton.addEventListener("click", fetchYQLData);
    Ti.UI.currentWindow.setRightNavButton(RefreshButton);
  });

  // Message View
  var MessageBar = win.HT.View.createMessageView({text: "Loading positions"});
  var MessageBarView = MessageBar.bar;

  var HomeRibbons = Titanium.UI.createView({
    width: platformWidth,
    height: 160,
    top: 0,
    left: 0,
    right: 0
  });

  var OverallPane = win.HT.View.createSummaryPane({
    label: "Overall:",
    value: 271.12,
    type: "gainloss"
  });

  var TodayPane = win.HT.View.createSummaryPane({
    label: "Today:",
    value: -17.54,
    type: "gainloss"
  });

  OverallPane.left = 0;
  TodayPane.right = 0;

  HomeRibbons.add(OverallPane);
  HomeRibbons.add(TodayPane);

  /**
   Portfolio Overview
   @description Blue center box, lists recent numbers.
   */
  var OverviewView = Titanium.UI.createView({
    width: platformWidth,
    height: 51,
    top: 52,
    left: 0,
    right: 0,
    backgroundGradient: {
      type:'linear',
      colors:[{
        color:'#c5e0ea',
        position:0.0
      },{
        color:'#a1ccd9',
        position:1.0
      }]
    },
    borderColor: "#88b8c7"
  });

  // To populate the stats, we'll loop over an array of objects to save some trouble.
  // Default amount of stats we can fit is 4
  //
  var quickStats = [];
  
  for (var i=0, len = quickStatData.length; i < len; i++) {
    var blockView = Titanium.UI.createView({
      width: (platformWidth / len),
      height: 51,
      top: 0,
      left: ((platformWidth / len) * i)
    });

    var valueLabelView = Titanium.UI.createLabel({
      text: quickStatData[i].value,
      height: 20,
      top: 10,
      left: 10,
      font: {
        fontSize: 20,
        fontWeight: "bold"
      },
      color: "#235a6b",
      shadowColor: "#d9ebf1",
      shadowOffset: {
        x:0,
        y:0.5
      }
    });

    var typeLabelView = Titanium.UI.createLabel({
      text: quickStatData[i].name,
      height: 10,
      bottom: 10,
      left: 10,
      font: {
        fontSize: 10
      },
      color: "#235a6b",
      shadowColor: "#d9ebf1",
      shadowOffset: {
        x:0,
        y:0.5
      }
    });

    var pipe = Titanium.UI.createView({
      width: 1,
      height: 31,
      anchorPoint: {
        y: 0.5
      },
      right: 0,
      backgroundColor: "#86b7c6"
    });

    blockView.add(valueLabelView);
    blockView.add(typeLabelView);
    if (i < len-1) {
      blockView.add(pipe);
    }
    quickStats.push(blockView);

  }

  OverviewView.add(quickStats);

  var TableHeader = Titanium.UI.createView({
    width: platformWidth,
    height: 25,
    top: 103,
    left: 0,
    right: 0,
    backgroundGradient: {
      type:'linear',
      colors:[{
        color:'#493a24',
        position:0.0
      },{
        color:'#291e11',
        position:1.0
      }]
    }
  });

  TableHeader.add(Titanium.UI.createLabel({
    text: "Latest Market Activity",
    color: "white",
    center: TableHeader,
    left: 10,
    font: {
      fontSize: 9,
      fontWeight: 'bold'
    }
  }));

  var TableScrollView = Titanium.UI.createScrollView({
    width: platformWidth,
    height: 333,
    top: 0,
    left: 0,
    right: 0,
    anchor: {
      x:0,
      y:0
    }
  });
  
  view.add(HomeRibbons);
  view.add(OverviewView);
  view.add(TableHeader);
  view.add(TableScrollView);
  view.add(MessageBarView);
  win.add(view);
    // Kick of the timer
  tableTimer = setInterval(fetchYQLData, 3000);

})();