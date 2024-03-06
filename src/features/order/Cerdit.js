import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { InputMask } from "primereact/inputmask";
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
export default function BasicDemo() {
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState(null);
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>CVV הוא מספר בן 4 ספרות בחזית הכרטיס, הממוקם ממש מעל מספר הכרטיס</li>
                <li>כרטיסים אחרים
                    CVV הוא מספר בן 3 ספרות בגב הכרטיס</li>

            </ul></>)
    const footerContent = (
        <div>
            <Button label="שמירה ואישור" icon="pi pi-check" onClick={() => setVisible(false)} />
        </div>
    );

    return (
        <div style={{ marginLeft: "68.3%" }}>
            <Button label="New Card" icon="pi pi-credit-card" onClick={() => setVisible(true)} />
            <Dialog header="Credit Details" footer={footerContent} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1">
                        <InputMask mask="9999-9999-9999-9999" placeholder="Card Number" className="p-inputtext-size" />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <Calendar placeholder="validity" value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" className="p-inputtext-size" />
                    </div>
                </div>
                <div className="card flex flex-column md:flex-row gap-3" style={{ marginTop: "30px" }}>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <InputMask mask="999" placeholder="CVV" className="p-inputtext-size" footer={footer} />
                    </div>
                </div>
            </Dialog>
        </div>
    )

}
