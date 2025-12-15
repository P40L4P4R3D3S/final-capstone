section .data
    num1 db 2       ; Primer número (byte con valor 2)
    num2 db 11      ; Segundo número (byte con valor 11)
    resultsum db 0     ; guardar resultado de Suma
    resultsus db 0     ; guardar resultado de Resta
    resultmult db 0     ; guardar resultado de Multiplicacion
    
section .text
    global _start

_start:
    ; Suma: num1 + num2
    mov al, [num1]          ; AL = num1 (2)
    add al, [num2]          ; AL = AL + num2 → 2 + 11 = 13
    mov [resultsum], al     ; Guardar resultado (13)

    ; Resta: num2 - num1
    mov al, [num2]          ; AL = num2 (11)
    sub al, [num1]          ; AL = AL - num1 → 11 - 2 = 9
    mov [resultsus], al     ; Guardar resultado (9)

    ; Multiplicación: num1 * num2
    mov al, [num1]          ; AL = num1 (2)
    mov bl, [num2]          ; BL = num2 (11)
    mul bl                  ; AX = AL * BL → 2 * 11 = 22
    mov [resultmult], al    ; Guardar solo la parte baja (22)

    ; Salida limpia del programa
    mov eax, 1              ; sys_exit
    mov ebx, 0
    int 80h
