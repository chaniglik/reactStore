import React, { useState, useEffect } from 'react';
import { deleteProductFromServer, getAllProductsFromServer } from '../product/ProductApi';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/saga-orange/theme.css";
import 'primeicons/primeicons.css';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { addProductToCart } from '../order/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
// import { Toast } from 'primereact/toast';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
export default function ShowProducts() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [arr, setArr] = useState([]);
    // let arrCart = useSelector(st => st.myCart.cart);
    let navigate = useNavigate();
    // let dispatch = useDispatch();
    const myUser = JSON.parse(localStorage.getItem('myUser'));
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const sentinelRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const initialFetchDoneRef = useRef(false);
    // let user = useSelector((state) => state.user.currentUser);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            if (currentPage > 1) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }

            const res = await getAllProductsFromServer(currentPage, 6, "");
            const newProducts = res.data;

            if (newProducts.length === 0) {

                setHasMoreProducts(false);
            } else {

                setArr((prevArr) => [...prevArr, ...newProducts]);
                setCurrentPage((prevPage) => prevPage + 1);
            }
        } catch (err) {
            console.error(err);
            alert("השליפה נכשלה");
        } finally {
            setIsLoading(false);
        }
    };

    const handleIntersection = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoading && hasMoreProducts) {
            fetchData();
        }
    };

    useEffect(() => {

        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        });

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }


        return () => {
            observer.disconnect();
        };
    }, [isLoading, hasMoreProducts]);

    useEffect(() => {

        if (!initialFetchDoneRef.current) {
            fetchData();
            initialFetchDoneRef.current = true;
        }
    }, []);
    const deleteItem = async (item) => {
        try {
            let res = await deleteProductFromServer(item, myUser.token);
            setVisible(false);
            alert("Product deleted successfully.");
            console.log(res.data);
            setProducts((products) => products.filter((product) => product.id !== item.id));
        } catch (err) {
            console.log(err);
            alert("Product deletion failed.");
        }
    };

    const editItem = (product) => {
        navigate(`/edit`, { state: { product: product } });

    }

    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.imgUrl} alt={product.nameProduct} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900" style={{ color: "gray" }}>{product.nameProduct}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.description}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            <ConfirmPopup />
                            <div className="card flex flex-wrap gap-2 justify-content-center">
                                <div className="card flex justify-content-center">
                                    <Button onClick={() => editItem(product)} icon="pi pi-pencil" className="p-button-danger" label="Edit" style={{ marginRight: "15px", background: "#c8b4a9", border: "1px solid #c8b4a9" }}></Button>
                                    <Button label="Delete" className="p-button-danger" icon="pi pi-times" onClick={() => setVisible(true)} style={{ background: "#494949", border: "1px solid #494949" }} />
                                    <Dialog header="are you sure you want to delete this product?" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                                        <Button onClick={() => deleteItem(product._id)} icon="pi pi-times" label="Delete" className="p-button-danger" style={{ background: "#494949", border: "1px solid #494949" }} ></Button>

                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id} >
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.description}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={product.imgUrl} alt={product.name} />
                        <div className="text-2xl font-bold">{product.nameProduct}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        {/* <Toast ref={toast} />
                        <ConfirmPopup /> */}
                        <div className="card flex flex-wrap gap-2 justify-content-center">
                            <div className="card flex justify-content-center">
                                <Button onClick={() => editItem(product)} icon="pi pi-pencil" className="p-button-danger" label="Edit" style={{ marginRight: "15px", background: "#c8b4a9", border: "1px solid #c8b4a9" }}></Button>
                                <Button label="Delete" className="p-button-danger" icon="pi pi-times" onClick={() => setVisible(true)} style={{ background: "#494949", border: "1px solid #494949" }} />
                                <Dialog header="are you sure you want to delete this product?" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} >
                                    <Button onClick={() => deleteItem(product._id)} icon="pi pi-times" label="Delete" className="p-button-danger" style={{ background: "#494949", border: "1px solid #494949" }} ></Button>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter" style={{ display: "flex", flexWrap: "wrap" }}>{arr.map((product, index) => itemTemplate(product, layout, index))}
        </div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (<>
        <div style={{ marginTop: "50px", textAlign: "center", marginBottom: "50px" }}>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </span>
        </div>
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>

        {isLoading && (
            <div id="divCircularProgress">
                <CircularProgress id="CircularProgress" style={{ marginLeft:"50%" }}  color="inherit"/>
            </div>
        )}
        {!hasMoreProducts && <p style={{textAlign:"center"}}>No more products</p>}
        <div ref={sentinelRef} style={{ height: '10px', background: 'transparent' }} />
        <Outlet />
    </>
    )
}
