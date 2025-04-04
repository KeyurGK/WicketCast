import AuthNavbar from "../components/AuthNavbar";

const Landing = () => {
  return (
    <div>
      <AuthNavbar />
      <main className=" mt-[25%] lg:mt-[5%] flex flex-col items-center">
        <h1 className="text-xl lg:text-4xl font-bold">
          Ready to catch the{" "}
          <span className="text-blue-600">perfect match?</span>
        </h1>
        <h1 className="text-lg lg:text-3xl font-bold">
          Don’t let the <span className="text-blue-600">weather</span> play you
          out!
        </h1>
        <p className="text-gray-500 text-sm lg:text-lg mt-[5%] lg:mt-[3%] text-center">
          WicketCast predicts the weather’s impact on your game day,<br></br> so you can
          book cricket tickets with confidence
        </p>
      </main>
    </div>
  );
};

export default Landing;
