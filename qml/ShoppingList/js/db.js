/*
 * Manages connection and info exchange with the database.
 */
function DbManager () {
    this.db = null;
    this.initialize();
}

DbManager.prototype.initialize = function() {
    this.getDatabase();
    this.destroyDatabase();
    this.createTables();
    this.initializeLastIds();
    this.createTestData();
}

// get db
DbManager.prototype.getDatabase = function(){
    this.db = openDatabaseSync("ShoppingList", "1.0", "Shopping List Database", 100000);
    return true;
}

DbManager.prototype.createTables = function () {
    this.db.transaction(
                function(tx) {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS icons(icon_id INTEGER UNIQUE, icon_path TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS lists(list_id INTEGER UNIQUE, list_icon_id INTEGER, list_name TEXT, list_location TEXT, list_timestamp DATETIME)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS items(item_id INTEGER UNIQUE, item_list_id INTEGER, item_name TEXT, item_quantity FLOAT(2), item_measuring_unit TEXT, item_price FLOAT(2), item_checked BOOLEAN, item_timestamp DATETIME)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS settings(setting_id INTEGER UNIQUE DEFAULT 1, metric TEXT, currency TEXT)');
                    tx.executeSql('CREATE TABLE IF NOT EXISTS last_ids (id INTEGER UNIQUE, last_list_id INTEGER DEFAULT 0, last_item_id INTEGER DEFAULT 0, last_icon_id INTEGER DEFAULT 0)');
                });
}

DbManager.prototype.destroyDatabase = function() {
    this.db.transaction(
                function(tx) {
                    tx.executeSql('DROP TABLE IF EXISTS settings;');
                    tx.executeSql('DROP TABLE IF EXISTS icons;');
                    tx.executeSql('DROP TABLE IF EXISTS lists;');
                    tx.executeSql('DROP TABLE IF EXISTS items;');
                    tx.executeSql('DROP TABLE IF EXISTS last_ids;');
                });
}


DbManager.prototype.setListData = function(name, location, icon_id, list_id) {
    var flag_insert = 0;
    var res = "";

    if (typeof list_id == "undefined") {
        res = this.createList(name, location, icon_id);
    } else {
        res = this.updateListData(name, location, icon_id, list_id);
    }

    return res;
}

DbManager.prototype.createList = function(name, location, icon_id) {
    var list_id = this.getLastListId();
    if (list_id != "error") {
        this.db.transaction(
                    function(tx) {
                        list_id++;
                        var timestamp = new Date().getTime();
                        //timestamp = timestamp.getFullYear() + "-" + (timestamp.getMonth()+1) + "-" + timestamp.getDate() + " " + timestamp.getHours() + ":" + timestamp.getMinutes() + ":" + timestamp.getSeconds();
                        tx.executeSql('INSERT INTO lists VALUES (?, ?, ?, ?, ?);', [list_id, icon_id, name, location, timestamp]);
                    });
        this.incrementLastListId();
        return true;
    } else {
        return;
    }
}

DbManager.prototype.updateList = function(name, location, icon_id, list_id) {
    var res = "";
    var timestamp = new Date().getTime();
    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('UPDATE lists SET list_name = ?, list_location = ?, list_icon_id = ? , list_timestamp = ? WHERE list_id = ?;', [name, location, icon_id, timestamp, list_id]);
                    if (rs.rowsAffected > 0) {
                        res = "OK";
                    } else {
                        res = "error";
                        console.log("ERROR - could not update list data or list doesn't exist - for list with id = " + list_id);
                    }
                });
    return res;
}

DbManager.prototype.getListData = function(list_id) {
    var res = "";

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT * FROM lists, icons WHERE list_icon_id = icon_id AND list_id = ?;', [list_id]);
                    if (rs.rows.length > 0) {
                        res = rs;
                    } else {
                        console.log("ERROR - list with id = " + list_id + "does not exist");
                        res = "error";
                    }
                })
    return res;
}


DbManager.prototype.setSettingsData = function(metric, currency) {
    this.db.transaction(
                function(tx) {
                    tx.executeSql('INSERT OR REPLACE INTO settings VALUES (?, ?, ?);', [1, metric, currency]);
                });
    return true;
}

DbManager.prototype.getSettingsData = function() {
    var res="";

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT * FROM settings;');
                    if (rs.rows.length > 0) {
                        res = rs;
                    } else {
                        console.log("ERROR - could not retrieve settings or no settings available.");
                        res = "error";
                    }
                })
    return res;
}


