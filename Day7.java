import java.util.*;
import java.io.*;
public class Day7 {
    static class Node {
        String name;
        int weight;
        int sum_of_child;
        List<String> children;
        List<Integer> child_weights;

        public Node() {
            sum_of_child = 0;
            children = new ArrayList<>();
            child_weights = new ArrayList<>();
        }
    }

    public static void main(String[] args) {
        String root = "gmcrj";
        Scanner s = new Scanner(System.in);
        HashMap<String, Node> map = new HashMap<>();
        while (s.hasNextLine()) {
            Node node = new Node();
            String line = s.nextLine();
            String[] tokens = line.split("->");
            String[] first = tokens[0].split("\\(");
            node.name = first[0].trim();
            node.weight = Integer.parseInt(first[1].split("\\)")[0]);
            if (tokens.length > 1) {
                String[] children = tokens[1].split("\\,");
                for (int i = 0; i < children.length; i ++)
                    node.children.add(children[i].trim());
            }
            map.put(node.name.trim(), node);
        }

        populate(map, root, 1);
    }

    public static void populate(HashMap<String, Node> map, String name, int depth) {
        Node node;
        if (name == null || (node = map.get(name.trim())) == null) return;
        int sum = 0;
        for (String c : node.children) {
            if (c == null) continue;
            Node child = map.get(c.trim());
            if (child == null) continue;
            populate(map, c.trim(), depth + 1);
            node.child_weights.add(child.weight);
            sum += child.weight;
        }
        if (!node.child_weights.isEmpty() && isDiff(node.child_weights)) {
            System.out.printf("%d %s %s %d\n", node.weight, name.trim(), listToString(node.child_weights), depth);
        }
        node.sum_of_child = sum;
        node.weight += sum;
        return;
    }

    public static boolean isDiff(List<Integer> list) {
        if (list.isEmpty())
            return false;
        int elem = list.get(0);
        for (int value : list) {
            if (elem != value)
                return true;
        }
        return false;
    }

    public static String listToString(List<Integer> list) {
        StringBuilder b = new StringBuilder();
        Iterator<Integer> iter = list.iterator();
        while(iter.hasNext()) {
            b.append(iter.next());
            if (iter.hasNext())
                b.append(",");
        }
        return b.toString();
    }
}