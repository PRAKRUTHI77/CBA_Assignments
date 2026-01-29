import java.util.Scanner;

public class GreetUser {
    public static void main(String[] args) {
        
        Scanner scanner = new Scanner(System.in);

        System.out.print("What is your name? ");
        String name = scanner.nextLine();

        System.out.println("Hello, " + name + "! Welcome to Java.");

        scanner.close();
    }
}