DbManager.prototype.getLastListId = function() {
    var res;

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT last_list_id FROM last_ids;');

                    if (rs.rows.length > 0) {
                        res = rs.rows.item(0).last_list_id;
                    } else {
                        res = "error";
                        console.log("ERROR - no last list id.");
                    }
                });

    return res;
}

DbManager.prototype.incrementLastListId = function() {
    this.db.transaction(
                function(tx) {
                    tx.executeSql('UPDATE last_ids SET last_list_id = last_list_id + 1;');
                });
    return true;
}

DbManager.prototype.getLastIconId = function() {
    var res;

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT last_icon_id FROM last_ids;');

                    if (rs.rows.length > 0) {
                        res = rs.rows.item(0).last_icon_id;
                    } else {
                        res = "error";
                        console.log("ERROR - no last icon id.");
                    }
                });

    return res;
}

DbManager.prototype.incrementLastIconId = function() {
    this.db.transaction(
                function(tx) {
                   tx.executeSql('UPDATE last_ids SET last_icon_id = last_icon_id + 1;');
                });
    return true;
}


DbManager.prototype.getLastItemId = function() {
    var res;

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT last_item_id FROM last_ids;');

                    if (rs.rows.length > 0) {
                        res = rs.rows.item(0).last_item_id;
                    } else {
                        res = "error";
                        console.log("ERROR - no last item id.");
                    }
                });

    return res;
}

DbManager.prototype.incrementLastItemId = function() {
    this.db.transaction(
                function(tx) {
                   tx.executeSql('UPDATE last_ids SET last_item_id = last_item_id + 1;');
                });
    return true;
}



DbManager.prototype.getIconsData = function() {
    var res="";

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT * FROM icons');
                    if (rs.rows.length > 0) {
                        res = rs;
                    } else {
                        console.log("ERROR - could not retrieve list of icons or no icons available.");
                        res = "error";
                    }
                })
    return res;
}

DbManager.prototype.getIconData = function(icon_id) {
    var res="";

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT * FROM icons WHERE icon_id = ?', [icon_id]);
                    if (rs.rows.length > 0) {
                        res = rs;
                    } else {
                        console.log("ERROR - icon with id " + icon_id + " does not exist.");
                        res = "error";
                    }
                })
    return res;
}


DbManager.prototype.setIconData = function(icon_path, icon_id) {
    if (typeof icon_id == "undefined") {
        var icon_id = this.getLastIconId();
    }
    if (icon_id != "error") {
        icon_id++;
        this.db.transaction(
                    function(tx) {
                        tx.executeSql('INSERT OR REPLACE INTO icons VALUES (?, ?);', [icon_id, icon_path]);
                    });
        this.incrementLastIconId();
        return true;
    }
}


//items
DbManager.prototype.setItemData = function(name, quantity, measuring_unit, price, checked, list_id, item_id) {
    var flag_insert = 0;
    var res = "";

    if (typeof item_id == "undefined") {
        res = this.createItem(name, quantity, measuring_unit, price, checked, list_id);
    } else {
        res = this.updateListData(name, quantity, measuring_unit, price, checked, list_id, item_id);
    }

    return res;
}

DbManager.prototype.createItem = function(name, quantity, measuring_unit, price, checked, list_id) {
    var item_id = this.getLastItemId();
    if (item_id != "error") {
        this.db.transaction(
                    function(tx) {
                        item_id++;
                        var timestamp = new Date().getTime();
                        tx.executeSql('INSERT INTO items VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [item_id, list_id, name, quantity, measuring_unit, price, checked, timestamp]);                        
                    });
        this.incrementLastItemId();
        return true;
    } else {
        return;
    }
}

DbManager.prototype.updateItemData = function(name, quantity, measuring_unit, price, checked, list_id, item_id) {
    var timestamp = new Date().getTime();
    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('UPDATE items SET item_name = ?, item_quantity = ?, item_measuring_unit = ?, item_price = ?, item_checked = ?, item_timestamp = ? WHERE item_id = ?;', [name, quantity, measuring_unit, price, checked, timestamp, item_id]);
                    if (rs.rowsAffected > 0) {
                        res = "OK";
                    } else {
                        res = "error";
                        console.log("ERROR - could not update item data or item doesn't exist - for item with id = " + item_id);
                    }
                });
    return res;
}

