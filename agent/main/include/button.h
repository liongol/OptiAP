#pragma once

#include "esp_log.h"
#include "iot_button.h"
#include "rgb_led.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "common.h"

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief GPIO pin for the button
 * 
 */
#define BUTTON_GPIO CONFIG_BUTTON_GPIO

/**
 * @brief Button tag
 * 
 */

#define TAG_BUTTON "BUTTON"

/**
 * @brief Initialize the button
 * 
 * @param btn Pointer to the button handle
 * 
 * @return ESP_OK if the button was successfully initialized, ESP_FAIL otherwise
 */
esp_err_t init_button(button_handle_t *btn);

/**
 * @brief Callback function for a single press of the button
 * 
 * @attention Within this function, a new task is created, and the button callback is unregistered. The task is responsible for re-registering the button callback.
 * 
 * @param btn Pointer to the button handle
 * @param task_to_create Pointer to the task to be created
 * 
 * @return void
 */
void button_single_press_cb(void *btn, void *task_to_create);

/**
 * @brief Callback function for a double press of the button
 * 
 * @attention This function is not implemented
 * 
 * @param btn Pointer to the button handle
 * @param task_to_create Pointer to the task to be created
 * 
 * @return void
 */
void button_double_press_cb(void *btn, void *task_to_create);

/**
 * @brief Callback function for a long press of the button
 * 
 * @attention This function is not implemented
 * 
 * @param btn Pointer to the button handle
 * @param task_to_create Pointer to the task to be created
 * 
 * @return void
 */
void button_long_press_cb(void *btn, void *task_to_create);

/**
 * @brief Assign functionalities to the button
 * 
 * @param btn Pointer to the button handle
 * @param task_to_create1 Pointer to the task to be created on a single press
 * @param task_to_create2 Pointer to the task to be created on a double press
 * @param task_to_create3 Pointer to the task to be created on a long press
 * 
 * @return
 *      - ESP_OK on success
 *      - ESP_FAIL otherwise
 */
esp_err_t assign_functionalities_to_button(button_handle_t *btn, TaskFunction_t task_to_create1, TaskFunction_t task_to_create2, TaskFunction_t task_to_create3);

#ifdef __cplusplus
}
#endif