import React from 'react';

const coinPackages = [
  { coins: 10, dollars: 1 },
  { coins: 150, dollars: 10 },
  { coins: 500, dollars: 20 },
  { coins: 1000, dollars: 35 },
];

const PurchaseCoins = () => {
  const handlePurchase = (coins, dollars) => {
    console.log(`Purchasing ${coins} coins for $${dollars}`);
  };

  return (
    <div className="  py-40 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Select a Coin Package
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coinPackages.map(({ coins, dollars }, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-200 hover:border-primary-color transition duration-300 flex flex-col items-center p-8"
            >
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-primary-color">
                  {coins}
                </div>
                <p className="text-sm text-gray-500 mt-1">coins</p>
              </div>

              <div className="w-full border-t border-dashed border-gray-300 my-4"></div>

              <div className="text-center mb-6">
                <p className="text-gray-500 text-lg font-medium">Price</p>
                <p className="text-3xl font-bold text-secondary-color">${dollars}</p>
              </div>

              <button
                onClick={() => handlePurchase(coins, dollars)}
                className="mt-auto bg-primary-color w-full py-2 rounded-full text-white font-semibold hover:bg-opacity-90 transition"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoins;
