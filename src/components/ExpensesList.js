import React, { Component } from 'react';

class ExpensesList extends Component {
    render() {
        let dateFromApi = this.props.exp_date;
        let localDate = new Date(dateFromApi);
        let localDateString = localDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
        return (
            <div>
                <div className="row expensesList ">

                    <div className="col">
                        {this.props.expenses_name}
                    </div>
                    <div className="col">
                        {localDateString}
                    </div>
                    <div className="col">
                        {this.props.category_name}
                    </div>
                    <div className="col">
                        {this.props.status}
                    </div>
                    <div className="col">
                        {this.props.payment_type}
                    </div>
                    <div className="col">
                        {this.props.notes}
                    </div>
                    <div className="col">
                        {this.props.amount}
                    </div>
                    
                    <div className="col">
                   
                </div>
                
                <button type="button" class="btn btn-outline-success"
                     onClick={this.props.update.bind(this, this.props.expenses_id)}   >Update
                </button> 
                    <button type="button" class="btn btn-outline-success"
                     onClick={this.props.delete.bind(this, this.props.expenses_id)}   >Delete
                </button>

                    
                
                    
                </div>
            </div>

        )
    }
}


export default ExpensesList;