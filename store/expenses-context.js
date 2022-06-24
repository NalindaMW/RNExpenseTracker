import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "Buy a pair of shoes",
//     amount: 59.99,
//     date: new Date("2022-01-19"),
//   },
//   {
//     id: "e2",
//     description: "Buy a pair of trouses",
//     amount: 29.59,
//     date: new Date("2021-11-10"),
//   },
//   {
//     id: "e3",
//     description: "Buy a book",
//     amount: 18.99,
//     date: new Date("2021-11-19"),
//   },
//   {
//     id: "e4",
//     description: "Buy a car",
//     amount: 59.99,
//     date: new Date("2022-01-18"),
//   },
//   {
//     id: "e5",
//     description: "Buy a laptop",
//     amount: 159.99,
//     date: new Date("2022-01-19"),
//   },
//   {
//     id: "e6",
//     description: "Buy a car",
//     amount: 159.99,
//     date: new Date("2022-06-19"),
//   },
//   {
//     id: "e7",
//     description: "Buy a house",
//     amount: 929.59,
//     date: new Date("2022-06-21"),
//   },
//   {
//     id: "e8",
//     description: "Buy a laptop",
//     amount: 218.99,
//     date: new Date("2021-11-19"),
//   },
//   {
//     id: "e9",
//     description: "Buy a phone",
//     amount: 59.99,
//     date: new Date("2022-06-18"),
//   },
//   {
//     id: "e10",
//     description: "Buy some furniture",
//     amount: 159.99,
//     date: new Date("2022-06-15"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// in here 'state' is an array of expenses
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // const id = new Date().toString() + Math.random().toString();
      // return [{ ...action.payload, id: id }, ...state];

      // using the firebase id generated
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableExpenseindex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseindex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseindex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
