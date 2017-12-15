#include <stdio.h>
#include <stdlib.h>
#include <inttypes.h>

static int compare(uint64_t a, uint64_t b); 
static void part1(uint64_t a, uint64_t b); 
static void part2(uint64_t a, uint64_t b); 
static uint64_t a_factor = 16807;
static uint64_t b_factor = 48271;
static int mod = 2147483647;

int main() {
    part1(873, 583);
    part2(873, 583);
}

static void part1(uint64_t a, uint64_t b) {
    uint64_t score = 0;

    for (int i = 0; i < 40000000; i ++) {
        a = (a * a_factor) % mod;
        b = (b * b_factor) % mod;
        if (compare(a, b))
            score ++;

    }
    printf("%" PRIu64 "\n", score);
}

static void part2(uint64_t a, uint64_t b) {
    uint64_t score = 0;

    for (int i = 0; i < 5000000; i ++) {
        a = (a * a_factor) % mod;
        b = (b * b_factor) % mod;
        while (a % 4 != 0)
            a = (a * a_factor) % mod;

        while (b % 8 != 0)
            b = (b * b_factor) % mod;

        if (compare(a, b))
            score ++;

    }
    printf("%" PRIu64 "\n", score);
}

static int compare(uint64_t a, uint64_t b) {
    for (int i = 0; i < 16; i ++) {
        if ((a & 1) != (b & 1)) {
            return 0;
        }

        a >>= 1;
        b >>= 1;
    }

    return 1;
}