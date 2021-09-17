import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import Layout from '../../components/Layout'
import NewModal from '../../components/UI/Modal'
import {
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProductById, getAllProduct } from '../../actions/product.actions'
import Input from '../../components/UI/Input'
import {generatePublicUrl} from "../../urlConfig"
import "./style.css"
/**
* @author
* @function Products
**/

const Products = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const category = useSelector((state) => state.category);
    const [showAddModal, setShowAddModal] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        dispatch(getAllProduct())
    }, [])



    const handleShowAddModal = () => {
        setShowAddModal(true)
    }

    const handleCloseAddModal = () => {
        setShowAddModal(false)
    }

    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false)
    }

    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };


    const submitProductForm = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }

        dispatch(addProduct(form)).then(() => setShowAddModal(false))
            setName("")
            setQuantity("")
            setPrice("")
            setDescription('')
            setCategoryId("")
            setProductPictures("")
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);
    };


    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.product.length > 0
                        ? products.product.map((product ,key) => (
                            <tr key={product._id}>
                                <td>{key+1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category.name}</td>
                                <td>
                                    <button onClick={() => showProductDetailsModal(product)}>
                                        info
                        </button>
                                    <button
                                        onClick={() => {
                                            const payload = {
                                                productId: product._id,
                                            };
                                            dispatch(deleteProductById(payload));
                                        }}
                                    >
                                        del
                        </button>
                                </td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </Table>
        );
    };


    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }

        return (
            <NewModal
                show={productDetailModal}
                handleClose={handleCloseProductDetailsModal}
                modalTitle={"Product Details"}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map((picture) => (
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} alt="" />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </NewModal>
        );
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShowAddModal}><IoIosAdd /> <span>Add</span></button>
                            </div>

                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProducts()}


                    </Col>
                </Row>
            </Container>
            <NewModal
                show={showAddModal}
                handleClose={handleCloseAddModal}
                modalTitle={'Add New Product'}
                onClick={submitProductForm}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={`Quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label="Price"
                    value={price}
                    placeholder={`Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label="Description"
                    value={description}
                    placeholder={`Description`}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option>select category</option>
                    {category.categories.map((option, index) => (

                        <option key={index} value={option._id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {productPictures.length > 0
                    ? productPictures.map((pic, index) => (
                        <div key={index}>{pic.name}</div>
                    ))
                    : null}
                <input
                    type="file"
                    name="productPicture"
                    onChange={handleProductPictures}
                />

            </NewModal>
            {renderProductDetailsModal()}

        </Layout>

    )

}

export default Products