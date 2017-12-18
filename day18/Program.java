import java.util.*;
import java.io.*;
public class Program {
    HashMap<String, Long> map;
    List<String> list;
    int i;
    boolean locked;
    Queue<Long> q;
    Program pair;
    int count;
    public Program(List<String> list) {
        this.list = list;
        count = 0;
        map = new HashMap<>();
        q = new LinkedList<>();
        i = 0;
        locked = false;
    }

    public void setPartner(Program p) {
        this.pair = p;
    }

    public boolean hasNext() {
        return i < list.size() && i >= 0;
    }

    public void set(String a, long b) {
        map.put(a, b);
    }

    public void add(long a) {
        q.add(a);
        locked = false;
    }

    public boolean done() {
        if (locked)
            return true;
        return !hasNext();
    }

    public boolean next() {
        String[] tokens = list.get(i).split("\\s+");
        long jump = 1;
        switch (tokens[0]) {
            case "snd": 
                count ++;
                this.pair.add(get(map, tokens[1]));
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
                if (q.isEmpty()) {
                    i --;
                    locked = true;
                } else {
                    map.put(tokens[1], q.poll());
                    locked = false;
                }
                break;
            case "jgz":
                if (map.getOrDefault(tokens[1], 0L) > 0) 
                    jump = get(map, tokens[2]);

                jump = jump == 0 ? 1 : jump;
                break;
        }
        i += jump;
        return locked;
    }

    public static long get(HashMap<String, Long> map, String token) {
        try {
            return Long.parseLong(token);
        } catch (Exception e) {
            return map.getOrDefault(token, 0L);
        }
    }
}