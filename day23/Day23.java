public class Day23 {
    public static void main(String[] args) {
        int a = 1, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;
        b = 93;
        c = b;

        if (a == 1) {
            b = 109300;
            c = 126300;
        }

        do {
            f = 1;
            for (d = 2; d < b; d ++) {
                if ((b % d) == 0) {
                    f = 0;
                    break; 
                }
            }

            if (f == 0) {
                h ++;
            }

            g = b - c;
            b += 17;
        } while (g != 0);
        System.out.println(h);

    }
}