import inquirer from "inquirer";
// Define the student class
class Student {
    static counter;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    // Method to view a student balance
    viewBalance() {
        console.log(`Balance for ${this.name} : ${this.balance}`);
    }
    // Method to pay student fees
    payFees(amount) {
        this.balance -= amount;
        console.log(`${amount} Fees paid successfully for ${this.name}`);
    }
    // Method to display student status
    showStatus() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}
// Defining a student manager class to manage students
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    // Method to enroll a student in a course
    enrollStudent(studentId, course) {
        let student = this.students.find(std => std.id === studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(`${student?.name} enrolled in ${course} successfully`);
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    // Method to view a student balance
    viewStudentBalance(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log("Student not found. Please enter correct student ID.");
        }
    }
    //Method to pay student fees
    payStudentFees(studentId, amount) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log("Student not found. Please enter correct student ID.");
        }
    }
    // Method to display student status
    showStudentStatus(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        }
        else {
            console.log("Student not found. Please enter a correct student ID.");
        }
    }
    // Method to find a student by student id
    findStudent(studentId) {
        return this.students.find(std => std.id === studentId);
    }
}
// Main function to run th program
async function main() {
    console.log("Welcome to 'CodeWithRida' - Student Management System");
    console.log("-".repeat(50));
    let studentManager = new StudentManager();
    // While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option:",
                choices: [
                    "Add student",
                    "Enroll student",
                    "View student balance",
                    "Pay fees",
                    "Show status",
                    "Exit"
                ]
            }
        ]);
        // Use switch case to handle user choice
        switch (choice.choice) {
            case "Add student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;
            case "Enroll student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                studentManager.enrollStudent(courseInput.studentId, courseInput.course);
                break;
            case "View student balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                studentManager.viewStudentBalance(balanceInput.studentId);
                break;
            case "Pay fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                studentManager.payStudentFees(feesInput.studentId, feesInput.amount);
                break;
            case "Show status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter a Student ID",
                    }
                ]);
                studentManager.showStudentStatus(statusInput.studentId);
                break;
            case "Exit": {
                console.log("Exiting...");
                process.exit();
            }
        }
    }
}
