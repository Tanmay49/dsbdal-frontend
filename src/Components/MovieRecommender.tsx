import { useState } from "react";
import axios from "axios";

function MovieRecommender() {
  const [movie, setMovie] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(movie);
    try {
      fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: movie }),
        // mode: "no-cors",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          
          setRecommendations(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
 <div className="flex flex-col items-center justify-center h-screen font-sans">
  <div
    className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"
    style={{ 
      backgroundImage: `url("https://editor.analyticsvidhya.com/uploads/76889recommender-system-for-movie-recommendation.jpg")`, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    }}
      />
  <div className="relative z-10">
<h1 className="text-5xl font-extrabold mb-6 text-white text-center tracking-wider uppercase">
  Movie <span className="text-purple-500">Recommender</span>
</h1>
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="text"
        value={movie}
        onChange={(event) => {
          const input = event.target.value;
          const modifiedInput = input.split(" ").join("_");
          setMovie(modifiedInput);
        }}
        placeholder="Enter a movie title"
        className="border-2 border-gray-300 rounded-lg px-4 py-2 w-80 mb-4"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transform transition-transform duration-500 hover:scale-110"
        >
        Recommend
      </button>
    </form>
    <div className="mt-8">
      <div className="flex flex-wrap justify-center">
        {recommendations.map((movie: any) => (
         <div className="max-w-full sm:w-auto rounded-full bg-white rounded overflow-hidden shadow-lg m-4">
         <div className="px-6 py-4">
           <h2 className="font-bold text-xl mb-2 text-grey">{movie}</h2>
         </div>
       </div>
       
        
        ))}
      </div>
    </div>
  </div>
</div>


  );
}

export default MovieRecommender;
