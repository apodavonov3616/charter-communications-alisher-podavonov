import React from 'react'
import { useState, useEffect } from 'react';
import threeMonthFilter from '../utils/filterPriorMonths';
import { Link } from "react-router-dom";


function Transactions() {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:3001/transactions');
                const data = await response.json();
                //filter by three months
                const filteredData = threeMonthFilter(data);
                setTransactions(filteredData);
            } catch (err) {
                console.log(err);
            }

        }
        fetchTransactions();
    }, [])


    return (
        <React.Fragment>
            <h1>Transactions</h1>

            <table>
                <thead>
                    <tr className='first-row'>
                        {["Name", "Date", "Amount"].map((thead, i) => (
                            <th key={i}>{thead}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(({ id, userName, userId, date, amount }) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <Link to={`/show-points/${userId}`} className="link-to-user">{userName}</Link>
                                </td>
                                <td>{date}</td>
                                <td>${amount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </React.Fragment >
    )
}

export default Transactions