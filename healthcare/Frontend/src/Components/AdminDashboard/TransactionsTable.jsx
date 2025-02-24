// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TransactionsTable = () => {
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchTransactions();
//     }, []);

//     const fetchTransactions = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/api/transactions/');
//             setTransactions(response.data);
//         } catch (error) {
//             console.error('Error fetching transactions:', error);
//             toast.error('Failed to fetch transactions.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <ToastContainer position="top-center" autoClose={2000} />
//             <h2>Transactions</h2>

//             {loading ? (
//                 <p>Loading transactions...</p>
//             ) : (
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>Amount</th>
//                             <th>Payment Method</th>
//                             <th>Description</th>
//                             <th>Customer</th>
//                             <th>Date</th>
//                             <th>Refunded Date</th>
//                             <th>Decline Reason</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {transactions.map((transaction) => (
//                             <tr key={transaction.id}>
//                                 <td>{transaction.amount}</td>
//                                 <td>{transaction.payment_method}</td>
//                                 <td>{transaction.description}</td>
//                                 <td>{transaction.customer}</td>
//                                 <td>{new Date(transaction.date).toLocaleString()}</td>
//                                 <td>{transaction.refunded_date ? new Date(transaction.refunded_date).toLocaleString() : '—'}</td>
//                                 <td>{transaction.decline_reason || '—'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default TransactionsTable;





//for fetching the transactions from the backend
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionsTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/payments/');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error('Failed to fetch transactions.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-center" autoClose={2000} />
            <h2>Transactions</h2>

            {loading ? (
                <p>Loading transactions...</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Stripe Payment ID</th>
                            <th>Created At</th>
                            <th>User Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.currency}</td>
                                <td>{transaction.stripe_payment_id}</td>
                                <td>{new Date(transaction.created_at).toLocaleString()}</td>
                                <td>{transaction.user_email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionsTable;