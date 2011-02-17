import QtQuick 1.0


Rectangle {
    id: listItem
    width: parent.width
    height: 80
    color: "#0D1B1E26"

    property alias  name: listItemNameText.text
    property alias  icon: listItemIcon.source
    property alias  price: priceText.text
    property alias  currency: priceCurrency.text

    Rectangle {
        id: listItemSeparator
        width: parent.width
        height: 1
        anchors.bottom: parent.bottom
        x: 0
        color: "#d2d2d2"
    }

    Row {
        id: listItemButtonContainer
        spacing: 10
        height: 32
        anchors.right: parent.right
        anchors.rightMargin: 10
        visible: false
        opacity: 0
        y: 90

        Button {
            buttonText: "Edit"
            buttonWidth: 80

            MouseArea {
                anchors.fill: parent

                onClicked: {
                    //TODO: go to edit screen
                }
            }
        }

        Button {
            buttonText: "Delete"
            buttonWidth: 80

            MouseArea {
                anchors.fill: parent

                onClicked: {
                    listItem.height = 0
                    listItem.visible = false
                    //TODO: JS delete function
                }
            }
        }
    }

    Row {
        height: 60
        spacing: 10
        anchors.left: parent.left
        anchors.leftMargin: 10
        anchors.right: parent.right
        anchors.rightMargin: 10
        anchors.top: parent.top
        anchors.topMargin: 10

        Rectangle {
            id: iconContainer
            width: 50
            height: parent.height
            color: "#00000000"

            Image {
                anchors.top: parent.top
                anchors.topMargin: 5
                id: listItemIcon
                width: 50
                height: 50
                fillMode: Image.Stretch
            }
        }

        Rectangle {
            id: listItemName
            width: 150
            height: parent.height
            color: "#00000000"

            Text {
                id: listItemNameText
                anchors.fill: parent
                font.family: nokiaStandard.name
                font.pixelSize: 22
                color: "#393939"
                verticalAlignment: Text.AlignVCenter
                elide: Text.ElideRight
                smooth: true
            }
        }

        Rectangle {
            id: listItemPrice
            width: 60
            height: parent.height
            color: "#00000000"

            Row {
                spacing: 5
                anchors.fill: parent
                anchors.right: parent.right

                Text {
                    id: priceText
                    height: 60
                    font.family: nokiaStandard.name
                    font.pixelSize: 16
                    font.weight: Font.Light
                    color: "#3567f8"
                    verticalAlignment: Text.AlignVCenter
                    elide: Text.ElideRight
                }
                Text {
                    id: priceCurrency
                    height: 60
                    font.family: nokiaStandard.name
                    font.pixelSize: 16
                    font.weight: Font.Light
                    color: "#3567f8"
                    verticalAlignment: Text.AlignVCenter
                    elide: Text.ElideRight
                }

            }
        }

        Rectangle {
            id: arrowIconContainer
            width: 50
            height: 50
            color: "#00000000"

            MouseArea { id: arrowMouseArea; anchors.fill: parent; onClicked: listItem.state = 'active' }

            Image {
                id: arrowIcon
                width: parent.width
                height: parent.height
                anchors.top: parent.top
                anchors.topMargin: 5
                fillMode: Image.Stretch
                source: "../images/icon_arrow_down.png"
            }
        }
    }

    states: [
        State {
            name: "active"
            PropertyChanges { target: listItem; height: 112; color: "#1A1B1E26"; }
            PropertyChanges { target: arrowIcon; source: "../images/icon_arrow_up.png" }
            PropertyChanges { target: arrowMouseArea; onClicked: listItem.state = 'normal' }
            PropertyChanges { target: listItemButtonContainer; y: 70; visible: true; opacity: 1 }
        },

        State {
            name: "normal"
            PropertyChanges { target: listItem; height: 80; color: "#0D1B1E26"; }
            PropertyChanges { target: arrowIcon; source: "../images/icon_arrow_down.png" }
            PropertyChanges { target: arrowMouseArea; onClicked: listItem.state = 'active' }
            PropertyChanges { target: listItemButtonContainer; y: 90; visible: false; opacity: 0 }
        }
    ]

    transitions: [
        Transition {
            PropertyAnimation { property: "height"; duration: 150; easing.type: Easing.InOutBounce }
            ColorAnimation { duration: 100 }
            PropertyAnimation { property: "y"; duration: 150; easing.type: Easing.InOutBounce }
            PropertyAnimation { property: "opacity"; duration: 150; easing.type: Easing.InOutBounce }
        }
    ]
}
