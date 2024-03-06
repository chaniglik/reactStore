import React, { useState, useEffect, useRef } from 'react';
import { getAllProductsFromServer } from '../product/ProductApi';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/saga-orange/theme.css";
import 'primeicons/primeicons.css';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../order/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
export default function ListProducts() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [arr, setArr] = useState([]);
    let arrCart = useSelector(st => st.myCart.cart);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const sentinelRef = useRef(null);
    const initialFetchDoneRef = useRef(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            if (currentPage > 1) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
            const res = await getAllProductsFromServer(currentPage, 6, "");
            const newProducts = res.data;
            if (newProducts.length === 0) {
                // No more products, set hasMoreProducts to false
                setHasMoreProducts(false);
            } else {
                // More products available, append to the existing array
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
        // Create an Intersection Observer to observe the sentinel element
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        });

        // Observe the sentinel element
        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        // Cleanup the observer on component unmount
        return () => {
            observer.disconnect();
        };
    }, [isLoading, hasMoreProducts]);

    useEffect(() => {
        // Fetch data initially when the component mounts
        if (!initialFetchDoneRef.current) {
            fetchData();
            initialFetchDoneRef.current = true;
        }
    }, []); // Run only once on mount
    const handleAddToCart = (product) => {
        dispatch(addProductToCart(product));
        if (arrCart != null)
            navigate("/shoppingCart")
    };

    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <Link to={"" + product._id} state={product} style={{ textDecoration: "none" }}>
                        <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.imgUrl} alt={product.nameProduct} />
                    </Link>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.nameProduct}</div>
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
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                                onClick={() => handleAddToCart(product)}
                                style={{ background: "#c8b4a9",border:"1px solid #c8b4a9" }}
                            >
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id} >
                <div className="p-4 border-1 surface-border surface-card border-round" >
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold" style={{color:"gray"}}>{product.description}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">

                        <img className="w-9 shadow-2 border-round" src={product.imgUrl} alt={product.name} />

                        <Link to={"" + product._id} state={product} style={{ textDecoration: "none", color: "gray" }}>
                            <div className="text-2xl font-bold">{product.nameProduct}</div>
                        </Link>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}
                            style={{ background: "#c8b4a9",border:"1px solid #c8b4a9" }} onClick={() => handleAddToCart(product)}
                        >

                        </Button>
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
                <i className="pi pi-search"/>
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




