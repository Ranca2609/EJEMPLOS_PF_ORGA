import serial
import time

# Configura el puerto serial para que coincida con la configuración mostrada en tu monitor serial.
ser = serial.Serial('COM9', 9600)
time.sleep(2)  # Espera a que se establezca la conexión serial

def toggle_led(command):
    """
    Envia el comando al Arduino para controlar el LED.
    'A' para encender, 'a' para apagar.
    """
    ser.write(command.encode())  # Envía el comando al Arduino

try:
    while True:
        cmd = input("Ingrese 'A' para encender el LED o 'a' para apagarlo (Ingrese 'salir' para terminar): ")
        if cmd in ['a', 'A']:
            toggle_led(cmd)
        elif cmd == 'salir':
            print("Saliendo...")
            break
        else:
            print("Comando no reconocido. Intente nuevamente.")
finally:
    ser.close()  # Cierre de conexion con el arduino
