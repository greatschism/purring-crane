// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

function HoldingsEditView(args) {
	// Local variables.
	var platformWidth = Ti.App.PLATFORMWIDTH;
	var styles = args.HT.View.properties;
	var path = Ti.App.ABS_PATH;
	var win = Ti.UI.createWindow(args.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
		title : "Edit Holding",
		HT : args.HT
	}));

	var backButton = win.HT.View.customBackButton({
		'win' : win
	});
	win.leftNavButton = backButton;

	var accountsData = Ti.App.USER.accounts;
	var holdingName = args._holdingName;
	var holdingsList = [];
	var holdingInstructionsText = (holdingsList.length) ? "Or edit an existing holding:" : "You have no holdings added yet. Use the above search field to find your first holding."

	/**
	 Global Views
	 ============
	 Any reusable view objects will be stored here.
	 */
	var BackButton = win.HT.View.customBackButton({
		title : "Back"
	});

	BackButton.addEventListener("click", function(e) {
		win.close();
	});
	win.leftNavButton = BackButton;

	var view = Titanium.UI.createView({
		width : platformWidth,
		height : 375,
		top : 0,
		left : 0,
		right : 0
	});

	var EditHoldingScrollView = Titanium.UI.createScrollView({
		width : platformWidth,
		height : 362,
		top : 0,
		left : 0,
		anchorPoint : {
			x : 0,
			y : 0
		},
		contentHeight : "auto",
		showVerticalScrollIndicator : true
	});

	var AccountSymbolLabel = Titanium.UI.createLabel({
		text : holdingName,
		height : 23,
		top : 15,
		left : 15,
		font : {
			fontSize : 21,
			fontWeight : "bold"
		},
		shadowColor : "white",
		shadowOffset : {
			x : 0,
			y : 0.5
		}
	});

	var AccountNameLabel = Titanium.UI.createLabel({
		width : 260,
		height : "auto",
		text : "Vanguard Short-Term Investment-Grade Inv (MUTF)",
		top : 48,
		left : 15,
		font : {
			fontSize : 16,
			fontWeight : "bold"
		},
		anchorPoint : {
			x : 0,
			y : 0
		},
		shadowColor : "white",
		shadowOffset : {
			x : 0,
			y : 0.5
		}
	});

	var InstructionsLabel = Titanium.UI.createLabel({
		width : 260,
		height : "auto",
		top : (AccountNameLabel.size.height + AccountNameLabel.top + 10),
		left : 15,
		text : "Enter your holding data to securely connect it to Hivetrader.",
		font : {
			fontSize : 14
		},
		color : "#998654",
		shadowColor : "white",
		shadowOffset : {
			x : 0,
			y : 0.5
		}
	});

	var HoldingsFormView = win.HT.View.createFieldset({
		currentWin : Titanium.UI.currentTab,
		fields : [{
			label : "Type",
			hint : "Account type",
			type : "options",
			options : ["Buy", "Sell Short", "Sell to Close", "Buy to Close"]
		}, {
			label : "# of Shares",
			hint : ""
		}, {
			label : "Price",
			hint : "Per Share"
		}, {
			label : "Commission",
			hint : "$ Value"
		}, {
			label : "Date",
			hint : "",
			type : "date_field"
		}]
	});

	HoldingsFormView.top = (InstructionsLabel.size.height + InstructionsLabel.top + 10);

	var ConnectToHTButton = Titanium.UI.createButton({
		title : "Connect to Hivetrader",
		width : 240,
		height : 33,
		anchorPoint : {
			x : 0.5
		},
		top : (HoldingsFormView.size.height + HoldingsFormView.top + 10),
		color : "white",
		font : {
			fontSize : 14,
			fontWeight : "bold"
		},
		backgroundImage : path + "images/btn_blue_flat.png"
	});

	ConnectToHTButton.addEventListener("click", function() {
		var CloseButton = Titanium.UI.createButton(win.HT.combine(styles.BaseButton, {
			width : 65,
			title : "Close"
		}));

		var SuccessWindow = Titanium.UI.createWindow(win.HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
			title : "Success",
			leftNavButton : CloseButton
		}));

		var LargeSuccessLabel = Titanium.UI.createLabel({
			text : "Yes!",
			width : platformWidth,
			height : 26,
			top : 15,
			font : {
				fontSize : 24,
				fontWeight : "bold"
			},
			textAlign : "center"
		});

		var ConnectToHTButton = Titanium.UI.createButton(win.HT.combine(styles.LargeBlueButton, {
			title : "Add another account",
			top : 325
		}));

		var BeeSafeGraphic = Titanium.UI.createImageView({
			width : 155,
			height : 94,
			top : 140,
			image : path + "images/secure_bee_safe.png"
		});

		SuccessWindow.add(LargeSuccessLabel);
		SuccessWindow.add(BeeSafeGraphic);
		SuccessWindow.add(ConnectToHTButton);

		CloseButton.addEventListener("click", function() {
			SuccessWindow.close();
		});

		SuccessWindow.open({
			modal : true
		});
	});
	var BackToPortfolioButton = Titanium.UI.createButton({
		title : "Back to Portfolio",
		width : 240,
		height : 33,
		anchorPoint : {
			x : 0.5
		},
		top : (ConnectToHTButton.size.height + ConnectToHTButton.top + 10),
		color : "white",
		font : {
			fontSize : 14,
			fontWeight : "bold"
		},
		backgroundImage : path + "images/btn_blue_flat.png"
	});

	EditHoldingScrollView.add(AccountSymbolLabel);
	EditHoldingScrollView.add(AccountNameLabel);
	EditHoldingScrollView.add(InstructionsLabel);
	EditHoldingScrollView.add(HoldingsFormView);
	EditHoldingScrollView.add(ConnectToHTButton);
	EditHoldingScrollView.add(BackToPortfolioButton);
	view.add(EditHoldingScrollView);

	win.add(view);
	return win;
}

module.exports = HoldingsEditView;
