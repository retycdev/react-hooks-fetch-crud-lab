import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((savedQuestion) => setQuestions([...questions, savedQuestion]))
      .catch((error) => console.error("Error adding question:", error));
  }
  

  // In App Component or Parent Component

function handleDeleteQuestion(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then(() => setQuestions(questions.filter((question) => question.id !== id)))
    .catch((error) => console.error("Error deleting question:", error));
}

function handleUpdateQuestion(id, correctIndex) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correctIndex }),
  })
    .then((response) => response.json())
    .then((updatedQuestion) => {
      setQuestions(
        questions.map((question) =>
          question.id === id ? updatedQuestion : question
        )
      );
    })
    .catch((error) => console.error("Error updating question:", error));
}


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList 
          questions={questions} 
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
