// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

function HoldingsWindow(args) {
	// Local variables.
	var platformWidth = Ti.App.PLATFORMWIDTH;
	var styles = args.HT.View.properties;
	var path = Ti.App.ABS_PATH;
	var win = Ti.UI.createWindow(args.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
		title : "Add Holdings",
		HT : args.HT
	}));

	var backButton = win.HT.View.customBackButton({
		'win' : win
	});
	win.leftNavButton = backButton;

	var holdingInstructionsText = "You have no holdings added yet. Use the above search field to find your first holding.";

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

	// If there are holdings, populate this view.

	/**
	 Search
	 ======
	 The search field:
	 */
	var SearchView = Ti.UI.createSearchBar(win.HT.combine(styles.SearchBar, {
		hintText : "Enter a symbol to search for a holding",
		top : 0
	}));

	var ServicesScrollView = Ti.UI.createScrollView(styles.SearchResultsScrollView);

	// Label for when there are no holdings added yet
	var NoHoldingsLabel = Ti.UI.createLabel({
		text : holdingInstructionsText,
		width : platformWidth - 30,
		//height : "auto",
		left : 15,
		color : "#998654",
		font : {
			fontSize : 12
		},
		textAlign : "center",
		shadowColor : "white",
		shadowOffset : {
			x : 0,
			y : 0.5
		}
	});

	var HoldingsButtonsView = Ti.UI.createView({
		width : platformWidth,
		//height : "auto",
		top : 42,
		left : 0,
		visible : false
	});

	SearchView.addEventListener("focus", function(e) {
		NoHoldingsLabel.hide();
	});

	SearchView.addEventListener('change', function(e) {
		Ti.API.debug('symbol search bar: ' + e.value);
	});

	SearchView.addEventListener('return', function(e) {
		SearchView.blur();
		NoHoldingsLabel.show();
		HoldingsButtonsView.hide();
		Ti.API.debug('symbol search bar: ' + e.value);
		if(e.value.length > 1) {

			var xhrSymbolSearch = Ti.Network.createHTTPClient();
			xhrSymbolSearch.onload = function() {
				var matches = JSON.parse(this.responseText);
				Ti.API.debug(matches);
				var fetchedData = [];

				for(var i = 0, len = matches.results.length; i < len; i++) {
					var _name = matches.results[i].name;
					var _full = matches.results[i].full;
					var _details = matches.results[i];
					if(_full.length > 25)
						var _full = _full.substring(0, 25) + '...';
					var HoldingsButton = Ti.UI.createButton({
						title : _name + ' - ' + _full,
						symbol : _name,
						details : _details,
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

					HoldingsButton.addEventListener('click', function(e) {
						Ti.API.debug('clicked the button: ' + e);
						var holdingName = e.source.title;
						Ti.App.Properties.setString('newPosSymbol', e.source.symbol);
						Ti.App.Properties.setString('newPosSymbolDetails', JSON.stringify(e.source.details));

						var EditHoldingsWindow = require('/ht/views/HoldingsEditView');
						var EditHoldingsWindow = new EditHoldingsWindow({
							HT : win.HT,
							_holdingName : holdingName,
						});
						Ti.UI.currentTab.open(EditHoldingsWindow);

						backButton.addEventListener('click', function() {
							AccountCredsWindow.close();
						});
					});

					HoldingsButtonsView.add(HoldingsButton);
				}
			};

			xhrSymbolSearch.open('GET', 'http://hivetrader.wehadthetwoforty.com/api/symbols/more/' + e.value + '/0/');
			xhrSymbolSearch.send();
		}
		HoldingsButtonsView.show();
	});

	SearchView.addEventListener('cancel', function(e) {
		SearchView.blur();
		NoHoldingsLabel.show();
		HoldingsButtonsView.hide();
	});
	var message = win.HT.View.createMessageView({
		text : "Visit Hivetrader.com for more information on security.",
		target : "someWindow"
	}).bar;

	ServicesScrollView.add(NoHoldingsLabel);
	ServicesScrollView.add(HoldingsButtonsView);
	view.add(ServicesScrollView);
	view.add(SearchView);
	view.add(message);
	win.add(view);

	return win;
}

module.exports = HoldingsWindow;
