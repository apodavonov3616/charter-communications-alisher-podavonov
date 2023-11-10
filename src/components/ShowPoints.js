import React, { useEffect, useState } from 'react'
import threeMonthFilter from '../utils/filterPriorMonths';
import { useParams } from "react-router-dom";
import calculatePoints from '../utils/pointsCalculator';
import "../styles/ShowPoints.css"

function ShowPoints() {

    const { id } = useParams();
    const [sortedTransactions, setSortedTransactions] = useState([])
    const [monthlyBreakdown, setMonthlyBreakdown] = useState([])
    const [totalPoints, setTotalPoints] = useState(0)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        //formatting the transactions with monthly totals that will be used for render
        let monthlyBreakdown = []

        let currentMonthTally = {} // each month pushed to monthlyBreakdown in the format: {month: "january", transactions: [t1, t2], monthlyTotal: 0}}
        for (let i = 0; i < sortedTransactions.length; i++) {
            let transaction = sortedTransactions[i];
            let month = months[parseInt(transaction.date.substr(5, 2)) - 1];

            if (Object.keys(currentMonthTally).length === 0) currentMonthTally = { month, monthlyTotal: 0, transactions: [] };

            if (currentMonthTally.month === month) {
                currentMonthTally.transactions.push(transaction)
                currentMonthTally.monthlyTotal += calculatePoints(transaction.amount)
            }
            else {
                monthlyBreakdown.push(currentMonthTally)
                currentMonthTally = { month, monthlyTotal: calculatePoints(transaction.amount), transactions: [transaction] };
            }

            if (i === sortedTransactions.length - 1) monthlyBreakdown.push(currentMonthTally)
        }

        setMonthlyBreakdown(monthlyBreakdown) // an array of each month and its details
    }, [sortedTransactions, id])


    useEffect(() => {
        fetch(`http://localhost:3001/transactions`)
        .then(res => res.json())
        .then(res => res.filter(transaction => transaction.userId === id))
        // sorting the user's last three month's worth of transactions into a sortedTransaction state
        .then(res => setSortedTransactions(sortTransactions(threeMonthFilter(res)
            )))
    }, [id])

    const sortTransactions = (transactions) => {
        return transactions.sort((transaction1, transaction2) => {
            return new Date(transaction1.date) - new Date(transaction2.date)
        })
    }

    useEffect(() => {
        //calculate total
        const totalPoints = monthlyBreakdown.reduce((acc, obj) => {
            return acc + obj.monthlyTotal
        }, 0)
        setTotalPoints(totalPoints)
    }, [monthlyBreakdown])


    return (
        <div className="container">
            <h2>All Transactions in Last 3 Months</h2>
            <h3>Hi, {sortedTransactions[0]?.userName}</h3>
            {monthlyBreakdown.map(monthObj => (
                <div key={monthObj.month}>
                    <div className="month-title">{monthObj.month}</div>
                    <table>
                        <thead>
                            <tr className="first-row">
                                {["Date", "Amount", "Points"].map((thead, i) => (
                                    <th key={i}>{thead}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {monthObj.transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.date}</td>
                                    <td>${transaction.amount}</td>
                                    <td>{calculatePoints(transaction.amount)}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div className='monthly-total'>Monthly Total: {monthObj.monthlyTotal} Points</div>
                </div>

            ))}
            <div className="total-points">Three Month Total: {totalPoints} Points</div>
        </div >
    )
}

export default ShowPoints