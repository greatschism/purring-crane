// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

function AccountsSearch(args) {
	var platformWidth = Ti.App.PLATFORMWIDTH;
	var styles = args.HT.View.properties;
	var path = Ti.App.ABS_PATH;
	var win = Ti.UI.createWindow(args.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
		title : "Add Account",
		HT : args.HT
	}));
	
	var backButton = win.HT.View.customBackButton({'win': win});
	win.leftNavButton = backButton;

	var searchRows = [];
	
	
	function loadAccounts() {
		var results = [];
		var db = Ti.Database.install(Ti.Filesystem.getResourcesDirectory() + '/hivetrader.sqlite', 'accounts');
		var rows = db.execute('SELECT DISTINCT nick FROM accounts');

		while(rows.isValidRow()) {
			results.push({
				name : '' + rows.fieldByName('nick') + ''
			});
			rows.next();
		}
		db.close();
		return results;
	};


	/**
	 Data Models
	 ===========
	 Any reusable view objects will be stored here.
	 */
	var _popularServicesList = Ti.App._popularServices;

	/**
	 Global Views
	 ============
	 Any reusable view objects will be stored here.
	 */
	var view = Ti.UI.createView({
		width : platformWidth,
		height : 375,
		top : 0,
		left : 0,
		right : 0
	});

	// If there's no holdings, add this view
	var HoldingsListView = Ti.UI.createView({
		width : platformWidth,
		height : 375,
		top : 0,
		left : 0,
		right : 0
	});

	/**
	 Search
	 ======
	 The search field:
	 */
	var SearchView = Ti.UI.createSearchBar(win.HT.combine(styles.SearchBar, {
		hintText : "Enter trading account name",
		top : 0
	}));

	// A hidden table that will be populated with all the search data.
	// Populate the data array first
	for(var i = 0, len = _popularServicesList.length; i < len; i++) {
		var row = Ti.UI.createTableViewRow({
			title : _popularServicesList[i],
			backgroundColor : "#f4ebbd"
		});
		searchRows.push(row);
	}

	// The search results scrollview, hidden on to begin with
	var SearchTableScrollView = Ti.UI.createScrollView(win.HT.combine(styles.SearchResultsScrollView, {
		visible : false
	}));

	var SearchTable = Ti.UI.createTableView({
		data : searchRows,
		anchor : {
			x : 0,
			y : 0
		},
		searchHidden : true,
		separatorColor : "#cdc287",
		backgroundColor : "#f4ebbd"
	});

	SearchTable.addEventListener("click", function(e) {
		var idx = e.index;
		var row = e.row.rowData;
		var rowData = e.rowData;
		var _title = rowData.title;
		
		Ti.App.Properties.setString('newPosAName', _title);
		
		var AccountCredsWindow = require('/ht/views/AccountsCredentials');
		var AccountCredsWindow = new AccountCredsWindow({HT:win.HT, accountName:_title,});
		Ti.UI.currentTab.open(AccountCredsWindow);
 
	});
	
	/*
	 * The Popular Services View
	 */
	
	var ServicesScrollView = Ti.UI.createScrollView(styles.SearchResultsScrollView);

	// Or choose a popular trading service:
	ServicesScrollView.add(Ti.UI.createLabel({
		text : "Or choose a popular trading service:",
		width : platformWidth - 20,
		height : 12,
		left : 15,
		top : 18,
		color : "#998654",
		font : {
			fontSize : 12
		},
		shadowColor : "white",
		shadowOffset : {
			x : 0,
			y : 0.5
		}
	}));

	var buttonsView = Ti.UI.createView({
		width : platformWidth,
		height : "auto",
		top : 42,
		left : 0
	});

	for(var i = 0, len = _popularServicesList.length; i < len; i++) {
		var _accountName = _popularServicesList[i];
		var popularServiceButton = Ti.UI.createButton({
			title : _accountName,
			width : 290,
			height : 35,
			top : 45 * i,
			left : 15,
			color : "#0c0905",
			font : {
				fontSize : 12,
				fontWeight : "bold"
			},
			textAlign : "left",
			shadowColor : "white",
			shadowOffset : {
				x : 0,
				y : 1
			},
			backgroundImage : path + "images/btn_popular_service.png"
		});

		popularServiceButton.addEventListener('click', function(e) {
			var _title = e.source.title;
			
			Ti.App.Properties.setString('newPosAName', _title);
			
			var AccountCredsWindow = require('/ht/views/AccountsCredentials');
			var AccountCredsWindow = new AccountCredsWindow({HT:win.HT, accountName:_title,});
			Ti.UI.currentTab.open(AccountCredsWindow);
		});

		buttonsView.add(popularServiceButton);
	}
	
	/*
	 * The Popular Services View
	 */
	
	var ServicesScrollView = Ti.UI.createScrollView(styles.SearchResultsScrollView);

	// Or choose a popular trading service:
	ServicesScrollView.add(Ti.UI.createLabel({
		text : "Or choose a popular trading service:",
		width : platformWidth - 20,
		height : 12,
		left : 15,
		top : 18,
		color : "#998654",
		font : {
			fontSize : 12
		},
		shadowColor : "white",
		shadowOffset : {
			x : 0,
			y : 0.5
		}
	}));

	var buttonsView = Ti.UI.createView({
		width : platformWidth,
		height : "auto",
		top : 42,
		left : 0
	});

	for(var i = 0, len = _popularServicesList.length; i < len; i++) {
		var _accountName = _popularServicesList[i];
		var popularServiceButton = Ti.UI.createButton({
			title : _accountName,
			width : 290,
			height : 35,
			top : 45 * i,
			left : 15,
			color : "#0c0905",
			font : {
				fontSize : 12,
				fontWeight : "bold"
			},
			textAlign : "left",
			shadowColor : "white",
			shadowOffset : {
				x : 0,
				y : 1
			},
			backgroundImage : path + "images/btn_popular_service.png"
		});

		popularServiceButton.addEventListener('click', function(e) {
			var _title = e.source.title;
			
			Ti.App.Properties.setString('newPosAName', _title);
			
			var AccountCredsWindow = require('/ht/views/AccountsCredentials');
			var AccountCredsWindow = new AccountCredsWindow({HT:win.HT, accountName:_title,});
			Ti.UI.currentTab.open(AccountCredsWindow);
		});

		buttonsView.add(popularServiceButton);
	}

	SearchView.addEventListener("focus", function(e) {
		SearchTableScrollView.show();
		ServicesScrollView.hide();
	});

	SearchView.addEventListener("blur", function(e) {
		SearchTableScrollView.hide();
		ServicesScrollView.show();
	});

	SearchView.addEventListener('change', function(e) {
		Ti.API.debug('search bar: ' + e.value);

		if(e.value.length > 1) {

			var xhrSymbolSearch = Ti.Network.createHTTPClient();
			xhrSymbolSearch.onload = function() {
				var matches = JSON.parse(this.responseText);
				Ti.API.debug(matches);
				var fetchedData = [];

				for(var x in matches.results) {
					fetchedData.push({
						title : matches.results[x].name,
						inst : matches.results[x]
					});
				}

				SearchTable.setData(fetchedData);
			};

			xhrSymbolSearch.open('GET', 'http://hivetrader.wehadthetwoforty.com/api/institutions/more/' + e.value + '/0/');
			xhrSymbolSearch.send();
		}
	});

	SearchView.addEventListener('return', function(e) {
		SearchView.blur();
	});

	SearchView.addEventListener('cancel', function(e) {
		SearchView.blur();
		SearchTableScrollView.hide();
		ServicesScrollView.show();
	});
	var message = win.HT.View.createMessageView({
		text : "Visit Hivetrader.com for more information on security.",
		target : "someWindow"
	}).bar;

	ServicesScrollView.add(buttonsView);
	SearchTableScrollView.add(SearchTable);

	view.add(SearchTableScrollView)
	view.add(ServicesScrollView);
	view.add(SearchView);
	view.add(message);

	win.add(view);

	return win;
}

module.exports = AccountsSearch;
