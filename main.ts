let temp_is_high = false
let alarm_is_active = false
function update_status () {
	
}
function update_sound () {
	
}
function check_sensors () {
    if (input.temperature() > 24) {
        temp_is_high = true
    } else {
        temp_is_high = false
    }
}
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
