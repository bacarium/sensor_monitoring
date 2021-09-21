let is_alarm_active = false
let is_temp_high = false
let loop_counter = 0
let is_sound_enabled = false
let is_alarm_condition = false
let is_light_high = false
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showNumber(input.temperature())
    if (is_alarm_active) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            . . . . .
            `)
    }
})
function check_temp () {
    if (input.temperature() > 24) {
        is_temp_high = true
    } else {
        is_temp_high = false
    }
}
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
    if (is_alarm_active && is_sound_enabled) {
        music.playTone(262, music.beat(BeatFraction.Quarter))
    }
}
function check_sensors () {
    check_temp()
    check_light()
}
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    basic.showNumber(input.lightLevel())
    if (is_alarm_active) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            . . . . .
            `)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (is_sound_enabled) {
        is_sound_enabled = false
        led.plotBrightness(4, 4, 1)
    } else {
        is_sound_enabled = true
        led.plotBrightness(4, 4, 255)
    }
})
function update_display () {
    if (is_alarm_condition && !(is_alarm_active)) {
        is_alarm_active = true
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            . . . . .
            `)
    }
    if (!(is_alarm_condition) && is_alarm_active) {
        is_alarm_active = false
        basic.clearScreen()
    }
}
function update_alarm_conditions () {
    if (is_temp_high || is_light_high) {
        is_alarm_condition = true
    } else {
        is_alarm_condition = false
    }
}
function check_light () {
    if (input.lightLevel() > 128) {
        is_light_high = true
    } else {
        is_light_high = false
    }
}
basic.forever(function () {
    check_temp()
    update_alarm_conditions()
    update_display()
    update_sound()
    update_status()
})
