import  { useEffect, useState, useContext } from "react";
import styles from "./questions.module.css";
import { axiosInstance } from "../../utility/axios.js";
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { UserState } from "../../App.jsx";

function Question() {
  const [questions, setQuestions] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const questionsPerPage = 5; // Number of questions per page

  const { user } = useContext(UserState);

  
  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/question").then((res) => {
      setQuestions(res.data.message); // Set questions from API response
      setLoading(false);
    });
  }, []);

  // Filter questions based on search query
  const filteredQuestions = questions.filter((question) => {
    const titleMatches = question.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const descriptionMatches = question.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatches || descriptionMatches;
  });

  const indexOfLastQuestion = currentPage * questionsPerPage; // Index of the last question
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage; // Index of the first question
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  ); 

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage); 

  
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); 
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_question}>
        <input
          type="text"
          placeholder="Search for a question"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <hr />
      <h1 className={styles.title}>Questions</h1>
      {loading ? (
        <Loader />
      ) : filteredQuestions.length === 0 ? (
        <div
          style={{
            display: "flex",
            marginTop: "60px",
            fontSize: "25px",
            color: "var(--primary-color)",
            marginBottom: "200px",
            justifyContent: "center",
          }}
        >
          <p>No Questions Found</p>
        </div>
      ) : (
        <>
          {currentQuestions.map((question) => (
            <QuestionCard
              key={question.questionid}
              id={question.questionid}
              userName={question.username}
              questionTitle={question.title}
              description={question.description}
              question_date={question.createdAt}
            />
          ))}

          <div className={styles.pagination}>
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1} 
              style={{ marginRight: "10px", padding: "10px" }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages} 
              style={{ marginLeft: "10px", padding: "10px" }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Question;