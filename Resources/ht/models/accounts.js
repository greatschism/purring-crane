(function() {
	
	HT.Model._dbname = 'ht_db';
	
	if(HT.osname == 'android'){
		HT.Model._dbpath = "/leadsManager.db";
	}else{
		HT.Model._dbpath = "leadsManager.db";
	}
	
	HT.Model.install = function(){
		var db = Ti.Database.install(HT.Model._dbpath, HT.Model._dbname);
		db.close();
	};
	
	HT.Model.getAccounts = function() {
	  var results = [];
		var db = HT.Model.install();
		Ti.API.info("the database is installed and selected.");
		
		//get the accounts
		var rows = db.execute('SELECT DISTINCT name FROM accounts');
    
    while (rows.isValidRow()) {
      results.push({name: '' + rows.fieldByName('name') + ''});
      rows.next();
    }
    db.close();
    return results;
	};
	
})();

//get all leads
database.getLeads = function() {
	var db = Ti.Database.open(database.name);
	var rows = db.execute("SELECT * FROM leads ORDER BY datetime");

	var results = [];

	while(rows.isValidRow()) {
		results.push({
			id : '' + rows.fieldByName('rowid'),
			data : '' + JSON.parse(rows.fieldByName('lead')),
			isViewed : '' + rows.fieldByName('viewed'),
			date : '' + rows.fieldByName('datetime')
		});

		rows.next();
	}

	rows.close();
	db.close();

	return results;
};

//store a search
database.saveSearch = function(arg) {
	/*
	 * arg  = arg.search
	 */
	Ti.API.debug("---DB-- attempting save the search: " + arg);

	var db = Ti.Database.open(database.name);
	var dateTime = new Date().getTime();

	try {
		db.execute("INSERT INTO searches VALUES(NULL,'" + arg.search + "','" + dateTime + "')");
		db.close();
		return true;
	} catch(er) {
		db.close();
		Ti.API.debug("---DB-- problem saving a search: " + JSON.stringify(er));
		alert("Couldn't save the search.");
		return false;
	}

};

//get all searches
database.getSearches = function() {
	var db = Ti.Database.open(database.name);
	var rows = db.execute("SELECT * FROM searches ORDER BY datetime");

	var results = [];

	while(rows.isValidRow()) {
		results.push({
			id : '' + rows.fieldByName('rowid'),
			data : '' + JSON.parse(rows.fieldByName('search')),
			date : '' + rows.fieldByName('datetime')
		});

		rows.next();
	}

	rows.close();
	db.close();

	return results;
};

module.exports = database;