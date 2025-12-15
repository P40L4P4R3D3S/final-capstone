section .data
    num1 db 1       ; Primer número (byte con valor 1)
    num2 db 11      ; Segundo número (byte con valor 11)
    result db 0     ; guardar resultado

section .text
    global _start

_start:
    ; Cargar los valores de num1 y num2
    mov al, [num1]      ; Cargar el valor de num1 en AL (parte baja de EAX)
    add al, [num2]      ; Sumar el valor de num2 al contenido de AL

    ; result = al
    mov [result], al    ; Almacenar el resultado en memoria

    ; Terminar el programa
    mov eax, 1      ; Código de salida (sys_exit)
    mov ebx, 0      ; Salida sin error
    int 80h         ; Llamada al sistema para salir
