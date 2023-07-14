import "./App.css";
import { useState, useEffect } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [quotesData, setQuotesData] = useState(null);

  useEffect(() => {
    const fetchQuotesData = async (url) => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        console.log("fetchQuotesData response", response);

        if (!response.ok) {
          throw new Error("fetch failed");
        }

        const json = await response.json();
        console.log("fetchQuotesData json", json);

        setQuotesData(json);
      } catch (error) {
        console.log("fetchQuotesData error block:", error);
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuotesData("https://kristina-quote-server.onrender.com/quotes/");
  }, []);

  return (
    <div className="App">
      {isLoading && <div>Loading..</div>}
      {isError && <div>Error: {isError}</div>}
      {!!quotesData && (
        <main>
          <h1 className="app-title">Quotes App</h1>
          <div className="quote-cards-container">
            {quotesData.map(({ id, author, quote }) => {
              return (
                <div key={id} className="quote-card">
                  <p className="quote-author">{author}</p>
                  <p className="quote-text">{`"${quote}"`}</p>
                </div>
              );
            })}
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
