import React, { useEffect, useState } from 'react'
import calculatePoints from '../utils/pointsCalculator';
import threeMonthFilter from '../utils/filterPriorMonths';
import { Link } from "react-router-dom";
import '../styles/IndexPoints.css'


function IndexPoints() {

    const [nameAndPoints, setNameAndPoints] = useState({})
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:3001/transactions');
                const data = await response.json();
                const filteredData = threeMonthFilter(data); // filter for the last three months
                setTransactions(filteredData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchTransactions();
    }, []);


    useEffect(() => {
        let pointCounter = {}
        transactions.forEach(transaction => {
            if (!(transaction.userId in pointCounter)) {
                pointCounter[transaction.userId] = { name: transaction.userName, points: 0 }
            }
            pointCounter[transaction.userId].points += calculatePoints(transaction.amount)
        })
        setNameAndPoints(pointCounter) // sets the total points for each user for rendering
    }, [transactions])


    return (
        <>
            <h1>Total Points</h1>
            <table>
                <thead>
                    <tr className="first-row">
                        {["Name", "Three Month Total"].map((thead, i) => (
                            <th key={i}>{thead}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Object.keys(nameAndPoints).map(id => {
                        return (
                            <tr key={id}>
                                <td>
                                    <Link to={`/show-points/${id}`} className="link-to-user">{nameAndPoints[id].name}</Link>
                                </td>
                                <td>{nameAndPoints[id].points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table >
        </>
    )
}

export default IndexPoints