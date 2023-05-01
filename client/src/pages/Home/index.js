import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import moment from "moment";

function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <>
      {/* hero section */}
      <section class="">
        <div class="mb-8 flex flex-wrap justify-between md:mb-16">
          <div class="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pt-48 lg:pb-24">
            <h1 class="text-black-800 mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl">
              Find your
              <br />
              style online
            </h1>

            <p class="max-w-md leading-relaxed text-gray-500 xl:text-lg">
              This is a section of some simple filler text, also known as
              placeholder text. It shares characteristics of real text.
            </p>
          </div>

          <div class="mb-12 flex w-full md:mb-16 lg:w-2/3">
            <div class="relative top-12 left-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:top-16 md:left-16 lg:ml-0">
              <img
                src="https://media.istockphoto.com/id/821548604/photo/happy-african-girl-with-shopping-bags.jpg?b=1&s=170667a&w=0&k=20&c=xvbaiZnevpNFXBzhtab84VT3p8K8oPC58R2CpL7Lc4A="
                loading="lazy"
                alt="Photo by Kaung Htet"
                class="h-full w-full object-cover object-center"
              />
            </div>

            <div class="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              <img
                src="https://media.istockphoto.com/id/821551220/photo/happy-afro-girl-with-shopping-bags.jpg?b=1&s=170667a&w=0&k=20&c=XnTVrFeRa4ty0tAXnd_V2OqqJt0odoM0PJFdCD9D1Z4="
                loading="lazy"
                alt="Photo by Manny Moreno"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex gap-5">
        {showFilters && (
          <Filters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex gap-5 items-center">
            {!showFilters && (
              <i
                className="ri-equalizer-line text-xl cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
              ></i>
            )}
            <input
              type="text"
              placeholder="Search Products  here..."
              className="border border-gray-300 rounded border-solid px-2 py-1 h-14 w-full"
            />
          </div>
          <div
            className={`
        grid gap-5 ${
          showFilters
            ? "sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
            : "sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4"
        }
      `}
          >
            {products?.map((product) => {
              return (
                <>
                  {/* <div
                    className="flex flex-col overflow-hidden rounded-lg border bg-white"
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <a
                      href="#"
                      class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                    >
                      <img
                        src={product.images[0]}
                        className="w-full h-52 p-2 rounded-md object-cover"
                        alt=""
                      />
                    </a>
                    <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                      <h2 class="mb-2 text-lg font-semibold text-gray-800">
                        <a
                          href="#"
                          class="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                        >
                          {product.name}
                        </a>
                      </h2>

                      <p class="mb-8 text-gray-500">
                        {product.age} {product.age === 1 ? " year" : " years"}{" "}
                        old
                      </p>

                      <Divider />
                      <span className="text-lg font-bold text-gray-800 lg:text-xl">
                        {product.price} Rs.
                      </span>
                    </div>
                  </div> */}
                  <div>
                    <div
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      class="group relative flex h-96 items-end overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg"
                    >
                      <img
                        src={product.images[0]}
                        loading="lazy"
                        alt="Product Photo"
                        class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                      />

                      <div class="relative flex w-full flex-col rounded-lg bg-white p-4 text-center">
                        <span class="text-lg font-bold text-gray-800 lg:text-xl">
                          {product.name}
                        </span>
                        <div className="flex justify-between">
                          <span class="text-gray-500">{product.price} Rs.</span>
                          <span class="text-gray-300 text-sm">
                            ~ {product.age}{" "}
                            {product.age === 1 ? " year" : " years"} old
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
