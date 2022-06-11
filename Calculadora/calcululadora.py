# Calculadora

from time import sleep


print('Calculadora'.center(40))

x_number = float(input('Digite um número: '))
print('Analisando'),sleep(3)
y_number = float(input('Digite outro número: '))
print('Analisando'),sleep(3)

def somar():
    soma = x_number + y_number
    print(f'A soma entre {x_number} e {y_number} é igual a {soma}')

def multiplicar():
    multiplicação = x_number * y_number
    print(f'A multiplicação entre {x_number} e {y_number} é igual a {multiplicação}')

def subtrair():
    subtração = x_number - y_number
    print(f'A divisão entre {x_number} e {y_number} é igual a {subtração}')

def potençiação():
    poten = x_number ** y_number
    print(f'A divisão entre {x_number} e {y_number} é igual a {poten}')
def divisao():
    dividir = x_number / y_number
    print(f'A divisão entre {x_number} e {y_number} é igual a {dividir}')


print('O que você quer fazer com esse 2 valores ?')
print('1-Somar.')
print('2-Multiplicar.')
print('3-Subtrair.')
print('4-Potençiação.')
print('5-dividir.')

escolha = int(input('Digite a sua opção de 1 ao 5: '))

if escolha == 1:
    somar()
elif escolha == 2:
    multiplicar()
elif escolha == 3:
    subtrair()
elif escolha == 4:
    potençiação()
elif escolha == 5:
    divisao()