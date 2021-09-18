function activate_temp_alarm () {
    led.plot(0, 0)
    led.plot(0, 1)
    led.plot(1, 0)
    led.plot(1, 1)
    if (is_alarm_silenced == true) {
        music.playTone(262, music.beat(BeatFraction.Half))
    }
}
function check_temp_sensor () {
    if (input.temperature() > 24) {
        temp_alarm_active = 0
        activate_temp_alarm()
    }
}
function update_monitoring_status () {
    led.plotBrightness(0, 4, 1)
    basic.pause(500)
    led.unplot(0, 4)
    basic.pause(500)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (is_alarm_silenced == true) {
        is_alarm_silenced = false
    } else {
        is_alarm_silenced = true
    }
})
let temp_alarm_active = 0
let is_alarm_silenced = false
is_alarm_silenced = true
basic.forever(function () {
    update_monitoring_status()
    check_temp_sensor()
})
