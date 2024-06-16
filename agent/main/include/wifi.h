#pragma once

#include <string.h>

#include "esp_log.h"

#include "esp_wifi.h"
#include "esp_mac.h"
#include "esp_event.h"

#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"

#include "esp_timer.h"

#include "esp_http_client.h"

#include "rgb_led.h"
#include "common.h"

#ifdef __cplusplus
extern "C" {
#endif

/**
 * @brief Structure to hold the FTM responder data
 * 
 */
typedef struct {
    uint8_t mac[6];
    uint8_t channel;
    int8_t rssi;
} ftm_responder_t;

/**
 * @brief Event group for the FTM procedure
 * 
 */
extern EventGroupHandle_t ftm_event_group;

/**
 * @brief Bit for the FTM success
 * 
 */
#define FTM_SUCCESS_BIT BIT0

/**
 * @brief Bit for the FTM failure
 * 
 */
#define FTM_FAILURE_BIT BIT1


/**
 * @brief Raw RTT value
 * 
 */
extern uint32_t rtt_raw;

/**
 * @brief RTT estimate
 * 
 */
extern uint32_t rtt_est;

/**
 * @brief Distance estimate
 * 
 */
extern uint32_t dist_est;

/**
 * @brief Number of (MAX) FTM responders
 * 
 */
#define MAX_FTM_RESPONDERS 64

/**
 * @brief IP address of the latest connected device
 * 
 */
extern esp_ip4_addr_t server_ip;

/**
 * @brief Handle for the HTTP client
 * 
 */
extern esp_http_client_handle_t client;

/**
 * @brief Tag for the Wi-Fi
 * 
 */
#define TAG_WIFI "WIFI"

/**
 * @brief Event handler for Wi-Fi events
 * 
 * @param arg Pointer to the event data
 * @param event_base Event base
 * @param event_id Event ID
 * @param event_data Pointer to the event data
 * 
 * @return void
 */
void wifi_event_handler(void* arg, esp_event_base_t event_base,
                                int32_t event_id, void* event_data);

/**
 * @brief Event handler for IP events
 * 
 * @param arg Pointer to the event data
 * @param event_base Event base
 * @param event_id Event ID
 * @param event_data Pointer to the event data
 * 
 * @return void
 */
void ip_event_handler(void* arg, esp_event_base_t event_base, int32_t event_id, void* event_data);

/**
 * @brief Event handler for HTTP events
 * 
 * @param event Pointer to the event data
 * 
 * @return ESP_OK if the event was successfully handled, ESP_FAIL otherwise
 */
esp_err_t http_event_handler(esp_http_client_event_t *event);

/**
 * @brief Initialize the Wi-Fi as a station and as an access point
 * 
 * @param netif_sta Pointer to the network interface for the station
 * @param netif_ap Pointer to the network interface for the access point
 * 
 * @return ESP_OK if the Wi-Fi was successfully initialized, ESP_FAIL otherwise
 */
esp_err_t wifi_init(esp_netif_t* netif_sta, esp_netif_t* netif_ap);

/**
 * @brief Scan for FTM responders
 *        
 * 
 * @param num_ftm_responders Pointer to the number of FTM responders
 * @param ftm_responders Pointer to the array of FTM responders
 * 
 * @return void
 */
void scan_ftm_responders(int* num_ftm_responders, ftm_responder_t* ftm_responders);

/**
 * @brief Perform the FTM procedure with the FTM responders stored in the global variable ftm_responders
 * 
 * @param nothing Unused parameter
 * 
 * @return void
 */
void ftm_procedure(void *btn_plus_task_to_create);

/**
 * @brief Post data to the server
 * 
 * @param post_data Pointer to the data to be posted
 * 
 * @return ESP_OK if the data was successfully posted, ESP_FAIL otherwise
 */
esp_err_t http_post_data(char *post_data);

#ifdef __cplusplus
}
#endif