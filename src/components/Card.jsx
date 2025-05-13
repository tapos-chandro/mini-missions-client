import { Link } from 'react-router-dom';
import EllipsisText from "react-ellipsis-text";

const Card = ({ task }) => {
  const { _id, image, task_title, task_detail, buyer_name, payable_amount,buyer_image } = task;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition duration-300">
      {/* ✅ Image with padding */}
      <div className="p-4 pt-5">
        <img src={image} alt="Task" className="w-full h-52  object-cover rounded-2xl" />
      </div>

      <div className="px-5 pb-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-color">
              <img src={buyer_image} alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-gray-800">{buyer_name}</span>
          </div>
          <span className="text-xl font-bold text-primary-color">{payable_amount} Coins</span>
        </div>

        <h2 className="text-lg font-bold text-gray-900">{task_title}</h2>

        <p className="text-gray-600 text-sm">
          <EllipsisText text={task_detail} length={150} />
        </p>

        <div className="flex justify-end">
          <Link to={`/dashboard/detail/${_id}`}>
            <button className="bg-primary-color text-white px-5 py-2 rounded-full hover:bg-opacity-90 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
