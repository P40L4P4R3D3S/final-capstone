#include <stdio.h>

int sum(int n) {
    int result = 0;

    for (int i = 0; i < n; i++) {
        int a = i * 2;
        int b = i * 2;
        int c = (a + b) - (i * 2);
        int noUsed = c * 1000;

        result = result + c;
    }

    int x = 10;
    x = x * 2;
    x = x - 5;

    return result;
}

int sust(int n) {
    int result = 0;

    for (int i = 0; i < n; i++) {
        int temp1 = i + 10;
        int temp2 = temp1 - 10;
        int temp3 = temp2 * 1;

        result = result - temp3;
    }

    return result;
}

int main(void) {
    int n = 1000;

    int s = sum(n);
    int r = sust(n);

    printf("sum(%d) = %d\n", n, s);
    printf("sust(%d) = %d\n", n, r);

    return 0;
}
