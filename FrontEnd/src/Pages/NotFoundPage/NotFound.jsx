import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import AnimatePage from "@components/AnimatePage";

const NotFound = () => {
  return (
    <AnimatePage>
      <section className=" bg-gradient-to-b h-screen w-screen shadow-sm from-[#eafbf7] to-[#d2e5fe]  ">
        <div className="px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <img
              src={logo}
              alt=""
              className="mx-auto rounded-full mb-8 inline-block h-56 w-56 flex-none object-cover shadow-[0_10px_100px_5px_rgba(0,0,0,0.4)]"
            />
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">404 Error</h1>
            <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-base md:mb-6 lg:mb-8">
              The page You are requesting is not the part of this web
              application please go back to app by clicking on the below button
            </p>
            <Link
              to={"/Home/Dashboard"}
              className="inline-block items-center rounded-md bg-black px-8 py-4 text-center font-semibold text-white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default NotFound;
