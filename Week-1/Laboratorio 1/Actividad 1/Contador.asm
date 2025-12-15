section .data
    num db 5             ; contador inicial = 5
    comparition db 0     ; valor de comparación = 0

section .text
    global _start

_start:
    mov al, [num]        ; cargar el valor del contador (5)

loop_start:
    dec al               ; restar 1 al contador osea al=-1
    cmp al, [comparition]; comparar con 0 al==0
    jne loop_start       ; si no es 0, repetir el bucle

    ; cuando el contador llega a 0, termina
    mov eax, 1           ; syscall: exit
    mov ebx, 0
    int 80h
