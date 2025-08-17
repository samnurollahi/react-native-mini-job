export default function(name) {
    const object = {
        phone: "با شماره موبایل",
        social: "شبکه های اجتماعی",
        simpelRegister: "عضویت ساده",
        advanceRegister: "عضویت با حراز هویت پیشرفته",
        installApp: "نصب اپلیکیشن"
    }

    if(object[name]) {
        return object[name]
    }else {
        return name
    }
}