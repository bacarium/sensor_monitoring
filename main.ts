let system_loop_counter = 0
basic.forever(function () {
    if (system_loop_counter > 9) {
        system_loop_counter = 0
    }
    if (system_loop_counter == 9) {
        led.unplot(0, 4)
        led.unplot(4, 4)
    }
    if (input.temperature() > 24) {
        music.playTone(262, music.beat(BeatFraction.Quarter))
        basic.showIcon(IconNames.Chessboard)
    } else {
        basic.clearScreen()
    }
    if (system_loop_counter == 5) {
        led.plotBrightness(0, 4, 1)
    }
    basic.pause(100)
    system_loop_counter += 1
})
