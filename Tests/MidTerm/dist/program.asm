JMP start
var_a: DB 0
var_b: DB 0
var_c: DB 0

start:
MOV A, 3
MOV [var_a], A
MOV A, 5
MOV [var_b], A
MOV A, [var_a]
PUSH A
MOV A, [var_b]
POP B
ADD A, B
MOV [var_c], A
while_start_1:
MOV A, [var_c]
MOV B, A
MOV A, 0
CMP B, A
JBE while_end_2
; Saturated decrement for c: if (c > 0) c--
MOV A, [var_c]
CMP A, 0
JE dec_done_c_3
DEC A
MOV [var_c], A
dec_done_c_3:
JMP while_start_1
while_end_2:
HLT