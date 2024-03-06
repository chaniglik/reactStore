import openPic from "./pictures/desk2_9.webp";
import line from "./pictures/strip_desk_1.webp";
import pic1 from "./pictures/Cat_1_11.jpg";
import pic2 from "./pictures/Cat_2_11.webp";
import pic3 from "./pictures/Cat_3_12.webp";
import pic4 from "./pictures/Cat_4_22.jpg";
import pic5 from "./pictures/pic5.png";
import pic6 from "./pictures/ourC.png";
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { useSelector } from "react-redux";
import { getAllProductsFromServer } from "./features/product/ProductApi";
export default function AppComponent() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {

                let allproducts = await getAllProductsFromServer("", "", "");
                setProducts(allproducts.data)

            } catch (err) {
                alert("Failed to fetch the products from the server");
                console.log(err);
            }

        };

        fetchData();
    }, []);

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    const productTemplate = (product) => {
        return (

            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={product.imgUrl} alt={product.name} className="w-6 shadow-2" />
                </div>
                <div>
                    <h4 className="mb-1">{product.nameProduct}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" rounded />
                        <Button icon="pi pi-star-fill" rounded severity="success" />
                    </div>
                </div>
            </div>
        );
    };

    return (<>
        <img src={openPic} style={{ zIndex: "1", width: "100%", height: "85vh" }}></img>
        <div style={{ display: "flex" }}>
            <img src={pic1} style={{ zIndex: "1", display: "flex", width: "24%", height: "100%", margin: "25px 8px" }}></img>
            <img src={pic2} style={{ zIndex: "1", display: "flex", width: "24%", height: "100%", margin: "25px 8px" }}></img>
            <img src={pic3} style={{ zIndex: "1", display: "flex", width: "24%", height: "100%", margin: "25px 8px" }}></img>
            <img src={pic4} style={{ zIndex: "1", display: "flex", width: "24%", height: "100%", margin: "25px 8px" }}></img>
        </div>
        <img src={pic6} style={{ zIndex: "1", width: "100%", padding: "15px 0px 15px 0px" }}></img>
        <div className="card">
            <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
        </div>
        <img src={line} style={{ zIndex: "1", width: "100%", padding: "15px 0px 15px 0px" }}></img>
        <img src={pic5} style={{ zIndex: "1", width: "100%", padding: "15px 0px 15px 0px" }}></img>
    </>)
}
