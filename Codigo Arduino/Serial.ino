int led = 13; // Define el pin del LED en el pin 13
char DATO;

void setup() {
  Serial1.begin(9600); // Inicializa la comunicación serial en el puerto Serial1 a 9600 bps
  Serial1.println("Bienvenido");
  pinMode(led, OUTPUT); // Configura el pin del LED como salida
}

void loop() {
  if (Serial1.available() > 0) { // Verifica si hay datos disponibles en el puerto serial Serial1
    DATO = Serial1.read(); // Lee el dato recibido
    if (DATO == 'A') { // Si el dato es 'A'
      digitalWrite(led, HIGH); // Enciende el LED
      Serial1.println("LED on"); // Envía un mensaje por el puerto serial Serial1
    }
    if (DATO == 'a') { // Si el dato es 'a'
      digitalWrite(led, LOW); // Apaga el LED
      Serial1.println("LED off"); // Envía un mensaje por el puerto serial Serial1
    }
  }
}
