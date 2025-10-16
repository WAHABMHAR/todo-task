import React, { useState } from "react";
import { Button, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CartItem = ({ item, handleRemove, loading }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="flex flex-col sm:flex-row gap-4 !p-4 bg-white rounded-lg shadow-md mb-4 border border-gray-100">
            <img
                src={item?.productId?.image}
                alt={item?.productId?.title}
                className="w-32 h-32 object-contain mx-auto sm:mx-0"
            />

            <div className="flex flex-col justify-between flex-1">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        {item?.productId?.title}
                    </h2>
                    <p className="text-gray-500 text-sm capitalize">{item?.productId?.category}</p>
                    <p className="text-yellow-600 font-semibold text-base mt-1">
                        ${item?.productId?.price?.toFixed(2)}
                    </p>
                </div>
                {/* <div>
                    <InputNumber
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        className="w-[100px]"
                        size="large"
                    />
                </div> */}
                {/* <Button
                    className="flex justify-end items-center !h-8"
                    onClick={() => handleRemove(item)}
                    disabled={loading === item?.productId?._id}
                >
                    <DeleteOutlined
                        title="Delete"
                        className="hover:!text-red-500 cursor-pointer text-2xl"
                    />
                </Button> */}
            </div>
        </div>
    );
};

export default CartItem;
