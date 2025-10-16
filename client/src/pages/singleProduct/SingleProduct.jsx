import React from "react";
import { Button, Rate, Divider, Spin, notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../services/products/Products";
import { useAddToCartMutation } from "../../services/cart/Cart";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/auth/authSlice";

const SingleProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const authUser = useSelector(getUser);
    const { data: singleProduct, isLoading } = useGetProductByIdQuery({ id });
    const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();

    const handleAddToCart = async (e, item) => {
        e.stopPropagation();
        try {
            let body = { productId: item?._id, quantity: 1, userId: authUser?._id };
            const result = await addToCart(body).unwrap();
            if (result) {
                notification.success({
                    message: "Item added to cart successfully",
                });
            }
        } catch (err) {
            notification.error({
                message: err?.data?.message,
            });
        }
    };

    return (
        <Spin spinning={isLoading}>
            <div className="container mx-auto !p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="w-full h-[500px] flex justify-center items-start !p-3 rounded-lg shadow-md">
                        <img
                            src={singleProduct?.image}
                            alt={singleProduct?.title}
                            className="w-full h-full max-w-md object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold mb-2">{singleProduct?.title}</h1>
                        <p className="text-gray-600 text-sm mb-4 capitalize">
                            Category: {singleProduct?.category}
                        </p>

                        <div className="flex items-start sm:items-center flex-col sm:flex-row  gap-2 mb-4">
                            <Rate disabled allowHalf value={singleProduct?.rating?.rate} />
                            <span className="text-sm text-gray-500">
                                {singleProduct?.rating?.rate} ({singleProduct?.rating?.count}{" "}
                                reviews)
                            </span>
                        </div>

                        <Divider />

                        <div className="mb-4">
                            <h2 className="text-3xl font-semibold text-green-600">
                                ${singleProduct?.price}
                            </h2>
                            <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                        </div>

                        <Divider />

                        <p className="text-gray-700 mb-6">{singleProduct?.description}</p>

                        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-4">
                            <Button
                                type="primary"
                                size="large"
                                loading={cartLoading}
                                className="bg-yellow-500 hover:bg-yellow-600"
                                onClick={(e) => handleAddToCart(e, singleProduct)}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                type="default"
                                size="large"
                                className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                onClick={() => navigate("/")}
                            >
                                Back to Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default SingleProduct;
