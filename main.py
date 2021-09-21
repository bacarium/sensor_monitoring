alarm_is_active = False
loop_counter = 0
sound_is_enabled = False
temp_is_high = False

def on_button_pressed_a():
    basic.clear_screen()
    basic.show_number(input.temperature())
    if alarm_is_active:
        basic.show_leds("""
            # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        . . . . .
        """)
input.on_button_pressed(Button.A, on_button_pressed_a)

def update_status():
    global loop_counter
    if loop_counter > 9:
        loop_counter = 0
    if loop_counter == 0:
        led.plot_brightness(0, 4, 1)
    if loop_counter == 5:
        led.unplot(0, 4)
        led.unplot(4, 4)
    basic.pause(100)
    loop_counter += 1
def update_sound():
    if alarm_is_active and sound_is_enabled:
        music.play_tone(262, music.beat(BeatFraction.QUARTER))
def check_sensors():
    global temp_is_high
    if input.temperature() > 24:
        temp_is_high = True
    else:
        temp_is_high = False

def on_logo_pressed():
    global sound_is_enabled
    if sound_is_enabled:
        sound_is_enabled = False
        led.plot_brightness(4, 4, 1)
    else:
        sound_is_enabled = True
        led.plot_brightness(4, 4, 255)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def update_display():
    global alarm_is_active
    if temp_is_high and not (alarm_is_active):
        alarm_is_active = True
        basic.show_leds("""
            # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        . . . . .
        """)
    if not (temp_is_high) and alarm_is_active:
        alarm_is_active = False
        basic.clear_screen()

def on_forever():
    check_sensors()
    update_display()
    update_sound()
    update_status()
basic.forever(on_forever)
