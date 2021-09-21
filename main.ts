let alarm_is_active = false
let loop_counter = 0
let sound_is_enabled = false
let temp_is_high = false
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showNumber(input.temperature())
    if (alarm_is_active) {
        basic.showIcon(IconNames.Chessboard)
    }
})
function update_status () {
    if (loop_counter > 9) {
        loop_counter = 0
    }
    if (loop_counter == 0) {
        led.plotBrightness(0, 4, 1)
    }
    if (loop_counter == 5) {
        led.unplot(0, 4)
        led.unplot(4, 4)
    }
    basic.pause(100)
    loop_counter += 1
}
function update_sound () {
    if (alarm_is_active && sound_is_enabled) {
        music.playTone(262, music.beat(BeatFraction.Quarter))
    }
}
function check_sensors () {
    if (input.temperature() > 24) {
        temp_is_high = true
    } else {
        temp_is_high = false
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (sound_is_enabled) {
        sound_is_enabled = false
        led.plotBrightness(4, 4, 1)
    } else {
        sound_is_enabled = true
        led.plotBrightness(4, 4, 255)
    }
})
function update_display () {
    if (temp_is_high && !(alarm_is_active)) {
        alarm_is_active = true
        basic.showIcon(IconNames.Chessboard)
    }
    if (!(temp_is_high) && alarm_is_active) {
        alarm_is_active = false
        basic.clearScreen()
    }
}
basic.forever(function () {
    check_sensors()
    update_display()
    update_sound()
    update_status()
})
