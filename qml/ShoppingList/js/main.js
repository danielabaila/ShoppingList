Qt.include("db.js");

var dbManager;

// call initialize function
init();


function init() {
    dbManager = new DbManager();
}


// Generate dynamic Lists data model
function generateListItemsModel(model) {
    var obj = new Object();

    var res = dbManager.getLists();
    if (res == "error") {
        return;
    }

    for(var i = 0; i < res.rows.length; i++) {
        obj.itemIndex =  i;
        obj.itemId =  res.rows.item(i).list_id;
        obj.itemName =  res.rows.item(i).list_name;
        obj.itemLocation =  res.rows.item(i).list_location;
        obj.itemIcon =  res.rows.item(i).icon_path;
        obj.itemPrice =  "100";
        obj.itemCurrency =  res.rows.item(i).currency;
        obj.itemTimestamp =  res.rows.item(i).list_timestamp;

        model.append(obj);
        obj = {};
    }
    return;
}


// Generate dynamic Items data model
function generateItemsModel(list_id) {
    var qmlObjectString = 'import QtQuick 1.0;';
    qmlObjectString += 'ListModel {';

    var res = dbManager.getItemsInList(list_id);

    if (res == "error") {
        return;
    }

    for(var i = 0; i < res.rows.length; i++) {
        qmlObjectString += 'ListElement {';
        qmlObjectString += 'productId: "'        + res.rows.item(i).item_id + '" ; ';
        qmlObjectString += 'productListId: "'    + res.rows.item(i).item_list_id + '" ; ';
        qmlObjectString += 'productName: "'      + res.rows.item(i).item_name + '"; ';
        qmlObjectString += 'productQuantity: "'  + res.rows.item(i).item_quantity + '"; ';
        qmlObjectString += 'productMU: "'        + res.rows.item(i).item_measuring_unit + '"; ';
        qmlObjectString += 'productPrice: "'     + res.rows.item(i).item_price + '"; ';
        qmlObjectString += 'productCurrency: "'  + res.rows.item(i).item_currency + '"; ';
        qmlObjectString += 'productTimestamp: "' + res.rows.item(i).item_timestamp + '"; ';
        qmlObjectString += 'productState: "' + res.rows.item(i).item_checked + '"; ';
        qmlObjectString += '}';
    }
    qmlObjectString += '}';

    return Qt.createQmlObject(qmlObjectString, shoppingLists, "dynamicItemsInList");
}


// Generate Settings data model
function generateSettingsModel() {
    var qmlObjectString = 'import QtQuick 1.0;';
    qmlObjectString += 'ListModel {';

    var res = dbManager.getSettingsData();

    if (res == "error") {
        return;
    }

    for(var i = 0; i < res.rows.length; i++) {
        qmlObjectString += 'ListElement {';
        qmlObjectString += 'itemId: "'       + res.rows.item(i).setting_id + '" ; ';
        qmlObjectString += 'itemMetric: "'   + res.rows.item(i).metric + '" ; ';
        qmlObjectString += 'itemCurrency: "' + res.rows.item(i).currency + '"; ';
        qmlObjectString += '}';
    }
    qmlObjectString += '}';

    return Qt.createQmlObject(qmlObjectString, parentId, "dynamicSettings");
}


// Generate Icons data model
function generateIconsModel() {
    var qmlObjectString = 'import QtQuick 1.0;';
    qmlObjectString += 'ListModel {';

    var res = dbManager.getIconsData();

    if (res == "error") {
        return;
    }

    for(var i = 0; i < res.rows.length; i++) {
        qmlObjectString += 'ListElement {';
        qmlObjectString += 'itemId: "'       + res.rows.item(i).icon_id + '" ; ';
        qmlObjectString += 'itemPath: "'   + res.rows.item(i).icon_path + '" ; ';
        qmlObjectString += '}';
    }
    qmlObjectString += '}';

    return Qt.createQmlObject(qmlObjectString, parentId, "dynamicIconsList");
}

//Delete item from list
function deleteItemFromList(item_id) {
    var res = dbManager.removeItemFromList(item_id);
    if (res == "error") return;
}

//Mark item in list as checked/unchecked - checked = {0,1}
function checkItem(checked, item_id) {
    var res = dbManager.checkItem(checked, item_id);
    if (res == "error") return;
}

//Delete list
function deleteList(list_id) {
    var res = dbManager.removeList(list_id);
    if (res == "error") return;
}
