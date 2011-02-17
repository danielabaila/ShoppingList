import QtQuick 1.0
import "templates"
import "models"
import "js/main.js" as MainManager

Rectangle {
    id: mainContainer
    width: 360
    height: 640

    property int listIdMain: 0

    FontLoader { id: nokiaStandard; source: "fonts/Nokia Standard v1.1.otf" }

    Image {
        source: "images/backgrounds/app_bkg_360x640.png"
        fillMode: Image.Stretch
        smooth: true
    }

    Rectangle {
        id: contentArea
        height: 500; width: 360
        x:0; y: 80
        color: "#00FFFFFF"

        Loader {
            id: contentItem
            anchors.fill: parent

            source: "ShoppingLists.qml"
        }
    }


    TitleBar {
        title_text: "Shopping List"
        title_icon: "images/app_logo.png"
    }

    Footer {
        anchors.bottom: parent.bottom

        buttonLeftText: "Exit"
        buttonRightText: "Add new list"
    }

    states: [
        State {
            name: "shoppingListsState"
            PropertyChanges {
                target: contentItem
                source: "ShoppingLists.qml"
            }
        },
        State {
            name: "shoppingListState"
            PropertyChanges {
                target: contentItem
                source: "ProductsList.qml"
            }
        }
    ]

    transitions: [
        Transition {
            from: "*"; to: "*"
            //NumberAnimation { properties: "x"; easing.type: Easing.InOutQuad; duration: 2000 }
            SequentialAnimation {
                NumberAnimation { target: contentArea; property: "x"; to: -360; easing.type: Easing.OutBounce; duration: 200 }
                NumberAnimation { target: contentArea; property: "x"; to: 360; duration: 0 }
                NumberAnimation { target: contentArea; property: "x"; to: 0; easing.type: Easing.InBounce; duration: 100 }
            }
        }
    ]
}