DbManager.prototype.getItemData = function(item_id) {
    var res = "";

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT * FROM items WHERE item_id = ?;', [item_id]);
                    if (rs.rows.length > 0) {
                        res = rs;
                    } else {
                        console.log("ERROR - item with id = " + item_id + "does not exist");
                        res = "error";
                    }
                })
    return res;
}



DbManager.prototype.getItemsInList = function(list_id) {
    var res = "";

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT items.*, currency AS item_currency FROM items, settings WHERE items.item_list_id = ? ORDER BY item_timestamp ASC;', [list_id]);
                    if (rs.rows.length > 0) {
                        res = rs;
                    } else {
                        console.log("ERROR - could not get items for list " + list_id);
                        res = "error";
                    }
                })
    return res;
}

DbManager.prototype.getLists = function() {
    var res = "";

    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('SELECT lists.*, icon_path, currency FROM settings, lists LEFT JOIN icons ON lists.list_icon_id = icons.icon_id ORDER BY list_timestamp DESC');
                    if (rs.rows.length > 0) {
                        res = rs;
                    } else {
                        console.log("ERROR - could not retrieve shopping lists or no lists available.");
                        res = "error";
                    }
                })
    return res;
}


DbManager.prototype.checkItem = function(checked, item_id) {
    var res;
    this.db.transaction(
                function(tx) {
                    var rs = tx.executeSql('UPDATE items SET item_checked = ? WHERE item_id = ?;', [checked, item_id]);
                    if (rs.rowsAffected > 0) {
                        res = "OK";
                    } else {
                        res = "error";
                        console.log("ERROR - could not could not check item " + item_id);
                    }
                });
    return res;
}



DbManager.prototype.initializeLastIds = function() {
    this.db.transaction(
                function(tx) {
                   tx.executeSql('INSERT INTO last_ids VALUES (1, 0, 0, 0);');
                });
    return true;
}


DbManager.prototype.removeItemFromList = function(item_id) {
    var res;
    this.db.transaction(
             function(tx) {
                 var rs = tx.executeSql('DELETE FROM items WHERE item_id = ?;', [item_id]);
                 if (rs.rowsAffected > 0) {
                     res = "OK";
                 } else {
                     res = "error";
                     console.log("ERROR - could not delete item " + item_id);
                 }
             });
    return res;
}

DbManager.prototype.removeList = function(list_id) {
    var res;
    this.db.transaction(
             function(tx) {
                 var rs = tx.executeSql('DELETE FROM lists WHERE list_id = ?;', [list_id]);
                 if (rs.rowsAffected > 0) {
                     res = "OK";
                     var rs = tx.executeSql('DELETE FROM items WHERE item_list_id = ?;', [list_id]);
                     if (rs.rowsAffected > 0) {
                         res = "OK";
                     } else {
                         res = "error";
                         console.log("ERROR - could not remove items in deleted list " + list_id);
                     }
                 } else {
                     res = "error";
                     console.log("ERROR - could not delete list " + list_id);
                 }
             });
    return res;
}



