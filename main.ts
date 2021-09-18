function update_system_clock () {
    basic.pause(100)
    if (system_clock_count < 1000) {
        system_clock_count += 100
    } else {
        system_clock_count = 0
    }
}
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.temperature())
})
function update_monitoring_status () {
    if (system_clock_count == 0) {
        led.plotBrightness(0, 4, 1)
    }
    if (system_clock_count == 500) {
        led.unplot(0, 4)
    }
}
function update_alarm_indicator () {
    if (is_alarm_active == true && is_alarm_silenced == false) {
        music.playTone(262, music.beat(BeatFraction.Half))
    }
    if (is_alarm_active == true) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
function check_sensors () {
    if (input.temperature() > 24) {
        is_alarm_active = true
    } else {
        is_alarm_active = false
    }
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    led.plot(4, 4)
    if (is_alarm_silenced == true) {
        is_alarm_silenced = false
    } else {
        is_alarm_silenced = true
    }
})
let system_clock_count = 0
let is_alarm_silenced = false
let is_alarm_active = false
is_alarm_active = true
is_alarm_silenced = false
system_clock_count = 0
basic.forever(function () {
    check_sensors()
    update_alarm_indicator()
    update_monitoring_status()
    update_system_clock()
})
