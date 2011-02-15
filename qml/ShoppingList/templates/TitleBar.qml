import QtQuick 1.0

Rectangle {
    property alias  title_text: title.text
    property alias  title_icon: logo.source

    id: titleBar
    width: parent.width
    height: 80
    color: "#00000000"

    Image {
        source: "../images/backgrounds/titlebar_bkg_360x80.png"
        fillMode: Image.Stretch
        smooth: true
    }

    Image {
        id: logo
        anchors.verticalCenter: parent.verticalCenter
        anchors.left: parent.left
        anchors.leftMargin: 10
    }

    Text {
        id: title
        font.family: nokiaStandard.name
        font.pixelSize: 32
        color: "#FFFFFF"
        style: Text.Raised
        styleColor: "#444549"
        anchors.verticalCenter: parent.verticalCenter
        anchors.left: parent.left
        anchors.leftMargin: 20 + logo.width

    }

    Rectangle {
        id: separatorLine1
        color: "#B6D051"
        height: 6
        width: parent.width
        anchors.bottom: parent.bottom
    }

    Rectangle {
        id: separatorLine2
        color: "#c8c8ca"
        height: 2
        width: parent.width
        anchors.bottom: parent.bottom
    }
}
