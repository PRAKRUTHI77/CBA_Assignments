import java.util.Scanner;

public class DoubleNumber {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number to double: ");
        int number = scanner.nextInt();

        int result = number * 2;

        System.out.println("Double your number is: " + result);

        scanner.close();
    }
}