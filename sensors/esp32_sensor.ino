/**
 * AQUA MAX — Sensor de Flujo + WiFi con ESP32
 * Monitoreo Inteligente del Agua | Hackatón 2025 | Cali, Colombia
 *
 * Este sketch:
 *   1. Lee el sensor de flujo YF-S201 (GPIO 4)
 *   2. Lee el sensor PIR HC-SR501 (GPIO 5)
 *   3. Lee el sensor de presion MPX5010DP (GPIO 34)
 *   4. Envía datos por MQTT al broker hivemq.com (gratuito)
 *   5. Detecta anomalias y envia alertas automaticas (banos, bebederos y tanques de colegios)
 *
 * Conexiones:
 *   YF-S201:    VCC→5V, GND→GND, OUT→GPIO4 (interrupt)
// Credentials — replace with your WiFi credentials
const char* WIFI_SSID = "TU_RED_WIFI";
const char* WIFI_PASS = "TU_PASSWORD";

// MQTT Broker — using free public broker for testing
const char* MQTT_SERVER = "broker.hivemq.com";
const int   MQTT_PORT   = 1883;
const char* MQTT_CLIENT = "aqua_max_esp32_01";

// MQTT Topics
#define TOPIC_FLUJO     "aqua_max/flujo/S001"    // Telemetry
#define TOPIC_ALERTAS   "aqua_max/alertas"       // Alerts

// ============================================================
// SENSOR PINS
// ============================================================
#define PIN_FLUJO  4   // YF-S201 flow sensor → GPIO 4 (INTERRUPT)
#define PIN_PIR    5   // HC-SR501 PIR motion → GPIO 5
#define PIN_PRES   34  // MPX5010DP pressure → GPIO 34 (ADC1_CH6)

// ============================================================
// ALERT THRESHOLDS (tune for your pipe)
// ============================================================
const float THRESH_FLOW_ALERT   = 5.0;   // L/s — possible leak
const float THRESH_FLOW_OPEN    = 1.0;   // L/s — faucet open, no person
const int   THRESH_PRESS_LOW    = 1000;  // ADC value — pressure too low
const int   THRESH_PRESS_HIGH   = 3500;  // ADC value — pressure too high

// ============================================================
// GLOBAL VARIABLES
// ============================================================
volatile unsigned long pulseCount = 0;
unsigned long lastCalcTime = 0;
unsigned long lastMQTTsend = 0;
float currentFlowLPS = 0.0;
float totalLiters = 0.0;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

// ============================================================
// INTERRUPT ROUTINE — each pulse from YF-S201
// ============================================================
void IRAM_ATTR onFlowPulse() {
  pulseCount++;
}

// ============================================================
// WIFI CONNECTION
// ============================================================
void connectWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  int tries = 0;
  while (WiFi.status() != WL_CONNECTED && tries < 30) {
    delay(500);
    Serial.print(".");
    tries++;
  }
  Serial.println();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi connected! IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("ERROR: Could not connect to WiFi");
  }
}

// ============================================================
// MQTT CONNECTION
// ============================================================
void connectMQTT() {
  while (!mqttClient.connected()) {
    Serial.print("Connecting to MQTT...");
    if (mqttClient.connect(MQTT_CLIENT)) {
      Serial.println("OK");
    } else {
      Serial.print("failed (rc=");
      Serial.print(mqttClient.state());
      Serial.println("). Retrying in 5s...");
      delay(5000);
    }
  }
}

// ============================================================
// PUBLISH MQTT MESSAGE
// ============================================================
void publishMQTT(const char* topic, const String& msg) {
  if (mqttClient.connected()) {
    mqttClient.publish(topic, msg);
  }
}

// ============================================================
// SEND ALERT
// ============================================================
void sendAlert(const char* type, const String& desc) {
  String json = "{\"tipo\":\"" + String(type) +
                "\",\"descripcion\":\"" + desc +
                "\",\"sensor\":\"S001\",\"timestamp\":" + String(millis()/1000) + "}";
  publishMQTT(TOPIC_ALERTAS, json);
  Serial.println("ALERTA [" + String(type) + "]: " + desc);
}

 *   HC-SR501:   VCC→5V, GND→GND, OUT→GPIO5
 *   MPX5010DP:  VCC→5V, GND→GND, OUT→GPIO34 (ADC)
 *
 * MQTT Topics:
 *   aqua_max/flujo/S001   → telemetría cada 5s
 *   aqua_max/alertas      → alertas automáticas
 *
 * Umbrales de alarma:
 *   - Flujo > 5.0 L/s → FUGA_PROBABLE
 *   - Flujo > 1.0 L/s sin movimiento → GRIFO_ABIERTO
 *   - Presión ADC < 1000 → PRESION_BAJA
 *   - Presión ADC > 3500 → PRESION_ALTA
 */

#include <WiFi.h>
#include <PubSubClient.h>


