import React from "react";
import { getAllUsers, getCardDetails } from "./actions";
import UserTable from "./UserTable";
import DetailCards from "../_components/DetailCards";


export default async function Page() {
    const data = await getCardDetails();
    const initData = await getAllUsers();
    return (
        <div>
            <DetailCards data={data} />
            <UserTable initData={initData} />
        </div>
    );
}
