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
	
	HT.Model.getAccounts = function(){
		var results = [];
		
		var db = HT.Model.install();
		
		//get the accounts
		var rows = db.execute('SELECT DISTINCT name FROM accounts');
    
    	while (rows.isValidRow()){
    		results.push({name: '' + rows.fieldByName('name') + ''});
    		rows.next();
    	}
    	
    	db.close();
    	
    	return results;
	};
	
})();