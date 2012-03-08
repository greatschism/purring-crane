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
  
  /**
  Model Methods   
  =============
  */
 function loadAccounts() {
    var results = [];
    var db = Titanium.Database.install(Titanium.Filesystem.getResourcesDirectory() + '/hivetrader.sqlite','accounts');
    var rows = db.execute('SELECT DISTINCT name FROM accounts');
    
    while (rows.isValidRow()) {
      results.push({name: '' + rows.fieldByName('name') + ''});
      rows.next();
    }
    db.close();
    return results;
  };
  
  var _data = loadAccounts();
 
  /**
  Global Views
  ============
  Any reusable view objects will be stored here.
  */
  
  // The Add Account Button [+] for the top right
  var AddAccountButton = win.HT.View.createAddButton();
  
  // Hook up the click event to open a Search window
  AddAccountButton.addEventListener("click", function() {
    var backButton = win.HT.View.customBackButton({title: "Cancel"});
    
    var secureTitleView = win.HT.View.secureTitle({title: "Add Account"});
    
    var SearchAccountsWindow = Titanium.UI.createWindow(
      win.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
        title: "Add Account",
        url: "/ht/views/AccountsSearch.js",
        className: "base-window",
  			HT: win.HT,
  			titleControl: secureTitleView,
        leftNavButton: backButton
      })
    );
    Titanium.UI.currentTab.open(SearchAccountsWindow);
    backButton.addEventListener('click', function() {
      SearchAccountsWindow.close();
    });
  });
  
  /**
  Section Windows
  ===============
  For organization's sake we'll keep all the windows we'll use in this section defined here.
  */
  
  // The Portfolio cards view
  var AccountCardsWindow = Titanium.UI.createWindow(
    win.HT.combine(styles.BaseWindow, styles.CardsWindow, {
      title: "Accounts",
      HT: win.HT,
      rightNavButton: AddAccountButton
    })
  );
  
  var EditHoldingsWindow = Titanium.UI.createWindow(
    win.HT.combine(styles.YellowGradientWindow, {
      title: "Edit Holdings",
      HT: win.HT
    })
  );
  
 
 // Start Views ==========================================
 
 /**
 No Accounts Added
 =================
 
 */
  var NoAccountsAddedView = Titanium.UI.createView(
    win.HT.combine(styles.YellowGradientWindow, {
      width: platformWidth,
      height: 375,
      top: 0,
      left: 0,
      right: 0
    })
  );
  
  var NoAccountsHeaderLabel = Titanium.UI.createLabel({
    width: "auto",
    height: 24,
    top: 33,
    text: "No accounts added?",
    textAlign: "center",
    font: {
      fontSize: 21,
      fontWeight: "bold"
    },
    color: "#0c0905",
    shadowColor: "white",
    shadowOffset: {x: 0, y: 1}
  });
  
  var NoAccountsLeadInLabel = Titanium.UI.createLabel({
    width: 215,
    height: "auto",
    top: 66,
    text: "Hivetrader can automatically and securely sync your trades and accounts. It’s simple and secure.",
    textAlign: "center",
    font: {
      fontSize: 14
    },
    color: "#998654",
    shadowColor: "white",
    shadowOffset: {x: 0, y: 0.5}
  });
  
  var BeeSafeGraphic = Titanium.UI.createImageView({
    width: 155,
    height: 94,
    top: 140,
    image: path + "images/secure_bee_safe.png"
  });
  
  var LargeAddAccountButton = Titanium.UI.createButton({
    width: 240,
    height: 51,
    top: 255,
    title: "+ Add your first account",
    backgroundImage: path + "images/btn_large_blue.png",
    backgroundTopCap: 20,
    font: {
      fontSize: 14,
      fontWeight: "bold"
    },
    textAlign: "center",
    color: "white"
  });
  
  var SecureMessage = win.HT.View.createMessageView({
    text: "Visit Hivetrader.com for more info. on security."
  });
  
  var SecureMessageView = SecureMessage.bar;
  
  // Build the No Accounts view
  NoAccountsAddedView.add(NoAccountsHeaderLabel);
  NoAccountsAddedView.add(NoAccountsLeadInLabel);
  NoAccountsAddedView.add(SecureMessageView);
  NoAccountsAddedView.add(BeeSafeGraphic);
  NoAccountsAddedView.add(LargeAddAccountButton);
  
  /**
  Portfolio Accounts List
  =======================
  */
  var AccountsView = Titanium.UI.createView({
    width: platformWidth,
    height: 375,
    top: 0,
    left: 0,
    right: 0
  });
  
  var HomeRibbons = Titanium.UI.createView({
    width: platformWidth,
    height: 160,
    top: 0,
    left: 0,
    right: 0
  });
  
  var AccountsPane = win.HT.View.createSummaryPane({
    label: "Acounts:",
    value: Ti.App.USER.accounts.length
  });
  
  var TotalValuePane = win.HT.View.createSummaryPane({
    label: "Today:",
    value: "$20,231.00",
    type: "gainloss"
  });
  
  AccountsPane.left = 0;
  TotalValuePane.right = 0;
  
  HomeRibbons.add(AccountsPane);
  HomeRibbons.add(TotalValuePane);
  
  var tableScrollView = Titanium.UI.createScrollView({
    width: platformWidth,
    height: 281,
    top: 52,
    left: 0,
    right: 0,
    anchor: {x:0, y:0},
    showVerticalScrollIndicator: true
  });
  
  // Build out the table
  var AccountsTable = Titanium.UI.createTableView(styles.TableView);
  var accountsTableArray = []; // Stores the table row objects.
  
  // Loop through the accounts data
  for (var i = 0, len = _data.length; i < len; i++) {
    var title = _data.name;
    // var total = _data.value;
    // var percentage = _data.percentage;
    // var accountValue = _data.value;
    // var numberOfHoldings = _data.positions.length;
    
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
      text: "5 holdings",
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
      text: "12%",
      font: {
        fontSize: 17,
        fontWeight: "bold"
      },
      textAlign: "right",
      color: "#777165"
    });
    
    var AccountWorthLabel = Titanium.UI.createLabel({
      width: 126,
      height: 19,
      right: 34,
      text: "1",
      font: {
        fontSize: 17,
        fontWeight: "bold"
      },
      textAlign: "right",
      color: "#777165"
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
    row.add(AccountWorthLabel);
    row.add(ArrowImage);
    row.add(_border);
    row.className = "tableRow";
    
    // Push the row to an arry holding all the rows
    accountsTableArray.push(row);
  }
  // Add the table rows
  AccountsTable.data = accountsTableArray;
  tableScrollView.add(AccountsTable);
  
  var PortfolioMessage = win.HT.View.createMessageView({text: "Values as of Mar 28, 2011 at 10:50AM GMT+01:00"});
  var PortfolioMessageView = PortfolioMessage.bar;
  
  // Render out the account cards
  var cards = win.HT.View.createAccountsCards({
    data: accountsData,
    buttons: [
      {
        title: "Edit Holdings",
        icon: "btn_card_holdings.png",
        action: ""
      },
      {
        title: "Disconnect",
        icon: "btn_card_disconnect.png",
        action: ""
      }
    ]
  });
  // Add the cards to the base Account Cards window
  AccountCardsWindow.add(cards);
  
  AccountCardsWindow.addEventListener("edit", function(e) {
    var secureTitleView = win.HT.View.secureTitle({title: "Add Account"});
    var EditHoldingsWindow = Titanium.UI.createWindow(
      win.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
        title: "Edit Holding",
        titleControl: secureTitleView,
        url: "/ht/views/HoldingsEditView.js",
        HT: win.HT
      })
    );
    
    Titanium.UI.currentTab.open(EditHoldingsWindow);
  });
  
  // Bind the table rows to open the corresponding data
  AccountsTable.addEventListener("click", function(e) {
    var idx = e.index;
    var backButton = win.HT.View.customBackButton({title: "Back"});
    AccountCardsWindow.leftNavButton = backButton;
    cards.scrollToView(idx);
    
    Titanium.UI.currentTab.open(AccountCardsWindow);
    
    backButton.addEventListener("click", function(e) {
      AccountCardsWindow.close();
    });
  });
  
  AccountsView.add(HomeRibbons);
  AccountsView.add(PortfolioMessageView);
  AccountsView.add(tableScrollView);
  
  // End Section Views ==========================================
  
  // Irregardless we'll always have the AddAccountButton added to the window
  win.rightNavButton = AddAccountButton;
    
  // If the user is signed in or has accounts, we'll show the accounts window,
  // otherwise we'll load the new accounts window, and prompt them to add some.
  if (Ti.App.USER.isSignedIn) {
    win.add(AccountsView);
  } else {
    win.add(NoAccountsAddedView);
  }
  
})();
