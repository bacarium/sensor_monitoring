is_alarm_active = False
is_temp_high = False
loop_counter = 0
is_sound_enabled = False
is_alarm_condition = False
is_light_high = False

def on_button_pressed_a():
    basic.clear_screen()
    basic.show_number(input.temperature())
    if is_alarm_active:
        basic.show_leds("""
            # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        . . . . .
        """)
input.on_button_pressed(Button.A, on_button_pressed_a)

def check_temp():
    global is_temp_high
    if input.temperature() > 24:
        is_temp_high = True
    else:
        is_temp_high = False
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
    if is_alarm_active and is_sound_enabled:
        music.play_tone(262, music.beat(BeatFraction.QUARTER))
def check_sensors():
    check_temp()
    check_light()

def on_button_pressed_b():
    basic.clear_screen()
    basic.show_number(input.light_level())
    if is_alarm_active:
        basic.show_leds("""
            # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        . . . . .
        """)
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_pressed():
    global is_sound_enabled
    if is_sound_enabled:
        is_sound_enabled = False
        led.plot_brightness(4, 4, 1)
    else:
        is_sound_enabled = True
        led.plot_brightness(4, 4, 255)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

def update_display():
    global is_alarm_active
    if is_alarm_condition and not (is_alarm_active):
        is_alarm_active = True
        basic.show_leds("""
            # # # # #
                        # # # # #
                        # # # # #
                        # # # # #
                        . . . . .
        """)
    if not (is_alarm_condition) and is_alarm_active:
        is_alarm_active = False
        basic.clear_screen()
def update_alarm_conditions():
    global is_alarm_condition
    if is_temp_high or is_light_high:
        is_alarm_condition = True
    else:
        is_alarm_condition = False
def check_light():
    global is_light_high
    if input.light_level() > 128:
        is_light_high = True
    else:
        is_light_high = False

def on_forever():
    check_sensors()
    update_alarm_conditions()
    update_display()
    update_sound()
    update_status()
basic.forever(on_forever)
