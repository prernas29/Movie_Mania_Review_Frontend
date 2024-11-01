import React, { useState, useEffect, useContext } from "react";
import Image from "../banner.jpg";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { showSuccess } from "../utils/toastUtils";

function Movies() {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState("");
  const [favourites, setFavourites] = useState([]);

  function goAhead() {
    setPage(page + 1);
  }
  function goBack() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  useEffect(async () => {
    // everytime when page reloads
    // setFavourites(oldFav);
    // data manga
    if (user) {
      let oldFav = await axiosInstance.get(`/api/v1/liked/${user?._id}`);

      oldFav = oldFav.data.LikedMovies || [];
      setFavourites(oldFav)
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&page=${page}`
        )
        .then((res) => {
          console.log(res.data.results);
          console.log(oldFav);
          // const m = res.data.results.filter(
          //   (mov) => !oldFav.map((o) => o.id).includes(mov.id)
          // );
          setMovies(res.data.results);
          console.log(res.data.results);
        });
    }
  }, [page, user]);

  let add = (movie) => {
    let newArray = [...favourites, movie];
    setFavourites([...newArray]);
    // console.log(newArray)
    // after for reload
    const mov = {
      id: movie?.id,
      title: movie?.title,
      backdrop_path: movie?.backdrop_path,
      genre_ids: movie?.genre_ids,
      userId: user?._id,
    };
    console.log(mov);
    axiosInstance.post(`/api/v1/liked/${user?._id}`, movie).then((res) => {
      console.log(res);
      showSuccess("Added to your favourites")
    });
  };

  let del = async (movie) => {
    let newArray = favourites.filter((m) => m.id != movie.id);
    const d = await axiosInstance.delete(
      `/api/v1/liked?id=${movie.id}&userId=${user._id}`
    );
    console.log(d.message);
    setFavourites([...newArray]);
  };

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mt-8 mb-8 font-bold text-2xl text-center">
          Trending Movies
        </div>
        {movies.length == 0 ? (
          <div className="flex justify-center">
            <Oval
              heigth="100"
              width="100"
              color="grey"
              secondaryColor="grey"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {movies.map((movie) => (
              <div
                className={`
                                    bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
                                    md:h-[30vh] md:w-[250px] 
                                    h-[25vh] w-[150px]
                                    bg-center bg-cover
                                    rounded-xl
                                    flex items-end
                                    m-4
                                    hover:scale-110
                                    ease-out duration-300
                                    relative
                                `}
                onMouseEnter={() => {
                  setHover(movie.id);
                }}
                onMouseLeave={() => setHover("")}
              >
                {hover == movie.id && (
                  <>
                    {!favourites.find((m) => m.id == movie.id) ? (
                      <div
                        className="absolute top-2 right-2
                                    p-2
                                    bg-gray-800
                                    rounded-xl
                                    text-xl
                                    cursor-pointer
                                    "
                        onClick={() => add(movie)}
                      >
                        😍
                      </div>
                    ) : (
                      <div
                        className="absolute top-2 right-2
                                    p-2
                                    bg-gray-800
                                    rounded-xl
                                    text-xl
                                    cursor-pointer
                                    "
                        onClick={() => del(movie)}
                      >
                        ❌
                      </div>
                    )}
                  </>
                )}

                <div className="w-full bg-gray-900 text-white py-2 font-bold text-center rounded-b-xl">
                  {movie.title}{" "}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Pagination pageProp={page} goBack={goBack} goAhead={goAhead} />
    </>
  );
}

export default Movies;
