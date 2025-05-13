
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <h1 className="text-6xl font-extrabold text-primary-color">404</h1>
      <p className="text-2xl mt-4 text-secondary-color font-semibold">Oops! Page Not Found</p>
      <p className="text-secondary-text mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-primary-color text-white font-medium rounded-full  transition duration-300"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