DbManager.prototype.createTestData = function() {
    // Settings
    this.setSettingsData("imperial", "RON");

    // Icons
    this.setIconData("images/icons/01.png");
    this.setIconData("images/icons/02.png");
    this.setIconData("images/icons/03.png");
    this.setIconData("images/icons/04.png");

    // Lists
    this.setListData("Test list 1",           "Location", 1);
    this.setListData("Test list test list 2", "Location", 2);
    this.setListData("Test list 3",           "Location", 3);
    this.setListData("Test list 4",           "Location", 4);

    this.setListData("Test list 1",           "Location", 1);
    this.setListData("Test list test list 2", "Location", 2);
    this.setListData("Test list 3",           "Location", 3);
    this.setListData("Test list 4",           "Location", 4);

    this.setListData("Test list 1",           "Location", 1);
    this.setListData("Test list test list 2", "Location", 2);
    this.setListData("Test list 3",           "Location", 3);
    this.setListData("Test list 4",           "Location", 4);

    // Items per list
    this.setItemData("Chocolate", "100", "gr", "3.5", 0, 1);
    this.setItemData("Coca-cola", "2.5", "l", "4.5", 0, 1);
    this.setItemData("Crisps", "50", "gr", "3", 1, 1);
    this.setItemData("Chips", "80", "gr", "6.2", 0, 1);
    this.setItemData("Meat", "800", "gr", "14.6", 1, 1);

    this.setItemData("Cocoa", "100", "gr", "3.5", 0, 2);
    this.setItemData("Beer", "2.5", "l", "4.5", 0, 2);
    this.setItemData("Olives", "50", "gr", "3", 1, 2);
    this.setItemData("Peanuts", "80", "gr", "6.2", 0, 2);
    this.setItemData("Olive oil", "1", "l", "14.5", 0, 2);

    this.setItemData("Sugar cubes", "100", "gr", "3.5", 0, 3);
    this.setItemData("Wine", "750", "ml", "23", 0, 3);
    this.setItemData("Flour", "1", "kg", "3.4", 1, 3);
    this.setItemData("Crackers", "80", "gr", "6.2", 0, 3);

    this.setItemData("Cigarettes", "1", "pc", "9.3", 0, 4);
    this.setItemData("Mineral water", "5", "l", "3.55", 0, 4);
    this.setItemData("Salt", "50", "gr", "0.75", 1, 4);
    this.setItemData("Sugar", "0.5", "kg", "2.2", 0, 4);
    this.setItemData("Condiments pack", "1", "pkg", "23", 0, 4);

    this.setItemData("Chocolate", "100", "gr", "3.5", 0, 5);
    this.setItemData("Coca-cola", "2.5", "l", "4.5", 0, 5);
    this.setItemData("Crisps", "50", "gr", "3", 1, 5);
    this.setItemData("Chips", "80", "gr", "6.2", 0, 5);
    this.setItemData("Meat", "1.5", "kg", "14.6", 1, 5);

    this.setItemData("Cocoa", "100", "gr", "3.5", 0, 6);
    this.setItemData("Beer", "2.5", "l", "4.5", 0, 6);
    this.setItemData("Olives", "50", "gr", "3", 1, 6);
    this.setItemData("Peanuts", "80", "gr", "6.2", 0, 6);
    this.setItemData("Olive oil", "1", "l", "14.5", 0, 6);

    this.setItemData("Sugar cubes", "1", "pkg", "3.5", 0, 7);
    this.setItemData("Wine", "750", "ml", "23", 0, 7);
    this.setItemData("Flour", "1", "kg", "3.4", 1, 7);
    this.setItemData("Crackers", "80", "gr", "6.2", 0, 7);

    this.setItemData("Cigarettes", "1", "pc", "9.3", 0, 8);
    this.setItemData("Mineral water", "5", "l", "3.55", 0, 8);
    this.setItemData("Salt", "50", "gr", "0.75", 1, 8);
    this.setItemData("Sugar", "500", "gr", "2.2", 0, 8);
    this.setItemData("Condiments pack", "1", "pkg", "23", 0, 8);

    this.setItemData("Chocolate", "100", "gr", "3.5", 0, 9);
    this.setItemData("Coca-cola", "2.5", "l", "4.5", 0, 9);
    this.setItemData("Crisps", "50", "gr", "3", 1, 9);
    this.setItemData("Chips", "80", "gr", "6.2", 0, 9);
    this.setItemData("Meat", "800", "gr", "14.6", 1, 9);

    this.setItemData("Cocoa", "100", "gr", "3.5", 0, 10);
    this.setItemData("Beer", "2.5", "l", "4.5", 0, 10);
    this.setItemData("Olives", "50", "gr", "3", 1, 10);
    this.setItemData("Peanuts", "80", "gr", "6.2", 0, 10);
    this.setItemData("Olive oil", "1", "l", "14.5", 0, 10);

    this.setItemData("Sugar cubes", "100", "gr", "3.5", 0, 11);
    this.setItemData("Wine", "750", "ml", "23", 0, 11);
    this.setItemData("Flour", "1", "kg", "3.4", 1, 11);
    this.setItemData("Crackers", "80", "gr", "6.2", 0, 11);

    this.setItemData("Cigarettes", "1", "pc", "9.3", 0, 12);
    this.setItemData("Mineral water", "5", "l", "3.55", 0, 12);
    this.setItemData("Salt", "50", "gr", "0.75", 1, 12);
    this.setItemData("Sugar", "500", "gr", "2.2", 0, 12);
    this.setItemData("Condiments pack", "1", "pkg", "23", 0, 12);
    this.setItemData("John's magazine", "1", "pc", "13", 0, 12);
}

