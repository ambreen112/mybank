#! /usr/bin/env node
import inquirer from "inquirer";
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobNumber;
    accNumber;
    constructor(fName, lName, age, gender, mob, acc) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
        this.gender = gender;
        this.mobNumber = mob;
        this.accNumber = acc;
    }
}
//class Bank
class Bank {
    customers = [];
    accounts = [];
    transactions = [];
    //Method to add a customer to the bank
    addCustomer(Customer) {
        this.customers.push(Customer);
    }
    //Method to get array of account number and balances
    getAccountInfo() {
        return this.customers.map(customer => ({
            accNumber: customer.accNumber,
            balance: this.accounts.find(account => account.accNumber === customer.accNumber)?.balance || 0
        }));
    }
    //Method to add a transaction
    addTransaction(accNumber, type, amount) {
        this.transactions.push({ accNumber, type, amount });
    }
    // Method to get transactions for a specific account
    getTransactions(accNumber) {
        return this.transactions.filter((transaction) => transaction.accNumber === accNumber);
    }
}
let myBank = new Bank();
//Customer insterface
let customer1 = new Customer("Sana", "Ijaz", 30, "female", 123557795, 1001);
let customer2 = new Customer("Arif", "lohar", 45, "Male", 234567713, 1002);
//Add customer to the bank
myBank.addCustomer(customer1);
myBank.addCustomer(customer2);
//Array of account number and balance
myBank.accounts.push({ accNumber: 1001, balance: 6000 });
myBank.accounts.push({ accNumber: 1002, balance: 8000 });
//Get array of accout numbers and balance
//Bank functionality
async function bankservice(bank) {
    let service = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please select your service",
        choices: ["View Balance", "Cash Withdraw", "Cash Deposit"],
    });
    if (service.select == "View Balance") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "please enter your accout number"
        });
        let account = myBank.accounts.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log("Invalid account number");
        }
        else {
            let customer = myBank.customers.find((item) => item.accNumber == account?.accNumber);
            console.log(`Dear ${customer?.firstName}, your account balance is ${account.balance} `);
        }
    }
    //cash withdraw
    if (service.select == "Cash Withdraw") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "please enter your accout number"
        });
        let account = myBank.accounts.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log("Invalid account number");
        }
        else {
            let ans = await inquirer.prompt({
                type: "number",
                message: "please enter your amount.",
                name: "rupee",
            });
            if (account.balance < ans.rupee) {
                console.log("Insufficient balance");
            }
            else {
                let newBalance = account.balance - ans.rupee;
                myBank.addTransaction(account.accNumber, "withdraw", ans.rupee);
            }
            let newBalance = account.balance - ans.rupee;
            console.log(`your remaining amount is, ${newBalance}`);
        }
    }
    //Cash Deposit
    if (service.select == "Cash Deposit") {
        let res = await inquirer.prompt({
            type: "input",
            name: "num",
            message: "please enter your accout number"
        });
        let account = myBank.accounts.find((acc) => acc.accNumber == res.num);
        if (!account) {
            console.log("Invalid account number");
        }
        else {
            let Deposit = await inquirer.prompt({
                type: "number",
                message: "please enter your amount.",
                name: "rupee",
            });
            let newBalance = account.balance + Deposit.rupee;
            console.log(`your new balance is, ${newBalance}`);
        }
    }
}
bankservice(myBank);
