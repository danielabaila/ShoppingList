import QtQuick 1.0
import "models"
import "templates"
import "js/main.js" as MainManager

Item {
    id: shoppingListsContainer

    Component {
         id: listSection

         ListItem {
             name: itemName
             price: itemPrice
             icon: itemIcon
             currency: itemCurrency

             height: 80; width: 360

             Component.onCompleted: iId = itemId

             MouseArea {
                anchors.fill: parent
                onClicked: {
                    mainContainer.listIdMain = iId;
                    mainContainer.state = "shoppingListState"
                }
             }
         }
    }

    ListView {
        id: shoppingLists
        height: parent.height; width: parent.width
        model: MainManager.generateListItemsModel();
        delegate: listSection

        states: [
            State {
                name: "ShowBars"
                when: shoppingLists.movingVertically || shoppingLists.movingHorizontally
                PropertyChanges { target: verticalScrollBar; opacity: 1 }
                //PropertyChanges { target: horizontalScrollBar; opacity: 1 }
            }
        ]

        transitions: [
            Transition {
                NumberAnimation { properties: "opacity"; duration: 500 }
            },
            Transition {
                NumberAnimation { property: "x"; duration: 500 }
            }
        ]
    }

    ScrollBar {
        id: verticalScrollBar
        width: 6; height: shoppingLists.height-6
        anchors.right: parent.right
        anchors.top: parent.top
        opacity: 0
        orientation: Qt.Vertical
        position: shoppingLists.visibleArea.yPosition
        pageSize: shoppingLists.visibleArea.heightRatio
    }
}
