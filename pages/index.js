import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("1999");

  const MOVIE_SEARCH_QUERY = gql`
    query MovieSearch($selectedYear: BigInt!) { 
      movies(
        where: {released: $selectedYear}, 
        options: {limit: 10, sort: {released: DESC}
        }
        ) 
        {
      released
      tagline
      title
      peopleDirected {
        name
      }
      peopleActedIn {
        name
      }
    }
  }
  `;

  const { loading, error, data } = useQuery(MOVIE_SEARCH_QUERY, {
    variables: { selectedYear },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Movies Search</h1>
      <form>
        <label>
          Select movie release year:
          <select
            value={selectedYear}
            onChange={(event) => setSelectedYear(event.target.value)}
          >
            <option value="1999">1999</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
          </select>
        </label>
      </form>

      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Tagline</th>
            <th>Directed by</th>
            <th>Starring</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.movies &&
            data.movies.map((m, i) => (
              <tr key={i}>
                <td>{m.title}</td>
                <td>{m.tagline}</td>
                <td>
                  {m.peopleDirected.reduce(
                    (acc, c, i) =>
                      acc + (i === 0 ? " " : ", ") + c.name,
                    ""
                  )}
                </td>
                <td>
                  {m.peopleActedIn.reduce(
                    (acc, c, i) =>
                      acc + (i === 0 ? " " : ", ") + c.name,
                    ""
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
