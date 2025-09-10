
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

const socketContext = createContext()

export default function({children}) {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = io("https://komakkharj.ir")

        newSocket.on("connect", async () => {
            console.log("connect");

            AsyncStorage.getItem("token").then(result => {
                if(result) {
                    newSocket.emit("userIsOnline", result)
                }
            })
        })
        newSocket.on("disconnect", () => {
            console.log("disconnected");
        })

        setSocket(newSocket)

        return () => newSocket.disconnect()
    }, [])


    return <socketContext.Provider value={socket}>{children}</socketContext.Provider>
}

export const useSocket = () => useContext(socketContext)