import darkBackground from "../assets/darkBackground.svg";
import ThemeSwitcher from "./ThemeSwitcher";

const AuthenticationWrapper = ({ title, children }) => {
  return (
    <>
      <img
        src={darkBackground}
        alt="Background"
        className="object-cover w-full h-full absolute opacity-50 block md:hidden"
      />  
      <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
        <div className="grid gap-0 md:grid-cols-2 items-center justify-center relative ">
          <div className="absolute top-4 right-2 md:right-10 z-20">
            <ThemeSwitcher />
          </div>
          <div className="flex items-center justify-center px-4 py-12 md:p-0 ">
            <div className="max-w-md w-full text-center">
              <h2 className="mb-3 text-3xl font-bold md:text-5xl">{title}</h2>
              <div className=" pb-4 mb-4 bg-gray-100 shadow-xl dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-700">
                {children}
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center relative overflow-hidden h-screen">
            <div className="absolute inset-0 h-screen p-2">
              <img
                src={darkBackground}
                alt="Background"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthenticationWrapper;
