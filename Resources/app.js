// ==========================================================================
// Project:   Hivetrader iPhone App
// Copyright: ©2011 Hivetrader
// ==========================================================================

/**
Bootstrap
*/

// Set up the globals
Ti.UI.setBackgroundColor('#ded9d0');

// Namespace
var HT = {};
var indWin = null;
var actInd = null;

Ti.App.USER = {
  isSignedIn: true,
  
  totalValue: "$23,231",
  ytd: 18.1,
  
  accounts: [
    {
      name: "Vanguard",
      holder: "Vanguard",
      numOfHoldings: 6,
      percentage: 60,
      value: "$35,187.61",
      priceChange: -101.23,
      status: "active",
      hasChild: true,
      dateAdded: "Jan 12, 2011",
      ytd: 14.2,
      commissions: 446,
      lastUpdated: "32 minutes",
      url: "http://www.vanguard.com/VGApp/hnw/CorporatePortal",
      positions: [
        {
          name: "Vanguard Short-Term Investment-Grade Fund Investor Shares",
          symbol: "VFSTX",
          percentage: 32.34,
          value: "$11,380.40",
          status: "SELL",
          change: -1.2,
          shares: 10,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        },
        {
          name: "Vanguard Wellesley Income Fund Investor Shares",
          symbol: "VWINX",
          percentage: 34.42,
          value: "$12,112.68",
          status: "BUY",
          change: 51.2,
          shares: 5,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        },
        {
          name: "Vanguard Total Bond Market Index Fund Investor Shares",
          symbol: "VBMFX",
          percentage: 33.23,
          value: "$11,694.53",
          status: "BUY",
          change: 2,
          shares: 900,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        }
      ]
    },
    {
      name: "thinkorswim - Investments",
      holder: "thinkorswim",
      numOfHoldings: 6,
      percentage: 12,
      value: "$2,704.19",
      priceChange: -101.23,
      status: "active",
      tradeStatus: "SELL",
      hasChild: true,
      ytd: -1.6,
      commissions: 123.12,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "32 minutes",
      url: "http://thinkorswim.com/",
      positions: [
      {
        name: "Yahoo",
        symbol: "YHOO",
        percentage: 100.00,
        value: 2314.74,
        status: "BUY",
        change: -0.32,
        shares: 1000,
        hi: 164.23,
        lo: 160.82,
        price: 164.2508
      }
      ]
    },
    {
      name: "Merrill Edge",
      holder: "E*Trade",
      numOfHoldings: 1,
      percentage: 45,
      value: "$23,791.27",
      priceChange: 10.20,
      status: "active",
      tradeStatus: "SELL",
      hasChild: true,
      ytd: 12.29,
      commissions: 20.12,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "13 minutes",
      url: "http://www.mldirect.ml.com/",
      positions: [
        {
          name: "MC GRAW HILL COMPANIES",
          symbol: "MHP",
          percentage: 4.18,
          value: "$422.00",
          status: "BUY",
          change: -1.1,
          shares: 1,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        },
        {
          name: "SPDR GOLD TRUST",
          symbol: "GLD",
          percentage: 29.68,
          value: "$2,994.00",
          status: "SELL",
          change: 0.00,
          shares: 100,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        },
        {
          name: "SPDR BARCLY CAPTL HIGH YIELD BOND ETF",
          symbol: "JNK",
          percentage: 10.10,
          value: "$1,019.25",
          status: "BUY",
          change: 0.01,
          shares: 65,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        },
        {
          name: "PROSHARES SHORT 20+ YR T",
          symbol: "MHP",
          percentage: 10.36,
          value: "$1,045.00",
          status: "BUY",
          change: 0.42,
          shares: 12,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        }
      ]
    },
    {
      name: "Fidelity Investments",
      holder: "Forex",
      numOfHoldings: 3,
      percentage: 2,
      value: "$1,503.92",
      priceChange: -1.12,
      status: "active",
      tradeStatus: "SELL",
      ytd: -0.9,
      commissions: 900.64,
      hasChild: true,
      dateAdded: "Mar 28, 2011",
      lastUpdated: "12 minutes",
      url: "http://www.fidelity.com/",
      positions: [
        {
          name: "SPDR GOLD TR GOLD SHS",
          symbol: "GLD",
          percentage: 14.82,
          value: "$1,497.00",
          status: "BUY",
          change: -0.25,
          shares: 120,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        },
        {
          name: "SPDR SER TR BARCLAYS CAP HIGH YIELD BD ETF ",
          symbol: "JNK",
          percentage: 20.17,
          value: "$2,038.50",
          status: "SELL",
          change: 0.00,
          shares: 100,
          hi: 164.23,
          lo: 160.82,
          price: "$164.2508"
        }
      ]
    }
  ]
};

Ti.App._popularServices = [{
    name: "Charles Schwab",
    xid: 524
}, {
    name: "E*Trade",
    xid: 846
}, {
    name: "Fidelity",
    xid: 970
}, {
    name: "Merrill Edge",
    xid: 1764
}, {
    name: "Morgan Stanley Smith Barney",
    xid: 1874
}, {
    name: "Muriel Siebert",
    xid: 1887
}, {
    name: "Scottrade",
    xid: 2427
}, {
    name: "Sharebuilder (ING)",
    xid: 1412
}, {
    name: "TD Ameritrade",
    xid: 2675
}, {
    name: "Thinkorswim",
    xid: 2754
}, {
    name: "TradeKing",
    xid: 2786
}, {
    name: "TradeMONSTER",
    xid: 2787
}, {
    name: "Vanguard",
    xid: 2978
}, {
    name: "Zecco",
    xid: 3148
}];

// Global parameters we'll need in all the views
Ti.App.PLATFORMWIDTH = Ti.Platform.displayCaps.platformWidth;
Ti.App.ABS_PATH = Ti.Filesystem.resourcesDirectory + Ti.Filesystem.separator;

// Include our main file.
Ti.include(
  "/ht/vendor/underscore.js",
  "/ht/hivetrader.js"
);

// Grab the base layout items
// Open the base window
HT.base = HT.View.createApplicationWindow();

// Launch the app!
HT.base.open();