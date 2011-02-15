import QtQuick 1.0

Rectangle {
    id: footerButton

    property alias buttonWidth: footerButton.width
    property alias buttonText: footerButtonText.text

    height: 32
    color: "#99B6D051"
    radius: 15

    MouseArea { anchors.fill: parent }

    Text {
        id: footerButtonText
        anchors.fill: parent
        font.family: nokiaStandard.name
        font.pixelSize: 18
        color: "#FFFFFF"
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        elide: Text.ElideRight
    }

    MouseArea {
        anchors.fill: parent
        onClicked: {
            parent.color = "red"
            mainContainer.state = "shoppingListState"
        }
    }

    states: [
        State {
            name: "hasFocus"; when: footerButton.focus;
            PropertyChanges { target: footerButton; color: "#E6B6D051" }
        }
    ]
}

