import java.util.Scanner;

public class AreaOfRectangle {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter length: ");
        double length = scanner.nextDouble();

        System.out.print("Enter width: ");
        double width = scanner.nextDouble();

        double area = length * width;

        System.out.println("The area of the rectangle is: " + area);

        scanner.close();
    }
}