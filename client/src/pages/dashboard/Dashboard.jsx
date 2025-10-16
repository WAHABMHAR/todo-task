import React, { useMemo, useState } from "react";
import { useGetProductsQuery } from "../../services/products/Products";
import ProductCard from "../../components/productCard/ProductCard";
import { Empty, notification, Pagination, Select, Spin } from "antd";
import { useAddToCartMutation } from "../../services/cart/Cart";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/auth/authSlice";
import { getOrCreateCartId } from "../../utils/utils";

const Dashboard = () => {
    const { data: products, isLoading } = useGetProductsQuery();

    const user = useSelector(getUser);
    const [loadingId, setLoadingId] = useState(null);
    const [addToCart] = useAddToCartMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);

    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleAddToCart = async (e, item, quantity) => {
        e.stopPropagation();
        try {
            setLoadingId(item?._id);
            const cartId = getOrCreateCartId();
            let body = { productId: item?._id, quantity: quantity || 1, cartId: cartId };
            const result = await addToCart(body).unwrap();
            if (result) {
                notification.success({
                    message: "Item added to cart successfully",
                });
                setLoadingId(null);
            }
        } catch (err) {
            setLoadingId(null);
            notification.error({
                message: err?.data?.message,
            });
        }
    };

    const categories = useMemo(() => {
        if (!products) return [];
        return ["all", ...new Set(products.map((item) => item.category))];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        if (selectedCategory === "all") return products;
        return products.filter((p) => p.category === selectedCategory);
    }, [products, selectedCategory]);

    const startIndex = (currentPage - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

    let content;

    if (products && products.length > 0) {
        content = (
            <div className="wrapper flex justify-center">
                <div className="container !p-6">
                    <div className="flex justify-between items-center !m-4 px-5">
                        <h2 className="text-2xl font-bold">Products</h2>
                        <Select
                            value={selectedCategory}
                            style={{ width: 100 }}
                            dropdownMatchSelectWidth={false}
                            onChange={(value) => {
                                setSelectedCategory(value);
                                setCurrentPage(1);
                            }}
                        >
                            {categories.map((cat) => (
                                <Option key={cat} value={cat}>
                                    {cat.toUpperCase()}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="wrapper grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 !m-5">
                        {paginatedProducts.map((product) => (
                            <ProductCard
                                item={product}
                                handleAddToCart={handleAddToCart}
                                isAddingToCart={loadingId === product?._id}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center !pb-8">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={filteredProducts.length}
                            onChange={(page, size) => {
                                setCurrentPage(page);
                                setPageSize(size);
                            }}
                            showSizeChanger
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="h-screen flex justify-center items-center">
                <Empty />
            </div>
        );
    }

    return (
        <Spin spinning={isLoading} className="!w-full">
            {content}
        </Spin>
    );
};

export default Dashboard;
