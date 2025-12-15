# VERSIÓN OOP

class ListaNumeros:
	# initialization class
    def __init__(self, lista):
        self.lista = lista

    def obtener_pares(self):
		# list traversal wih for
        return [x for x in self.lista if x % 2 == 0]

    def calcular_promedio(self):
		# Calculates the average of the list.
		# Return: Average as a float, or 0 if the list is empty.
        if not self.lista:
            return 0
        return sum(self.lista) / len(self.lista)

numeros_poo = [1, 26, 2, 44, 8, 11, 19, 13, 14, 23]
lista_numeros = ListaNumeros(numeros_poo)
print('OOP')
print("Lista original:", lista_numeros.lista)
print("Lista de números pares:", lista_numeros.obtener_pares())
print("Promedio de la lista:", lista_numeros.calcular_promedio())

# VERSIÓN FUNCIONAL

from functools import reduce

numeros_func = [1, 26, 2, 44, 8, 11, 19, 13, 14, 23]
# Get pairs using filter
pares = list(filter(lambda x: x % 2 == 0, numeros_func))
# Calculate average using reduce
promedio = reduce(lambda x, y: x + y, numeros_func) / len(numeros_func) if numeros_func else 0

print('Funcional')
print("Lista original:", numeros_func)
print("Lista de números pares:", pares)
print("Promedio de la lista:", promedio)
