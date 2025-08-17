import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

import PaydaNashod from "../components/PaydaNashod";
import Report from "../components/Report";
import Witing from "./Witing";
import Accepted from "./Accepted";
import Rejected from "./Rejected";

const Tab = createMaterialTopTabNavigator()

export default function() {
    return (
        <>
            <Tab.Navigator initialRouteName="در حال انجام">
                <Tab.Screen name="رد شده" component={Rejected} />
                <Tab.Screen name="تایید شده" component={Accepted}  />
                <Tab.Screen name="در حال انجام" component={Witing}  />
            </Tab.Navigator>
        </>
    )
}