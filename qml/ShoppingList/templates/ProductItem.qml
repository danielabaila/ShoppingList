import QtQuick 1.0


Rectangle {
    id: productItem
    width: parent.width
    height: 60
    color: "#0D1B1E26"

    property alias checkState: productItem.state
    property alias name: productItemNameText.text
    property alias price: productPriceText.text
    property alias currency: productCurrencyText.text
    property alias quantity: productQuantityText.text
    property alias mu: productMUtext.text

    states: [
        State {
            name: "1"
            PropertyChanges { target: productItem; color: "#33b6d051" }
            PropertyChanges { target: productCheckImage; source: "../images/icon_check_active.png" }
            PropertyChanges { target: productItem; height: 60; }
            PropertyChanges { target: optionsMouseArea; onClicked: productItem.state = 'extendedChecked' }
            PropertyChanges { target: productItemButtonContainer; y: 60; visible: false; opacity: 0 }
        },
        State {
            name: "0"
            PropertyChanges { target: productItem; color: "#0D1B1E26" }
            PropertyChanges { target: productCheckImage; source: "../images/icon_check.png" }
            PropertyChanges { target: productItem; height: 60; }
            PropertyChanges { target: optionsMouseArea; onClicked: productItem.state = 'extendedUnchecked' }
            PropertyChanges { target: productItemButtonContainer; y: 60; visible: false; opacity: 0 }
        },

        State {
            name: "extendedChecked"
            PropertyChanges { target: productItem; color: "#33b6d051" }
            PropertyChanges { target: productCheckImage; source: "../images/icon_check_active.png" }
            PropertyChanges { target: productItem; height: 92; }
            PropertyChanges { target: optionsMouseArea; onClicked: productItem.state = '1' }
            PropertyChanges { target: productItemButtonContainer; y: 55; visible: true; opacity: 1 }
        },

        State {
            name: "extendedUnchecked"
            PropertyChanges { target: productItem; color: "#0D1B1E26" }
            PropertyChanges { target: productCheckImage; source: "../images/icon_check.png" }
            PropertyChanges { target: productItem; height: 92; }
            PropertyChanges { target: optionsMouseArea; onClicked: productItem.state = '0' }
            PropertyChanges { target: productItemButtonContainer; y: 55; visible: true; opacity: 1 }
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

    MouseArea {
        id: checkMouseArea
        width: 50; height: parent.height
        anchors.left: parent.left

        onClicked: {
            if (productItem.state == "1" || productItem.state == "extendedChecked")
                productItem.state = "0";
            else if (productItem.state == "0" || productItem.state == "extendedUnchecked")
                productItem.state = "1";
        }
    }

    MouseArea {
        id: optionsMouseArea
        width: 310; height: parent.height
        anchors.right: parent.right
    }

    Rectangle {
        id: listItemSeparator
        width: parent.width
        height: 1
        anchors.bottom: parent.bottom
        x: 0
        color: "#d2d2d2"
    }

    Row {
        id: productItemButtonContainer
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
                //TODO: go to product edit
            }
        }

        Button {
            buttonText: "Delete"
            buttonWidth: 80

            MouseArea {
                anchors.fill: parent

                onClicked: {
                    productItem.height = 0
                    productItem.visible = false
                    //TODO: delete function
                }
            }
        }
    }

    Row {
        height: 40
        spacing: 10
        anchors.left: parent.left
        anchors.leftMargin: 10
        anchors.right: parent.right
        anchors.rightMargin: 10
        anchors.top: parent.top
        anchors.topMargin: 10

        Rectangle {
            id: productCheck
            width: 40
            height: parent.height
            color: "#00000000"

            Image {
                anchors.top: parent.top
                id: productCheckImage
                width: 40
                height: 40
                fillMode: Image.Stretch
            }
        }

        Rectangle {
            id: productItemName
            width: 150
            height: parent.height
            color: "#00000000"

            Text {
                id: productItemNameText
                anchors.fill: parent
                font.family: nokiaStandard.name
                font.pixelSize: 18
                color: "#393939"
                verticalAlignment: Text.AlignVCenter
                elide: Text.ElideRight
                smooth: true
            }
        }

        Rectangle {
            id: productItemPrice
            width: 60
            height: parent.height
            color: "#00000000"

            Row {
                spacing: 5
                anchors.fill: parent
                anchors.right: parent.right

                Text {
                    id: productPriceText
                    height: 40
                    font.family: nokiaStandard.name
                    font.pixelSize: 16
                    font.weight: Font.Light
                    color: "#3567f8"
                    verticalAlignment: Text.AlignVCenter
                    elide: Text.ElideRight
                }
                Text {
                    id: productCurrencyText
                    height: 40
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
            id: productItemQuantity
            width: 60
            height: parent.height
            color: "#00000000"

            Row {
                spacing: 5
                anchors.fill: parent
                anchors.right: parent.right

                Text {
                    id: productQuantityText
                    height: 40
                    font.family: nokiaStandard.name
                    font.pixelSize: 16
                    font.weight: Font.Light
                    color: "#3567f8"
                    verticalAlignment: Text.AlignVCenter
                    elide: Text.ElideRight
                }
                Text {
                    id: productMUtext
                    height: 40
                    font.family: nokiaStandard.name
                    font.pixelSize: 16
                    font.weight: Font.Light
                    color: "#3567f8"
                    verticalAlignment: Text.AlignVCenter
                    elide: Text.ElideRight
                }

            }
        }
    }
}
