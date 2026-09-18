/**
 * SENSOR DE FLUJO DE AGUA — Arduino
 * Componente: YF-S201 (Sensor de Flujo Magnético)
 * Proyecto: Aqua Max — Monitoreo Inteligente del Agua en instituciones educativas (Santiago de Cali)
 * Hackatón 2025 — Cali, Colombia
 *
 * Conexión:
 *   - VCC → 5V Arduino
 *   - GND → GND
 *   - OUT (señal) → Pin digital 2 (interrupción externa 0)
 *
 * Funcionamiento:
 *   - El sensor YF-S201 genera un pulso por cada cierta cantidad de agua
 *     que fluye. Según el datasheet: 1 litro = 450 pulsos (aprox).
 *   - Conteo de pulsos por segundo → litros por segundo (L/s)
 *   - Cada segundo se imprime el valor por Serial para ser leído por
 *     una plataforma IoT (MQTT, HTTP, etc.)
 */

// ============================================================
// CONFIGURACIÓN
// ============================================================

#define PIN_SENSOR_FLUJO  2      // Pin digital conectado al OUT del YF-S201
#define INTERVALO_MS      1000   // Cada cuantos ms se calcula el flujo (1 segundo)

// ============================================================
// VARIABLES GLOBALES
// ============================================================

volatile unsigned long contadorPulsos = 0;   // Contador de pulsos (volatile por interrupción)
unsigned long tiempoAnterior = 0;             // Tiempo del último cálculo
float litrosPorSegundo = 0.0;                 // Flujo actual en L/s
float litrosPorMinuto = 0.0;                  // Flujo actual en L/min
float totalLitros = 0.0;                     // Total acumulado

// ============================================================
// FUNCIÓN DE INTERRUPCIÓN — Se ejecuta en cada pulso del sensor
// ============================================================

void contarPulso() {
  contadorPulsos++;  // Incrementa el contador cada vez que el sensor genera un pulso
}

// ============================================================
// SETUP — Se ejecuta una vez al iniciar
// ============================================================

void setup() {
  Serial.begin(9600);                // Iniciar comunicación serial (9600 baudios)
  pinMode(PIN_SENSOR_FLUJO, INPUT); // El pin del sensor es entrada

  // Conectar la interrupción externa al pin 2
  // La interrupción se activa en RISING (cuando el pin va de LOW a HIGH)
  attachInterrupt(digitalPinToInterrupt(PIN_SENSOR_FLUJO), contarPulso, RISING);

  // Encabezado de la comunicación
  Serial.println("========================================");
  Serial.println("  AQUA MAX — Sensor de Flujo de Agua");
  Serial.println("  YF-S201 + Arduino");
  Serial.println("========================================");
  Serial.println("Tiempo(s) | Pulsos/s | L/s    | L/min  | Total(L)");
  Serial.println("----------------------------------------");

  // Iniciar cronómetro
  tiempoAnterior = millis();
}

// ============================================================
// LOOP — Se ejecuta repetidamente
// ============================================================

void loop() {
  unsigned long tiempoActual = millis();

  // Cada INTERVALO_MS milisegundos (1 segundo), calcular el flujo
  if (tiempoActual - tiempoAnterior >= INTERVALO_MS) {

    // Desactivar interrupciones brevemente para leer el contador de forma segura
    noInterrupts();
    unsigned long pulsosEnIntervalo = contadorPulsos;
    contadorPulsos = 0;  // Resetear el contador para el próximo intervalo
    interrupts();

    // Calcular flujo:
    // 450 pulsos = 1 litro (según datasheet YF-S201)
    // pulsos/s × (1 L / 450 pulsos) = L/s
    litrosPorSegundo = (float)pulsosEnIntervalo / 450.0;
    litrosPorMinuto  = litrosPorSegundo * 60.0;
    totalLitros      += litrosPorSegundo;

    // Imprimir resultados por Serial
    Serial.print(tiempoActual / 1000);
    Serial.print("        |");
    Serial.print(pulsosEnIntervalo);
    Serial.print("        |");
    Serial.print(litrosPorSegundo, 3);
    Serial.print("     |");
    Serial.print(litrosPorMinuto, 1);
    Serial.print("    |");
    Serial.println(totalLitros, 2);

    // ---- ENVIAR DATOS A PLATAFORMA IOT (opcional) ----
    // En un proyecto real, aquí se enviarían los datos por:
    //   - MQTT: client.publish("aqua_max/flujo/S001", String(litrosPorSegundo).c_str());
    //   - HTTP:  http.post("/api/lecturas", {"flujo": litrosPorSegundo});
    //   - Serial: ya implementado arriba

    // Actualizar tiempo para el próximo intervalo
    tiempoAnterior = tiempoActual;
  }

  // Pequeña pausa para no saturar el procesador
  delay(10);
}

// ============================================================
// NOTAS PARA PRUEBAS
// ============================================================
/*
  1. Conectar el sensor YF-S201:
     - Tubo amarillo (entrada) → desde fuente de agua
     - Tubo rojo (salida) → retorno al desagüe
     - Cable amarillo (OUT) → Pin 2 Arduino
     - Cable rojo (VCC) → 5V Arduino
     - Cable negro (GND) → GND Arduino

  2. Abrir el Monitor Serie del Arduino IDE (Ctrl+Shift+M)
     - Configurar baud rate: 9600
     - Ver los datos del flujo en tiempo real

  3. El sensor necesita un flujo mínimo de ~2 L/min para generar pulsos
     (aprox. 15 pulsos/segundo). Flujos muy bajos pueden no ser detectados.

  4. Para calibrar:
     - Medir un volumen conocido de agua (ej: 1 litro)
     - Contar los pulsos generados
     - Ajustar el factor 450 en el código si es necesario
 */
