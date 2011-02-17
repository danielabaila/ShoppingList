import QtQuick 1.0


Rectangle {
    id: productItem
    width: parent.width
    height: 80
    color: "#0D1B1E26"

    property alias name: productItemNameText.text
    property alias price: productPriceText.text
    property alias currency: productCurrencyText.text
    property alias quantity: productQuantityText.text
    property alias mu: productMUtext.text

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
            buttonText: "Delete"
            buttonWidth: 80
        }

        Button {
            buttonText: "Edit"
            buttonWidth: 80
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
            id: productCheck
            width: 50
            height: parent.height
            color: "#00000000"

            Image {
                anchors.top: parent.top
                anchors.topMargin: 5
                id: productCheckImage
                width: 50
                height: 50
                fillMode: Image.Stretch
            }
        }

        Rectangle {
            id: productItemName
            width: 140
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
                    height: 60
                    font.family: nokiaStandard.name
                    font.pixelSize: 16
                    font.weight: Font.Light
                    color: "#3567f8"
                    verticalAlignment: Text.AlignVCenter
                    elide: Text.ElideRight
                }
                Text {
                    id: productCurrencyText
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
                    height: 60
                    font.family: nokiaStandard.name
                    font.pixelSize: 16
                    font.weight: Font.Light
                    color: "#3567f8"
                    verticalAlignment: Text.AlignVCenter
                    elide: Text.ElideRight
                }
                Text {
                    id: productMUtext
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
    }
}
