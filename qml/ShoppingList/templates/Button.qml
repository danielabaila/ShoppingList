import QtQuick 1.0

Rectangle {
    id: button

    property alias buttonWidth: button.width
    property alias buttonText: buttonText.text

    height: 32
    color: "#661B1E26"
    radius: 5

    MouseArea { anchors.fill: parent }

    Text {
        id: buttonText
        anchors.fill: parent
        font.family: nokiaStandard.name
        font.pixelSize: 18
        color: "#FFFFFF"
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
        elide: Text.ElideRight
    }

    states: [
        State {
            name: "hasFocus"; when: button.activeFocus;
            PropertyChanges { target: button; color: "#991B1E26" }
        }
    ]
}
