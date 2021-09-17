import React, { useState } from 'react'
import { Col, Container, FormControl, InputGroup, Modal, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import NewModal from '../../components/UI/Modal'
import Input from '../../components/UI/Input'
import "./style.css"
import {
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory, deleteCategories, updateCategory } from "../../actions/category.actions"
import { useEffect } from 'react'




/**
* @author
* @function Category
**/



const Category = (props) => {


    const category = useSelector(state => state.category)
    const [show, setShow] = useState(false)
    const [categoryName, setCategoryName] = useState("")
    const [updateModal, setUpdateModal] = useState(false);
    const [checkedArray, setCheckedArray] = useState([]);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCategory())

    }, [])





    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleShowUpdatModal = () => checkedArray.length > 0 ? setUpdateModal(true) : alert("check update");
    const handleCloseUpdatModal = () => setUpdateModal(false);

    const onClick = () => {



        if (categoryName === "") {
            alert("category name is required");
            setShow(false);
            return;
        }
        dispatch(addCategory(categoryName))

        setCategoryName("")
        setShow(false)
    }


    const checkItem = (id, e) => {

        if (e.target.checked) {
            checkedArray.push(id)
            console.log(checkedArray);
            return checkedArray
        } else {
            for (let i = 0; i < checkedArray.length; i++) {
                if (id._id === checkedArray[i]._id) {
                    checkedArray.splice(i, 1)
                    console.log(checkedArray);
                    return checkedArray
                }
            }
        }


    }


    const updateCategories = () => {
        dispatch(updateCategory(checkedArray))
        setCheckedArray([])
        handleCloseUpdatModal()

    }




    const deleteCategory = () => {

        dispatch(deleteCategories(checkedArray))
        setCheckedArray([])
     
    }


    const renderCategories = (categories) => {

        let myCategories = [];
        for (let i = 0; i < categories.length; i++) {
            myCategories.push(
                <li key={i}>
                    <label>
                        <input
                            type="checkbox"
                            value={categories[i]._id}
                            onChange={(e) => checkItem(categories[i], e)}
                        />

                        {categories[i].name}
                    </label>
                </li>
            )
        }
        return myCategories

    }

    const handleCategoryInput = (key, value, index) => {
        const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item);
        console.log(updatedCheckedArray);
        setCheckedArray(updatedCheckedArray);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer">
                                <span>Actions: </span>
                                <button onClick={handleShow}><IoIosAdd /> <span>Add</span></button>
                                <button onClick={deleteCategory}><IoIosTrash /> <span>Delete</span></button>
                                <button onClick={handleShowUpdatModal}><IoIosCloudUpload /> <span>Edit</span></button>
                            </div>

                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div>
                            <ul>
                                {renderCategories(category.categories)}
                            </ul>
                        </div>


                    </Col>
                </Row>
            </Container>

            {/* add category */}
            <NewModal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
                onClick={onClick}
            >
                <Input
                    value={categoryName}
                    placeholder={`Category Name`}
                    onChange={(e) => setCategoryName(e.target.value)}
                />

            </NewModal>

            {/* update category */}
            <NewModal
                show={updateModal}
                handleClose={handleCloseUpdatModal}
                modalTitle={'Update Category'}
                onClick={updateCategories}
            >
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, key) => {
                        return (
                            <Input key={key}
                                value={item.name}
                                placeholder={`Category Name`}
                                onChange={(e) => handleCategoryInput("name", e.target.value, key)}
                            />
                        )
                    })

                }
            </NewModal>

        </Layout>

    )

}

export default Category