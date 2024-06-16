#pragma once

#include "freertos/event_groups.h"

#include "button.h"

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief Structure to hold the button handle and the task to create
 * 
 */
typedef struct
{
    button_handle_t btn;
    TaskFunction_t task_to_create;
} button_task_t;

/**
 * @brief Event group for the server connection
 * 
 */
extern EventGroupHandle_t server_connect_event_group;

/**
 * @brief Bit for the server connection
 * 
 */
#define SERVER_CONNECT_BIT BIT0

#ifdef __cplusplus
}
#endif