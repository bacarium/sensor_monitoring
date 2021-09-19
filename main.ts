let system_loop_count = 0
let is_alarm_active = ""
let is_alarm_silenced = false
let system_data_packet = ""
function update_system_clock () {
    basic.pause(100)
    if (system_loop_count < 1000) {
        system_loop_count += 100
    } else {
        system_loop_count = 0
    }
}
input.onButtonPressed(Button.A, function () {
    basic.showNumber(input.temperature())
})
function update_monitoring_status () {
    if (system_loop_count == 0) {
        basic.clearScreen()
        led.plotBrightness(0, 4, 1)
    }
    if (system_loop_count == 500) {
        led.unplot(0, 4)
    }
}
function update_alarm_indicator () {
    if (is_alarm_active == true && is_alarm_silenced == false) {
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.ForeverInBackground)
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
function check_sensors (system_data_packet: string) {
    is_alarm_active = system_data_packet.charAt(1)
    is_alarm_silenced = system_data_packet.charAt(2)
    system_loop_count = system_data_packet.charAt(3)
    if (input.temperature() > 24) {
        is_alarm_active = "1"
    } else {
        is_alarm_active = "0"
        system_data_packet = "" + is_alarm_active + is_alarm_silenced + system_loop_count
    }
}
function init_system_data () {
    system_data_packet = "000"
    return system_data_packet
}
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
basic.forever(function () {
    if (system_data_packet.isEmpty()) {
        system_data_packet = init_system_data()
    }
    check_sensors(system_data_packet)
    update_alarm_indicator()
    update_monitoring_status()
    update_system_clock()
})
