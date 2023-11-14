import ProductListItem from "../items/ProductListItem";

function ProductList({ data }) {

    return (
        <div className="products-div">
            {
                data &&
                data.map(product => <ProductListItem key={product.productCode} product={product}/>)
            }
        </div>
    );
}

export default ProductList;