import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import AddExpenses from './components/AddExpenses';
import SearchExpenses from './components/SearchExpenses';
import ExpensesList from './components/ExpensesList';
import ExpensesTotal from './components/ExpensesTotal';
import axios from 'axios';

class App extends Component {
  state = {
    listofItems: [],
    total: 0
  };

  apiEndpoint = "https://qlv8kacvn9.execute-api.eu-west-2.amazonaws.com/dev/expenses";

  componentDidMount = () => {    
    axios.get(this.apiEndpoint)
      .then(result => {
        this.setState({
          listofItems: result.data.expenses
        });
        this.totalExpAmt();
      })
      .catch(err => {
      });
  }


  addExpenses = (newText, newCategory, newDate, newAmount, newPaymentType, newNotes, newStatus) => {

    const currentListofExpenses = this.state.listofItems;
    
    const newExpenses = {
      expenses_name: newText,
      category_name: newCategory,
      exp_date: newDate,
      amount: newAmount,
      status: newStatus,
      payment_type: newPaymentType,
      notes: newNotes,
      user_id: 1     
    };

    axios.post(this.apiEndpoint, newExpenses)
    .then(result => {
      const expensesId = result.data.expenses_id;
     
      newExpenses.expenses_id = expensesId;
      currentListofExpenses.push(newExpenses);
      this.setState({
        listofItems: currentListofExpenses
      })
      this.totalExpAmt();
    })
    .catch(err => {
    })
  }

  onUpdateClicked=(rowNum)=>{
    
  }

  onDeleteClicked = (rowNum) => {
    let currentDeleteTask = this.state.listofItems;
    currentDeleteTask.splice(rowNum, 1);
    this.setState({ listofItems: currentDeleteTask });
    this.totalExpAmt();
  }

  totalExpAmt = () => {
    let data = this.state.listofItems;   
    if (data) {
      let result = 0;
      data.forEach(element => {
        result += parseFloat(element.amount);
      });
      this.setState({ total: result });
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <Header />
        </div>
        <div><br></br></div>
        <div className="row">
          <AddExpenses addExpenses={this.addExpenses.bind(this)} />
        </div>
        <div><br></br></div>
        <div className="row">
          <SearchExpenses />
        </div>
        <div><br></br></div>
        <div className="row expensesList"  >
          <div className="col bold">Expenses</div>
          <div className="col bold">Exp Date</div>
          <div className="col bold">Category</div>
          <div className="col bold">Status</div>
          <div className="col bold">Payment</div>
          <div className="col bold">Notes</div>
          <div className="col bold">Amount</div>
          <div className="coll bold"></div>
          <div className="coll "></div>
          <div className="container ">
            {
              this.state.listofItems.map((item, index) => {
                return <ExpensesList
                  expenses_name={item.expenses_name}
                  exp_date={item.exp_date}
                  category_name={item.category_name}
                  status={item.status}
                  payment_type={item.payment_type}
                  notes={item.notes}
                  amount={item.amount}
                  delete={this.onDeleteClicked}
                  key={index}
                  rowNum={index}
                  user_id = {item.user_id}
                />
              })
            }
          </div>
        </div>
        <div className="row total">
          <ExpensesTotal totalAmount={this.state.total}
          /></div>
      </div>
    );

  }
}

export default App;

