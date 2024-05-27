import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        ArrayList<Person> people = new ArrayList<>();
        people.add(new Person("Alice", 30));
        people.add(new Person("Bob", 25));
        people.add(new Person("Alice", 35));
        people.add(new Person("Charlie", 40));
        people.add(new Person("Alice", 25));
 
        Scanner scanner = new Scanner(System.in);
 
        System.out.println("Gib die Sortierkriterien in der gewünschten Reihenfolge ein, getrennt durch ein Komma (z.B. 'name,age'):");
        String[] criteria = scanner.nextLine().split(",");
 
        Comparator<Person> comparator = null;
 
        for (String criterion : criteria) {
            System.out.printf("Sortieren nach %s aufsteigend oder absteigend? (asc/desc):%n", criterion.trim());
            String order = scanner.nextLine().trim();
 
            Comparator<Person> currentComparator;
 
            switch (criterion.trim().toLowerCase()) {
                case "name":
                    currentComparator = Comparator.comparing(Person::getName);
                    break;
                case "age":
                    currentComparator = Comparator.comparingInt(Person::getAge);
                    break;
                default:
                    throw new IllegalArgumentException("Ungültiges Kriterium: " + criterion.trim());
            }
 
            if (order.equalsIgnoreCase("desc")) {
                currentComparator = currentComparator.reversed();
            }
 
            if (comparator == null) {
                comparator = currentComparator;
            } else {
                comparator = comparator.thenComparing(currentComparator);
            }
            System.out.println(comparator.toString());
        }
 
        if (comparator != null) {
            people.sort(comparator);
        }
 
        // Ausgabe
        for (Person person : people) {
            System.out.println(person);
        }
 
        scanner.close();
    }
}