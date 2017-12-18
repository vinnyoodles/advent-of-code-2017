import java.util.*;
import java.io.*;
public class Day18 {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        List<String> list = new ArrayList<>();
        while (s.hasNextLine()) {
            list.add(s.nextLine());
        }
        part1(list);
        part2(list);
    }

    public static void part1(List<String> list) {
        HashMap<String, Long> map = new HashMap<>();
        long freq = 0;
        int i = 0;
        boolean done = false;

        while (!done && i < list.size() && i >= 0) {
            String[] tokens = list.get(i).split("\\s+");
            long jump = 1;
            switch (tokens[0]) {
                case "snd": 
                    freq = get(map, tokens[1]);
                    break;
                case "set": 
                    map.put(tokens[1], get(map, tokens[2]));
                    break;
                case "add":
                    map.put(tokens[1], map.getOrDefault(tokens[1], 0L) + get(map, tokens[2]));
                    break;
                case "mul":
                    map.put(tokens[1], map.getOrDefault(tokens[1], 0L) * get(map, tokens[2]));
                    break;
                case "mod":
                    long foo = get(map, tokens[2]);
                    if (foo <= 0) break;
                    map.put(tokens[1], map.getOrDefault(tokens[1], 0L) % foo);
                    break;
                case "rcv": 
                    if (map.getOrDefault(tokens[1], 0L) != 0) {
                        System.out.println(freq);
                        done = true;
                    }
                    break;
                case "jgz":
                    if (map.getOrDefault(tokens[1], 0L) > 0) 
                        jump = get(map, tokens[2]);

                    jump = jump == 0 ? 1 : jump;
                    break;
            }
            i += jump;
        }
    }

    public static void part2(List<String> list) {
        Program a = new Program(list); 
        Program b = new Program(list); 
        a.set("p", 0L);
        b.set("p", 1L);

        a.setPartner(b);
        b.setPartner(a);

        int count = 0;
        while (a.hasNext() || b.hasNext()) {
            boolean ar = false;
            boolean br = false;
            if (a.hasNext()) {
                ar = a.next();
            }

            if (b.hasNext()) {
                br = b.next();
            }

            if (ar && br) break;
        }

        System.out.println(b.count);
    }

    public static long get(HashMap<String, Long> map, String token) {
        try {
            return Long.parseLong(token);
        } catch (Exception e) {
            return map.getOrDefault(token, 0L);
        }
    }
}