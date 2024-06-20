#pragma once

#include "led_strip.h"

#include "common.h"

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief Structure to hold the RGB brightness and delay
 * 
 */
typedef struct {
    uint32_t red;
    uint32_t green;
    uint32_t blue;
    uint32_t brightness;
    uint32_t delay;
} rgb_brightness_delay_t;

/**
 * @brief Handle for the RGB LED as a global variable
 * 
 */
extern led_strip_handle_t led;

/**
 * @brief Brightness of the RGB LED
 * 
 */
#define LED_BRIGHTNESS 10

/**
 * @brief Configure the RGB LED
 * 
 * @attention This function must be called before any other function in this file
 * 
 * @return void
 */
void configure_led(void);

/**
 * @brief Set the color of the RGB LED
 * 
 * @param red Red value (0-255)
 * @param green Green value (0-255)
 * @param blue Blue value (0-255)
 * @param brightness Brightness value (0-255)
 * 
 * @return void
 */
void set_led_color_with_brightness(uint32_t red, uint32_t green, uint32_t blue, uint32_t brightness);

/**
 * @brief Clear the RGB LED
 * 
 * @return void
 */
void clear_led(void);

/**
 * @brief Flash the RGB LED
 *        This function should be called in a separate task, using xTaskCreate
 * 
 * @param pvRgbBrightnessDelay Pointer to the RGB brightness delay structure
 * 
 * @return void
 */
void flash_led(void *pvRgbBrightnessDelay);

#ifdef __cplusplus
}
#endif