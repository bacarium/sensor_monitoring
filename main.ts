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
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.OnceInBackground)
    } else {
        music.stopMelody(MelodyStopOptions.All)
    }
    if (is_alarm_active == true) {
        for (let value of [[1, 1]]) {
            led.plot(value[0], value[1])
        }
    } else {
        for (let value of [[1, 1]]) {
            led.unplot(value[0], value[1])
        }
    }
}
function check_sensors () {
    if (input.temperature() > 24) {
        is_alarm_active = true
    } else {
        is_alarm_active = false
    }
}
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(system_clock_count)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(input.lightLevel())
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (is_alarm_silenced == true) {
        is_alarm_silenced = false
        led.plotBrightness(4, 4, 255)
    } else {
        is_alarm_silenced = true
        led.plotBrightness(4, 4, 1)
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
