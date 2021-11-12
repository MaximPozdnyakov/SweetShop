import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="text-gray-700 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-7/12 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Delicious cakes and sweets to order
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        We partner with our customers to produce a product with
                        excellent viscosity, creaminess, flexibility, improved
                        gloss and shelf stability to achieve the perfect piece
                        of chocolate.
                    </p>
                    <div className="flex justify-center">
                        <Link to="/store">
                            <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
                                Go to store
                            </button>
                        </Link>
                        <Link to="/cart">
                            <button className="sm:ml-4 ml-2 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
                                Check your cart
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-5/12 w-5/6">
                    <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src="https://images.unsplash.com/photo-1503525642560-ecca5e2e49e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
            </div>
        </section>
    );
}

export default Home;
