Qt.include("db.js");

var dbManager;

// call initialize function
init();


function init() {
    dbManager = new DbManager();
}


// Generate dynamic Lists data model
function generateListItemsModel() {
    var qmlObjectString = 'import QtQuick 1.0;';
    qmlObjectString += 'ListModel {';

    var res = dbManager.getLists();
    if (res == "error") {
        return;
    }

    for(var i = 0; i < res.rows.length; i++) {
        qmlObjectString += 'ListElement {';
        qmlObjectString += 'itemId: "'        + res.rows.item(i).list_id + '" ; ';
        qmlObjectString += 'itemName: "'      + res.rows.item(i).list_name + '"; ';
        qmlObjectString += 'itemLocation: "'  + res.rows.item(i).list_location + '"; ';
        qmlObjectString += 'itemIcon: "'      + res.rows.item(i).icon_path + '"; ';
        qmlObjectString += 'itemPrice: "'     + ' 100 ' + '"; ';
        qmlObjectString += 'itemCurrency: "'  + '$' + '"; ';
        qmlObjectString += 'itemTimestamp: "' + res.rows.item(i).item_timestamp + '"; ';
        qmlObjectString += '}';
    }
    qmlObjectString += '}';

    return Qt.createQmlObject(qmlObjectString, shoppingLists, "dynamicLists");
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
        qmlObjectString += 'itemId: "'            + res.rows.item(i).item_id + '" ; ';
        qmlObjectString += 'itemListId: "'        + res.rows.item(i).item_list_id + '" ; ';
        qmlObjectString += 'itemName: "'          + res.rows.item(i).item_name + '"; ';
        qmlObjectString += 'itemMeasuringUnit: "' + res.rows.item(i).item_measuring_unit + '"; ';
        qmlObjectString += 'itemPrice: "'         + res.rows.item(i).item_price + '"; ';
        qmlObjectString += 'itemCurrency: "'      + res.rows.item(i).item_checked + '"; ';
        qmlObjectString += 'itemTimestamp: "'     + res.rows.item(i).item_timestamp + '"; ';
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
