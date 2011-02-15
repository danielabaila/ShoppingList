import QtQuick 1.0

Item {
    id: footer
    width: 360
    height: 76

    property alias buttonLeftText: buttonLeft.buttonText
    property alias buttonRightText: buttonRight.buttonText

    Image {
        width: parent.width
        height: 16
        anchors.bottom: parent.bottom
        anchors.bottomMargin: 60
        source: "../images/backgrounds/footershadow_bkg_360x16.png"
        fillMode: Image.Stretch
        smooth: true
    }

    Image {
        width: parent.width
        height: 60
        anchors.bottom: parent.bottom
        source: "../images/backgrounds/footer_bkg_360x60.png"
        fillMode: Image.Stretch
        smooth: true
    }
    Row {
        id: booterButtonsContainer
        spacing: 10

        anchors.bottom: parent.bottom
        anchors.bottomMargin: 14
        anchors.left: parent.left
        anchors.leftMargin: 10

        FooterButton {
            id: buttonLeft
            buttonWidth: 165
            anchors.bottom: parent.bottom
            anchors.left: parent.left
        }

        FooterButton {
            id: buttonRight
            buttonWidth: 165
            anchors.bottom: parent.bottom
            anchors.right: parent.right
        }
    }
}
