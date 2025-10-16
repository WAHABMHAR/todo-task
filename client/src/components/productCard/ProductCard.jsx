import { Button, Card, InputNumber } from "antd";
import React, { useState } from "react";
import { truncateText } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, handleAddToCart, isAddingToCart }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const handleNavigate = (e) => {
        e.stopPropagation();
        navigate(`/product/${item?._id}`);
    };

    return (
        <Card
            key={item?._id}
            hoverable
            cover={<img alt={item?.title} src={item?.image} className="h-40 object-contain p-4" />}
            className="!rounded-2xl shadow-md !py-4 !px-1 !h-full flex flex-col justify-between"
            onClick={handleNavigate}
        >
            <h3 className="text-lg font-bold">{item?.title}</h3>
            <p className="mt-2 text-gray-600 text-sm" title={item?.description}>
                {truncateText(item?.description)}
            </p>
            <div className="flex flex-col gap-2 justify-end">
                <div className="flex items-start sm:items-center flex-col sm:flex-row gap-2 justify-between mt-4">
                    <span className="text-lg font-semibold text-blue-600">${item?.price}</span>
                    <Button
                        type="primary"
                        onClick={(e) => handleAddToCart(e, item, quantity)}
                        loading={isAddingToCart}
                    >
                        Add to Cart
                    </Button>
                </div>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-start sm:items-center flex-col sm:flex-row gap-2 justify-between mt-2"
                >
                    <span>Quanity:</span>
                    <InputNumber
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        className="w-[100px]"
                        size="large"
                    />
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
