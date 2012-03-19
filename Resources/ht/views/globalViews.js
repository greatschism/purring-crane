// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================
(function() {
  var path = Ti.App.ABS_PATH;
  var platformWidth = Ti.App.PLATFORMWIDTH;
  var styles = HT.View.properties;
  var cardWidth = 302;
  
  HT.View.createSummaryPane = function(_args) {
    var defaults = {
      direction: "Performance_gain",
      theme: styles.BoxGradient_default
    };
    
    if (_args.type === "gainloss") {
      var dir = (_args.value > 0) ? "gain" : "loss";
      defaults.direction = dir;
      defaults.theme = styles["BoxGradient_" + dir];
    }
    
    var Pane = Titanium.UI.createView(
      HT.combine(defaults.theme, {
        width: 160,
        height: 52,
        top: 0
      })
    );

    Pane.add(Titanium.UI.createLabel(
      HT.combine(styles['CardRibbonDarkText_' + defaults.direction], {
        text: _args.label,
        height: 12,
        top: 10,
        left: 10,
        font: {fontSize: 12}
      })
    ));

    var LargeNumberLabel = Titanium.UI.createLabel(
      HT.combine(styles['CardRibbonWhiteText_' + defaults.direction], {
        text: _args.value,
        height: 25,
        bottom: 5,
        left: 10,
        font: {
          fontSize: 25,
          fontWeight: "bold"
        }
      })
    );
    
    Pane.add(LargeNumberLabel);
    
    return Pane;
  };
  
  // The custom back button relevant on all the pages
  HT.View.customBackButton = function(_args) {
    var titleText = _args.title || "Back";
    var width = _args.width || 60;
    var backButton = Titanium.UI.createButton({
      top: 0,
      left: 0,
      width: width,
      height: 30,
      title: titleText,
      font: {
        fontSize: 12,
        fontWeight: "bold"
      },
      textAlign: "center",
      backgroundImage: Ti.App.ABS_PATH + "images/back_button.png",
      backgroundLeftCap: 13
    });
    
    if(_args.win){
    	backButton.addEventListener('click', function(){
    		_args.win.close(0)
    	});
    }

    return backButton;
  };
  
  // A reusable [+] button
  HT.View.createAddButton = function() {
    var addButton = Titanium.UI.createButton({
      top: 0,
      right: 0,
      width: 33,
      height: 30,
      image: path + "images/icon_add.png",
      backgroundImage: path + "images/square_button.png"
    });
    
    return addButton;
  };
  
  // The Lock icon in the toolbar title. In order to get this in the view, we 
  // need to create a custom view and target the view in the Window object.
  HT.View.secureTitle = function(_args) {
    var title = _args.title || "Secure";

    var secureTitleView = Titanium.UI.createView({
      width: "auto",
      height: 18,
      left: "auto",
      anchorPoint: {x:0.5}
    });

    var secureIcon = Titanium.UI.createImageView({
      width: 11,
      height: 15,
      left: 0,
      top: 0,
      image: path + "images/icon_secure.png"
    });

    var secureTitle = Titanium.UI.createLabel({
      text: title,
      width: "auto",
      left: 16,
      height: 18,
      color: "white",
      font: {
        fontSize: 18,
        fontWeight: "bold"
      },
      shadowColor: "black",
      shadowOffset: {x:0, y:-0.5}
    });

    secureTitleView.add(secureIcon);
    secureTitleView.add(secureTitle);

    return secureTitleView;
  };
  
  HT.View.createMessageView = function(_args) {
    var message = _args.text || "";
    var target = _args.target || false;
    
    var view = Titanium.UI.createView({
      width: platformWidth,
      height: 30,
      right: 0,
      bottom: 12,
      left: 0,
      anchor: {x: 0, y: 0},
      backgroundImage: path + "images/bg_footer_message_bar.png"
    });
    
    var messageLabel = Titanium.UI.createLabel({
      width: 275,
      height: 10,
      left: 10,
      anchor: {x:0, y:0.5},
      text: message,
      color: "#e0dbd3",
      font: {
        fontSize: 10
      },
      shadowColor: "#857f75",
      shadowOffset: {x: 0, y: -0.5}
    });
    
    view.add(messageLabel);
    
    return {
      bar: view,
      message: messageLabel
     };
  }
  
  // A small inset message area between the content and the main tabs.
  HT.View.asdf = function(_args) {
    var message = _args.text || "";
    var target = _args.target || false;

    var view = Titanium.UI.createView({
      width: platformWidth,
      height: 30,
      right: 0,
      bottom: 12,
      left: 0,
      anchor: {x: 0, y: 0},
      backgroundImage: path + "images/bg_footer_message_bar.png"
    });

    var messageLabel = Titanium.UI.createLabel({
      width: 275,
      height: 10,
      left: 10,
      anchor: {x:0, y:0.5},
      text: message,
      color: "#e0dbd3",
      font: {
        fontSize: 10
      },
      shadowColor: "#857f75",
      shadowOffset: {x: 0, y: -0.5}
    });

    var linkArrow = Titanium.UI.createImageView({
      width: 6,
      height: 9,
      anchorPoint: {y: 0.5},
      right: 17,
      image: path + "images/message_link_arrow.png"
    });

    view.add(messageLabel);

    if (target) {
      view.add(linkArrow);
    }

    return {
      bar: view,
      message: messageLabel
    };
  };
  
  HT.View.createFieldset = function(_args) {
    var rows = _args.fields;
    var numOfRows = rows.length;
    var rowHeight = 37;
    var win = _args.currentWin;
    
    var formView = Ti.UI.createView(
      HT.combine(styles.FormView, {
        width: (platformWidth - 30),
        height: numOfRows * rowHeight
      })
    );
    
    for (var i = 0; i < numOfRows; i++) {
      var row = HT.View.createFormRow(rows[i], win).render;        
      row.top = (rowHeight * i) + 1;
      if (i == numOfRows) {
        row.setInputType("default");
      }
      
      formView.add(row);
    }
    
    return formView;
  };
  
  HT.View.createFormRow = function(_args, win) {
    var labelText = _args.label;
    var hintText = _args.hint;
    
    var view = Titanium.UI.createView({
      width: "100%",
      height: 36,
      top: 1,
      backgroundColor: "#f6f4f1",
      backgroundGradient: {
        type: "linear",
        colors: ["#ece8e2", "#e5e1da"],
        startPoint: {x: 0, y: 1}
      }
    });
    
    var FormLabel = Titanium.UI.createLabel({
      width: 85,
      height: 14,
      left: 15,
      text: labelText,
      font: {
        fontSize: 12,
        fontWeight: "bold"
      },
      shadowColor: "#f6f4f1",
      shadowOffset: {x: 0, y: 0.5}
    });
    
    var FormInput = Titanium.UI.createTextField({
      width: 174,
      height: 30,
      right: 15,
      hintText: hintText,
      backgroundColor: "transparent",
      font: {fontSize: 12},
      color: "#7d7668",
      shadowColor: "#f6f4f1",
      shadowOffset: {x: 0, y: 0.5},
      borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE
    });
    
    var _border = Titanium.UI.createView({
      height: 1,
      bottom: 0,
      backgroundColor: "#c0baae"
    });
    
    switch (_args.type) {
      case "options":
        var dialog = Titanium.UI.createOptionDialog({
            title: 'Type of Account',
            options: _args.options
        });
      
        FormInput.enabled = false;  
      
        FormInput.addEventListener("click", function() {
          dialog.show();
        });
      
        dialog.addEventListener("click", function(e) {
          var idx = e.index;
          var value = _args.options[idx];
          FormInput.value = value;
        });
      break;
      case "date_field":
        var BackButton = HT.View.customBackButton({title: "Cancel"});
        var SaveButton = Titanium.UI.createButton(
          HT.combine(styles.BaseButton, {
            width: 60,
            title: "Save",
            backgroundImage: path + "images/square_button.png"
          })
        );
        
        var DateWindow = Titanium.UI.createWindow(
          HT.combine(styles.BaseWindow, styles.YellowGradientWindow, {
            height: 460,
            title: "Set Holding Date",
            leftNavButton: BackButton,
            rightNavButton: SaveButton
          })
        );
        
        var DatePicker = Titanium.UI.createPicker({
          bottom: 0,
          type: Titanium.UI.PICKER_TYPE_DATE
        });
        
        DatePicker.addEventListener("change", function(e) {
          FormInput.value = e.value;
        });
        
        DateWindow.add(DatePicker);
        FormInput.enabled = false;
              
        FormInput.addEventListener("click", function() {
          win.open(DateWindow);
        });
        
        BackButton.addEventListener("click", function(e) {
          DateWindow.close();
        });
        
        SaveButton.addEventListener("click", function(e) {
          DateWindow.close();
        });
      break;
    }
    
    view.add(FormLabel);
    view.add(FormInput);
    view.add(_border);
    
    return {
      render: view,
      setInputType: function(type) {
        if (type === "next") {
          FormInput.returnKeyType = Titanium.UI.RETURNKEY_NEXT;
        } else {
          FormInput.returnKeyType = Titanium.UI.RETURNKEY_DEFAULT;
        }
      }
    };
  };
  
  /**
  Returns basic card parts with its 3 main components with each component able to be
  hijacked and appended when building the card in the window it was called from.
  
  @param {Object} data
  @param {Array} buttons
  
  @returns {card} 
  @returns {header} 
  @returns {ribbon} 
  @returns {buttons} 
  */
  HT.View.createCard = function(_args) {
    var opts = _args || "";
    var ribbonStyle = opts.type || "default";
    
    // Base card views
    var CardView = Titanium.UI.createView({
      width: cardWidth,
      height: 332,
      top: 0,
      backgroundColor: "#f1eee9",
      borderRadius: 4
    });
    
    // The header
    var CardHeaderView = Titanium.UI.createView({
      width: cardWidth,
      height: 96,
      top: 0,
      left: 0,
      right: 0
    });
    
    // The card ribbon in the middle
    var CardRibbonView = Titanium.UI.createView(
      HT.combine(styles['CardRibbonBG_' + ribbonStyle], {
        width: cardWidth + 2,
        height: 122,
        top: 97,
        left: -1,
        borderColor: "white"
      })
    );
    
    var CardRibbonBorderBottom = Titanium.UI.createView(
      HT.combine(styles['CardRibbonBottomBorder_' + ribbonStyle], {
        width: cardWidth,
        height: 1,
        right: 0,
        bottom: 1,
        left: 0
      })
    );
    
    // CardRibbonView.add(CardRibbonBorderBottom);
    
    // The bottom buttons
    var CardActionView = Titanium.UI.createView({
      width: cardWidth,
      height: 112,
      top: 218,
      left: 0
    });
    
    return {
      card: CardView,
      header: CardHeaderView,
      ribbon: CardRibbonView,
      buttons: CardActionView
    };
  };
  
  // Basic header layout for the cards
  HT.View.CardAccountHeader = function(_args) {
    var statusFlag = _args.status || "error";
    var statusFlagWidth = (statusFlag === "pending") ? 83 : 72;
    var holdingCompanyLogo = _args.logo;
    var view = Titanium.UI.createView(styles.CardHeaderView);
    
    var AccountLogoBG = Titanium.UI.createView({
      width: 153,
      height: 67,
      top: 15,
      left: 15,
      backgroundImage: path + "images/bg_card_account_logo.png"
    });
    
    var AccountLogo = Titanium.UI.createImageView({
      image: path + "images/" + holdingCompanyLogo,
      width: 153,
      height: 63,
      top: 15,
      left: 15
    });
    
    AccountLogoBG.add(AccountLogo);
    
    view.add(AccountLogoBG);
    view.add(AccountLogo);
    return view;
  };
  
  HT.View.createHoldingsCards = function(_args) {
    var data = _args.data;
    var actionButtons = _args.buttons || [];
    var cards = [];
    
    for (var i=0, len = data.length; i < len; i++) {
      var dateAdded = data[i].dateAdded;
      var holdingValue = data[i].value || "$0.00";
      var holdingCompany = data[i].holder || "";
      var direction = (data[i].priceChange > 0) ? "gain" : "loss";
      
      var Card = HT.View.createCard({type: direction});
      var CardView = Card.card;
      var CardHeader = Card.header;
      var CardRibbon = Card.ribbon;
      var CardButtons = Card.buttons;
      
      // Header
      var AccountStatusFlag = Titanium.UI.createImageView({
        height: 16,
        top: 40,
        right: 20,
        image: path + "images/flag_pill_" + data[i].status + ".png",
        width: 72
      });
      
      CardHeader.add(AccountStatusFlag);
      
      // Ribbon view
      var RibbonInner = Titanium.UI.createView({
        width: 245,
        height: "auto",
        top: 15,
        left: 15
      });

      var AccountHolderLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonAccentText_' + direction], {
          width: "auto",
          height: 16,
          top: 0,
          left: 0,
          text: holdingCompany,
          font: {
            fontSize: 15,
            fontWeight: "bold"
          },
          shadowOffset: {x:0, y: 1}
        })
      );

      var AccountValueLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonWhiteText_' + direction], {
          width: "auto",
          height: 35,
          text: holdingValue,
          top: 20,
          left: 0,
          font: {
            fontSize: 35,
            fontWeight: "bold"
          },
          shadowOffset: {x:0, y: 1}
        })
      );

      var AccountDateAddedLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonDarkText_' + direction], {
          width: "auto",
          height: 13,
          top: 62,
          left: 0,
          text: "Added " + dateAdded,
          font: {
            fontSize: 12
          },
          shadowOffset: {x:0, y: 0.5}
        })
      );

      RibbonInner.add(AccountHolderLabel);
      RibbonInner.add(AccountValueLabel);
      RibbonInner.add(AccountDateAddedLabel);
      CardRibbon.add(RibbonInner);
      
      // Buttons
      var CardButton1 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[0].title,
        image: path + "images/" + actionButtons[0].icon
      }));
      
      var CardButton2 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[1].title,
        top: 46,
        image: path + "images/" + actionButtons[1].icon
      }));
      
      CardButtons.add(CardButton1);
      CardButtons.add(CardButton2);
      
      // Bottom strip
      var LastRefresh = HT.View.createMessageView({text: "Balance as of Mar 28, 2011 at 10:50AM GMT+01:00"});
      var LastRefreshView = LastRefresh.bar;
      LastRefreshView.width = cardWidth;
      LastRefreshView.height = 22;
      LastRefreshView.bottom = 0;
            
      CardView.add(CardHeader);
      CardView.add(CardRibbon);
      CardView.add(CardButtons);
      CardView.add(LastRefreshView);
      
      CardButton1.addEventListener('click', function(e) {
        Ti.API.info('LSJDFL:KSDFJ');
      });
      cards.push(CardView);
    }
    
    var CardsScrollView = Titanium.UI.createScrollableView(
      HT.combine(styles.CardScroller, {views: cards})
    );
    
    return CardsScrollView;
  };
  
  HT.View.createAccountsCards = function(_args) {
    var data = _args.data;
    var actionButtons = _args.buttons || [];
    var cards = [];
    
    for (var _i = 0, len = data.length; _i < len; _i++) {
      var _idx = _i;
      var percentage = data[_i].percentage;
      var holdingValue = data[_i].value || "$0.00";
      var holdingCompany = data[_i].holder || "";
      
      var Card = HT.View.createCard();
      var CardView = Card.card;
      var CardHeader = Card.header;
      var CardRibbon = Card.ribbon;
      var CardButtons = Card.buttons;
      
      // Header
      CardHeader.add(HT.View.CardAccountHeader({
        status: data[_i].status,
        logo: "thinkorswim_logo.png"
      }));
      
      var AccountStatusFlag = Titanium.UI.createImageView({
        height: 16,
        top: 40,
        right: 20,
        image: path + "images/flag_pill_active.png",
        width: 72
      });
      
      CardHeader.add(AccountStatusFlag);
      
      // Ribbon view
      var RibbonInner = Titanium.UI.createView({
        width: 245,
        height: "auto",
        top: 15,
        left: 15
      });

      var AccountHolderLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonAccentText_default'], {
          width: "auto",
          height: 16,
          top: 0,
          left: 0,
          text: holdingCompany,
          font: {
            fontSize: 15,
            fontWeight: "bold"
          },
          shadowOffset: {x:0, y: 1}
        })
      );

      var AccountValueLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonWhiteText_default'], {
          width: "auto",
          height: 35,
          text: holdingValue,
          top: 20,
          left: 0,
          font: {
            fontSize: 35,
            fontWeight: "bold"
          },
          shadowOffset: {x:0, y: 1}
        })
      );

      var AccountPercentageLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonDarkText_default'], {
          width: "auto",
          height: 13,
          top: 62,
          left: 0,
          text: percentage + "% of Portfolio",
          font: {
            fontSize: 12
          },
          shadowOffset: {x:0, y: 0.5}
        })
      );

      RibbonInner.add(AccountHolderLabel);
      RibbonInner.add(AccountValueLabel);
      RibbonInner.add(AccountPercentageLabel);
      CardRibbon.add(RibbonInner);
      
      // Buttons
      var CardButton1 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[0].title,
        image: path + "images/" + actionButtons[0].icon
      }));
      
      var CardButton2 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[1].title,
        top: 46,
        image: path + "images/" + actionButtons[1].icon,
        cardID: _idx
      }));
      
      CardButton1.addEventListener("click", function(e) {
        CardsScrollView.fireEvent("edit");
      });
      
      CardButton2.addEventListener("click", function(e) {
        var _cardID = e.source.cardID;
        var DisconnectAlertDialog = Titanium.UI.createAlertDialog({
          title:"Disconnect Account",
          message: "All history and holdings will be deleted.",
          buttonNames: ['Cancel','OK'],
          cancel: 0
        });
        DisconnectAlertDialog.show();
        
        DisconnectAlertDialog.addEventListener("click", function(e) {
          if (e.index === 1) {
            CardsScrollView.fireEvent("disconnect", {cardIndex: _cardID});
          }
        });
      });
      
      CardButtons.add(CardButton1);
      CardButtons.add(CardButton2);
      
      // Bottom strip
      var LastRefresh = HT.View.createMessageView({text: "Last updated 12 minutes ago."});
      var LastRefreshView = LastRefresh.bar;
      LastRefreshView.width = cardWidth;
      LastRefreshView.height = 22;
      LastRefreshView.bottom = 0;
            
      CardView.add(CardHeader);
      CardView.add(CardRibbon);
      CardView.add(CardButtons);
      CardView.add(LastRefreshView);
      
      cards.push(CardView);
    }
    
    var CardsScrollView = Titanium.UI.createScrollableView(
      HT.combine(styles.CardScroller, {views: cards})
    );
    
    CardsScrollView.addEventListener("disconnect", function(e) {
      var deleteCard = cards[e.cardIndex];
      CardsScrollView.removeView(deleteCard);
      CardsScrollView.scrollToView(e.cardIndex);
    });
    
    return CardsScrollView;
  };
  
  /**
  The Markets cards
  TODO: Set up gradient change.
  
  @param {Object} _args The global data array
  
  @returns {Array} positionCards
  @returns {Array} cardsViewObjects
  */
  HT.View.createMarketsCards = function(_args) {
    var data = _args.data;
    var actionButtons = _args.buttons || [];
    var cards = [];
    // A container for all our updatable view objects
    var cardsPublic = [];
    
    for (var i=0, len = data.length; i < len; i++) {
      var dateAdded = data[i].dateAdded;
      var marketValue = data[i].change;
      var holdingCompany = data[i].holder || "";
      var holdingSymbol = data[i].symbol;
      var holdingName = data[i].Name;
      var holdingSellingImage = path + "images/flag_pill_" + data[i].status + ".png";
      var hi = data[i].hi;
      var lo = data[i].lo;
      var price = data[i].LastTradePriceOnly;
      var lastUpdateText = data[i].lastUpdateTimestamp;
      var isIntraday = data[i].isIntraday;
      var direction = (data[i].change > 0) ? "gain" : "loss";
      
      // Store all the view objects in master object, which we'll make public 
      var _views = {};
      
      // Template objects 
      var Card = HT.View.createCard({type: direction});
      _views.CardView = Card.card;
      _views.CardHeader = Card.header;
      _views.CardRibbon = Card.ribbon;
      _views.CardButtons = Card.buttons;
      
      // Header
      _views.AccountSymbolLabel = Titanium.UI.createLabel({
        width: "auto",
        height: 20,
        top: 31,
        left: 18,
        text: holdingSymbol,
        font: {
          fontSize: 18,
          fontWeight: "bold"
        },
        shadowColor: "white",
        shadowOffset: {x:0, y: 1}
      });
      
      _views.AccountNameLabel = Titanium.UI.createLabel({
        width: "auto",
        height: 15,
        top: 51,
        left: 18,
        text: holdingName,
        color: "#959085",
        font: {
          fontSize: 13
        },
        shadowColor: "white",
        shadowOffset: {x:0, y: 1}
      });
      
      _views.AccountSellingFlag = Titanium.UI.createImageView({
        width: 43,
        height: 17,
        top: 32,
        right: 15,
        image: holdingSellingImage
      });
      
      _views.CardHeader.add(_views.AccountSymbolLabel);
      _views.CardHeader.add(_views.AccountNameLabel);
      _views.CardHeader.add(_views.AccountSellingFlag);
      
      // Ribbon view
      _views.RibbonInner = Titanium.UI.createView({
        width: 245,
        height: "auto",
        top: 15,
        left: 15
      });
      
      _views.CurrentPositionsLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonDarkText_' + direction], {
          top: 0,
          left: 0,
          height: 14,
          text: "Current position:",
          font: {
            fontSize: 12
          }
        })
      );
      
      _views.AccountHolderLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonAccentText_' + direction], {
          width: "auto",
          height: 16,
          top: 0,
          left: 0,
          text: holdingCompany,
          font: {
            fontSize: 15,
            fontWeight: "bold"
          }
        })
      );

      _views.AccountValueLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonWhiteText_' + direction], {
          width: "auto",
          height: 37,
          text: marketValue,
          top: 16,
          left: 0,
          font: {
            fontSize: 35,
            fontWeight: "bold"
          }
        })
      );

      _views.HiLoLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonWhiteText_' + direction], {
          width: "auto",
          height: 13,
          top: 54,
          left: 0,
          text: data[i].DaysRange.replace(/([0-9]*\.[0-9]+|[0-9]+) -/, "Hi: $1 - Lo: "),
          font: {
            fontSize: 12
          },
          shadowOffset: {x:0, y: 0.5}
        })
      );
      
      _views.LatestPriceHeaderLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonDarkText_' + direction], {
          width: 'auto',
          top: 78,
          left: 0,
          height: 14,
          text: "Latest price:",
          font: {
            fontSize: 12
          }
        })
      );
      
      _views.LatestPriceLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonAccentText_' + direction], {
          top: 75,
          left: (_views.LatestPriceHeaderLabel.size.width + 5),
          height: 17,
          text: "$" + price,
          font: {
            fontSize: 15,
            fontWeight: "bold"
          }
        })
      );
      
      _views.RibbonInner.add(_views.CurrentPositionsLabel);
      _views.RibbonInner.add(_views.AccountHolderLabel);
      _views.RibbonInner.add(_views.AccountValueLabel);
      
      if (isIntraday) {
        _views.RibbonInner.add(_views.HiLoLabel);
      }
      
      _views.RibbonInner.add(_views.LatestPriceHeaderLabel);
      _views.RibbonInner.add(_views.LatestPriceLabel);
      _views.CardRibbon.add(_views.RibbonInner);
      
      // Buttons
      _views.CardButton1 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[0].title,
        image: path + "images/" + actionButtons[0].icon
      }));
      
      _views.CardButton2 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[1].title,
        top: 46,
        image: path + "images/" + actionButtons[1].icon
      }));
      
      _views.CardButtons.add(_views.CardButton1);
      _views.CardButtons.add(_views.CardButton2);
      
      // Bottom strip
      _views.LastRefresh = HT.View.createMessageView({text: lastUpdateText});
      _views.LastRefreshView = _views.LastRefresh.bar;
      _views.LastRefreshView.width = cardWidth;
      _views.LastRefreshView.height = 22;
      _views.LastRefreshView.bottom = 0;
            
      _views.CardView.add(_views.CardHeader);
      _views.CardView.add(_views.CardRibbon);
      _views.CardView.add(_views.CardButtons);
      _views.CardView.add(_views.LastRefreshView);
      
      cards.push(_views.CardView);
      // Push the updatable objects to a local array.
      cardsPublic.push(_views);
      
    }
    
    // @public
    return {
      positionCards: cards,
      cardsViewObjects: cardsPublic
    };
  };
  
  HT.View.createPerformanceCards = function(_args) {
    var data = _args.data;
    var actionButtons = _args.buttons || [];
    var cards = [];
    
    for (var i=0, len = data.length; i < len; i++) {
      var dateAdded = data[i].dateAdded;
      var marketValue = data[i].percentage || "0.00";
      var holdingCompany = data[i].holder || "";
      var holdingSymbol = data[i].symbol;
      var holdingName = data[i].name;
      var holdingSellingImage = path + "images/flag_pill_" + data[i].status + ".png";
      var hi = data[i].hi;
      var lo = data[i].lo;
      var price = data[i].price;
      var direction = (data[i].ytd > 0) ? "gain" : "loss";
      
      var Card = HT.View.createCard({type: "Performance_" + direction});
      var CardView = Card.card;
      var CardHeader = Card.header;
      var CardRibbon = Card.ribbon;
      var CardButtons = Card.buttons;
      
      // Header
      CardHeader.add(HT.View.CardAccountHeader({
        status: data[i].status,
        logo: "thinkorswim_logo.png"
      }));
      
      var AccountStatusFlag = Titanium.UI.createLabel({
        height: 16,
        top: 40,
        right: 20,
        width: 50,
        text: "WEEKLY",
        backgroundImage: path + "images/flat_pill_timestamp.png",
        backgroundPaddingLeft: 18,
        backgroundPaddingRight: 10,
        font: {
          fontSize: 11,
          fontWeight: "bold"
        },
        color: "white",
        shadowColor: "#ce6112",
        shadowOffset: {x:0, y:0.5}
      });
      
      CardHeader.add(AccountStatusFlag);
      
      // Ribbon view
      var RibbonInner = Titanium.UI.createView({
        width: 245,
        height: "auto",
        top: 15,
        left: 15
      });
      
      var AccountHolderLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonDarkText_Performance_' + direction], {
          width: "auto",
          height: 16,
          top: 0,
          left: 0,
          text: data[i].holder,
          font: {
            fontSize: 15,
            fontWeight: "bold"
          }
        })
      );

      var ReturnLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonWhiteText_Performance_' + direction], {
          width: "auto",
          height: 37,
          text: (data[i].ytd > 0) ? "+" + data[i].ytd + "%" : data[i].ytd + "%",
          top: 16,
          left: 0,
          font: {
            fontSize: 35,
            fontWeight: "bold"
          }
        })
      );

      var CommissionsLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonAccentText_Performance_' + direction], {
          width: "auto",
          height: 13,
          top: 54,
          left: 0,
          text: "$" + data[i].commissions + " in Commissions",
          font: {
            fontSize: 12
          },
          shadowOffset: {x:0, y: 0.5}
        })
      );
      
      RibbonInner.add(AccountHolderLabel);
      RibbonInner.add(ReturnLabel);
      RibbonInner.add(CommissionsLabel);
      CardRibbon.add(RibbonInner);
      
      // Buttons
      var CardButton1 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[0].title,
        image: path + "images/" + actionButtons[0].icon
      }));
      
      var CardButton2 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[1].title,
        top: 46,
        image: path + "images/" + actionButtons[1].icon
      }));
      
      var IntervalOptions = Titanium.UI.createOptionDialog({
          title: "Select an refresh interval",
          options: [
            "Daily",
            "Weekly",
            "Monthly",
            "Yearly",
            "All-Time"
          ]
      });
      
      CardButton1.addEventListener("click", function() {
        CardsScrollView.fireEvent("view_holdings");
      });
      
      CardButton2.addEventListener("click", function() {
        IntervalOptions.show();
      });
      
      CardButtons.add(CardButton1);
      CardButtons.add(CardButton2);
      
      // Bottom strip
      var LastRefresh = HT.View.createMessageView({text: "Last updated 12 minutes ago."});
      var LastRefreshView = LastRefresh.bar;
      LastRefreshView.width = cardWidth;
      LastRefreshView.height = 22;
      LastRefreshView.bottom = 0;
            
      CardView.add(CardHeader);
      CardView.add(CardRibbon);
      CardView.add(CardButtons);
      CardView.add(LastRefreshView);
      
      cards.push(CardView);
    }
    
    var CardsScrollView = Titanium.UI.createScrollableView(
      HT.combine(styles.CardScroller, {views: cards})
    );
    
    return CardsScrollView;
  };

  HT.View.createPerformanceHoldingsCards = function(_args) {
    var data = _args.data;
    var actionButtons = _args.buttons || [];
    var cards = [];
    
    for (var i=0, len = data.length; i < len; i++) {
      var dateAdded = data[i].dateAdded;
      var holdingValue = data[i].percentage + "%" || "0.00%";
      var holdingCompany = data[i].holder || "";
      var symbol = data[i].symbol;
      var direction = (data[i].change > 0) ? "gain" : "loss";
      
      var Card = HT.View.createCard({type: "Performance_" + direction});
      var CardView = Card.card;
      var CardHeader = Card.header;
      var CardRibbon = Card.ribbon;
      var CardButtons = Card.buttons;
      
      // Header
      var AccountSymbolLabel = Titanium.UI.createLabel({
        width: "auto",
        height: 20,
        top: 31,
        left: 18,
        text: symbol,
        font: {
          fontSize: 18,
          fontWeight: "bold"
        },
        shadowColor: "white",
        shadowOffset: {x:0, y: 1}
      });
      
      var AccountStatusFlag = Titanium.UI.createLabel({
        height: 16,
        top: 40,
        right: 20,
        width: 50,
        text: "WEEKLY",
        backgroundImage: path + "images/flat_pill_timestamp.png",
        backgroundPaddingLeft: 18,
        backgroundPaddingRight: 10,
        font: {
          fontSize: 11,
          fontWeight: "bold"
        },
        color: "white",
        shadowColor: "#ce6112",
        shadowOffset: {x:0, y:0.5}
      });
      
      CardHeader.add(AccountSymbolLabel);
      CardHeader.add(AccountStatusFlag);
      
      // Ribbon view
      var RibbonInner = Titanium.UI.createView({
        width: 245,
        height: "auto",
        top: 15,
        left: 15
      });

      var AccountHolderLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonAccentText_Performance_' + direction], {
          width: "auto",
          height: 18,
          top: 0,
          left: 0,
          text: "Apple Computer Inc.",
          font: {
            fontSize: 15,
            fontWeight: "bold"
          },
          shadowOffset: {x:0, y: 1}
        })
      );

      var AccountValueLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonWhiteText_Performance_' + direction], {
          width: "auto",
          height: 35,
          text: holdingValue,
          top: 20,
          left: 0,
          font: {
            fontSize: 35,
            fontWeight: "bold"
          },
          shadowOffset: {x:0, y: 1}
        })
      );

      var AccountDateAddedLabel = Titanium.UI.createLabel(
        HT.combine(styles['CardRibbonDarkText_Performance_' + direction], {
          width: "auto",
          height: 13,
          top: 62,
          left: 0,
          text: "$151 in Commissions",
          font: {
            fontSize: 12
          },
          shadowOffset: {x:0, y: 0.5}
        })
      );

      RibbonInner.add(AccountHolderLabel);
      RibbonInner.add(AccountValueLabel);
      RibbonInner.add(AccountDateAddedLabel);
      CardRibbon.add(RibbonInner);
      
      // Buttons
      var CardButton1 = Titanium.UI.createButton(HT.combine(styles.CardButtons, {
        title: actionButtons[0].title,
        image: path + "images/" + actionButtons[0].icon
      }));
      
      var IntervalOptions = Titanium.UI.createOptionDialog({
          title: "Select an refresh interval",
          options: [
            "Daily",
            "Weekly",
            "Monthly",
            "Yearly",
            "All-Time"
          ]
      });
      
      CardButton1.addEventListener("click", function() {
        IntervalOptions.show();
      });
      
      CardButtons.add(CardButton1);
      
      // Bottom strip
      var LastRefresh = HT.View.createMessageView({text: "Balance as of Mar 28, 2011 at 10:50AM GMT+01:00"});
      var LastRefreshView = LastRefresh.bar;
      LastRefreshView.width = cardWidth;
      LastRefreshView.height = 22;
      LastRefreshView.bottom = 0;
            
      CardView.add(CardHeader);
      CardView.add(CardRibbon);
      CardView.add(CardButtons);
      CardView.add(LastRefreshView);
      
      cards.push(CardView);
    }
    
    var CardsScrollView = Titanium.UI.createScrollableView(
      HT.combine(styles.CardScroller, {views: cards})
    );
    
    return CardsScrollView;
  };
})();