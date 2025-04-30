import React from 'react';

const Card = () => {
    return (
        <div>
            <div className="card bg-base-100  shadow-sm border border-primary-color">
                <figure>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvqzyx_zoi6q2c0Gd1XnE7wysD9PGOLe3-A&s"
                        alt="Shoes" className='w-full max-h-60 object-cover' />
                </figure>

                <div className="card-body">
                    <div className='flex gap-3 justify-between items-center '>
                        <div className="avatar flex items-center gap-3">
                            <div className="w-12 ring-1 ring-primary-color rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                            <p className='text-md font-bold text-secondary-text'>Tapos</p>
                        </div>
                        <div>
                            <span className='text-4xl text-primary-color font-bold'>$5</span>
                        </div>
                    </div>
                    <h2 className="card-title">
                        Card Title
                    </h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="card-actions justify-end">
                        <button className="bg-primary-color rounded-full px-6 border-0 btn btn-primary">Fashion</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;