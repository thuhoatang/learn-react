import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("program");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [result, setResult] = useState([]);
  console.log(result);

  useEffect(() => {
    const timerId = setTimeout(() => {
        setDebouncedTerm(term);
    }, 1000)

    return () => {
        clearTimeout(timerId);
    }
  }, [term])

  useEffect(() => {
    const search = async () => {
        const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
          params: {
            action: "query",
            list: "search",
            origin: "*",
            format: "json",
            srsearch: debouncedTerm,
          },
        });
  
        setResult(data.query.search);
      };

      search()
  }, [debouncedTerm])

//   useEffect(() => {
//     const search = async () => {
//       const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
//         params: {
//           action: "query",
//           list: "search",
//           origin: "*",
//           format: "json",
//           srsearch: term,
//         },
//       });

//       setResult(data.query.search);
//     };
    // Nếu term rỗng hoặc null và result.length khác null hoặc rỗng
    // Nếu trong if ko có toán tử so sánh thì mặc định nó sẽ so sánh vs true
//     if (term && !result.length) {
//       search();
//     } else {
//       const TimeoutID = setTimeout(() => {
//         if (term) {
//           search();
//         }
//       }, 1000);

//       return () => {
//         clearTimeout(TimeoutID);
//       };
//     }
//   }, [term, result.length]);    

  const renderResults = result.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });
  return (
    <div className="">
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          ></input>
        </div>
      </div>

      <div className="ui celled list">{renderResults}</div>
    </div>
  );
};

export default Search;
